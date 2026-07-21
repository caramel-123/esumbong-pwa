/**
 * Reusable eMessage notification wrapper (Track D).
 * Real eMessage delivers SMS, email, and in-app notices through a single
 * messaging API. This is a placeholder implementation — swap the body for
 * the real eMessage call when Track D lands; the Dispute/Review Service
 * only depends on this function's signature, not its internals.
 */
export interface EMessageResult {
  sent: boolean;
  recipient: string;
  message: string;
  sentAt: string;
}

export async function sendEMessage(recipient: string, message: string): Promise<EMessageResult> {
  await new Promise((r) => setTimeout(r, 150));

  return {
    sent: true,
    recipient,
    message,
    sentAt: new Date().toISOString(),
  };
}
