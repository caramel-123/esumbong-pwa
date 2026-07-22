import Icon from "@/components/Icon";

type AppBarVariant = "solid" | "floating";

export default function AppBar({ variant = "solid" }: { variant?: AppBarVariant }) {
  const isFloating = variant === "floating";

  return (
    <header
      className={`w-full h-16 flex items-center justify-between px-margin-mobile ${
        isFloating
          ? "bg-white/75 backdrop-blur-xl rounded-full shadow-lg border border-white/50"
          : "bg-surface border-b border-outline-variant"
      }`}
    >
      <h1 className="font-headline text-headline-md font-black text-primary tracking-tight">
        eSumbong
      </h1>
      <button
        aria-label="Search"
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-95 ${
          isFloating
            ? "bg-white text-primary"
            : "bg-surface-container text-primary hover:bg-surface-container-highest"
        }`}
      >
        <Icon name="search" size={22} />
      </button>
    </header>
  );
}
