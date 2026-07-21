import Link from "next/link";

type AppBarVariant = "solid" | "floating";

export default function AppBar({ variant = "solid" }: { variant?: AppBarVariant }) {
  const isFloating = variant === "floating";

  return (
    <header
      className={`w-full h-14 flex items-center justify-between px-margin-mobile ${
        isFloating
          ? "bg-white/75 backdrop-blur-xl rounded-full shadow-lg border border-white/50"
          : "bg-surface border-b border-outline-variant"
      }`}
    >
      <h1 className="font-headline text-headline-md font-black text-primary tracking-tight">
        eSumbong
      </h1>
      <Link
        href="/notifications"
        aria-label="Notifications"
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-95 ${
          isFloating
            ? "bg-white text-primary"
            : "bg-surface-container text-primary hover:bg-surface-container-highest"
        }`}
      >
        <span className="material-symbols-outlined">notifications</span>
        <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white" />
      </Link>
    </header>
  );
}
