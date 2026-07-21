export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-0.5 bg-secondary-container" aria-hidden="true" />
      <span className="font-eyebrow text-eyebrow text-primary uppercase tracking-[0.2em]">{children}</span>
    </div>
  );
}
