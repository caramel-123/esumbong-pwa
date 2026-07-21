const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export interface VerdictExplanationInput {
  projectName: string;
  claimedPct: number;
  detectedPct: number;
  classification: string;
  discrepancyFlag: boolean;
}

/**
 * Generates the AI verdict's plain-language explanation using a real
 * Groq-hosted LLM. The verdict's numbers themselves still come from
 * scripted project data — no vision model was available on this Groq
 * account, so this is real text generation on top of a still-simulated
 * classification, not real photo analysis. Falls back to a fixed sentence
 * if Groq is unreachable or unconfigured, so the demo never breaks.
 */
export async function explainVerdict(input: VerdictExplanationInput): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return fallbackExplanation(input);

  try {
    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are eGovAI, a civic-transparency assistant for a Philippine infrastructure monitoring app. Write ONE short, plain-language sentence (max 30 words) explaining what a photo verification result means to an ordinary citizen. Be neutral and factual, never accusatory. No markdown.",
          },
          {
            role: "user",
            content: `Project: ${input.projectName}. Officially claimed completion: ${input.claimedPct}%. What the submitted photo shows: ${input.detectedPct}% (classified as "${input.classification.replace(/_/g, " ")}"). Discrepancy flagged: ${input.discrepancyFlag ? "yes" : "no"}.`,
          },
        ],
        temperature: 0.4,
        max_tokens: 80,
      }),
    });

    if (!res.ok) return fallbackExplanation(input);

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || fallbackExplanation(input);
  } catch {
    return fallbackExplanation(input);
  }
}

function fallbackExplanation(input: VerdictExplanationInput): string {
  return input.discrepancyFlag
    ? `The submitted photo shows roughly ${input.detectedPct}% completion, well below the claimed ${input.claimedPct}%.`
    : `The submitted photo is consistent with the claimed ${input.claimedPct}% completion.`;
}
