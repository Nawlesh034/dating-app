export function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    discover: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1 1-2.5Z" /></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function TabBar({ active, onChange, matchCount }) {
  const tabClass = (tab) => `flex min-h-[52px] min-w-[68px] cursor-pointer flex-col items-center justify-center gap-[3px] border-0 bg-transparent px-2 py-1.5 text-[10px] ${active === tab ? "text-coral" : "text-[#99938a]"}`;
  const labelClass = (tab) => active === tab ? "font-semibold text-ink" : "";
  return (
    <nav className="sticky bottom-0 z-[4] flex min-h-16 items-center justify-center gap-[clamp(25px,9vw,70px)] border-t border-line bg-[#faf9f7]/95 md:min-h-[70px] md:gap-[clamp(36px,9vw,115px)]" aria-label="Main navigation">
      <button className={tabClass("home")} onClick={() => onChange("home")}>
        <Icon name="home" /><span className={labelClass("home")}>Home</span>
      </button>
      <button className={tabClass("discover")} onClick={() => onChange("discover")}>
        <Icon name="discover" /><span className={labelClass("discover")}>Discover</span>
      </button>
      <button className={tabClass("matches")} onClick={() => onChange("matches")}>
        <span className="relative inline-flex">
          <Icon name="heart" />
          {matchCount > 0 && <span className="absolute -right-[9px] -top-[5px] grid h-[15px] min-w-[15px] place-items-center rounded-full bg-coral px-[3px] text-[9px] text-white">{matchCount}</span>}
        </span>
        <span className={labelClass("matches")}>Matches</span>
      </button>
    </nav>
  );
}

