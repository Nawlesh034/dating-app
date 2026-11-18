import { useCallback, useEffect, useState } from 'react';
import { HomeView } from './components/HomeView.jsx';
import { MatchesView, MatchModal } from './components/MatchesView.jsx';
import { Icon, TabBar } from './components/Navigation.jsx';
import { ProfileCard } from './components/ProfileCard.jsx';

async function api(path, options) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Something went wrong.");
  return result;
}


export default function App() {
  const [activeTab, setActiveTab] = useState("discover");
  const [feed, setFeed] = useState([]);
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [matchModal, setMatchModal] = useState(null);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [nextFeed, nextMatches, me] = await Promise.all([
        api("/api/feed"),
        api("/api/matches"),
        api("/api/me")
      ]);
      // A full page reload starts a fresh demo discovery cycle if every
      // profile was already swiped. Matches remain saved on the server.
      const refreshedFeed = nextFeed.length ? nextFeed : await api("/api/feed/refresh", { method: "POST" });
      setFeed(refreshedFeed);
      setMatches(nextMatches);
      setUser(me);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh, refreshKey]);

  const swipe = async (action, direction) => {
    if (!feed[0] || swiping) return;
    setSwiping(true);
    setSwipeDirection(direction);
    setError("");
    try {
      const result = await api("/api/swipe", {
        method: "POST",
        body: JSON.stringify({ profileId: feed[0].id, action })
      });
      await new Promise((resolve) => window.setTimeout(resolve, 270));
      setFeed((previous) => previous.slice(1));
      setSwipeDirection("");
      if (result.matched) {
        setMatchModal(result.match);
        setMatches((previous) => [result.match, ...previous.filter((item) => item.id !== result.match.id)]);
      }
    } catch (requestError) {
      setError(requestError.message);
      setSwipeDirection("");
      window.setTimeout(() => setRefreshKey((key) => key + 1), 800);
    } finally {
      setSwiping(false);
    }
  };

  const retry = () => setRefreshKey((key) => key + 1);
  const remaining = feed.length;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative z-[3] flex h-[62px] items-center justify-between border-b border-line bg-paper/95 px-5 md:h-[74px] md:px-[clamp(22px,6vw,88px)]">
        <button className="flex cursor-pointer items-center gap-[7px] border-0 bg-transparent font-display text-[22px] font-extrabold tracking-[-1.2px] text-ink" onClick={() => setActiveTab("discover")} aria-label="Coy Discover home">
          <span className="font-[Georgia] text-[29px] italic leading-none text-coral">c</span><span>coy</span>
        </button>
        <div className="flex items-center gap-2 text-[10px] tracking-[.02em] text-[#77736c] md:text-xs"><span className="inline-block h-[7px] w-[7px] rounded-full bg-sage shadow-[0_0_0_3px_rgba(139,155,121,0.12)]" /> A little more intentional</div>
        <button className="h-[34px] w-[34px] cursor-default overflow-hidden rounded-full border border-[#e6d9cd] bg-[#efe7df] text-[13px] font-bold text-[#786957]" title={user ? `${user.name}, ${user.age}` : "Your profile"} aria-label={user ? `Your profile, ${user.name}, ${user.age}` : "Your profile"}>
          {user?.photo ? <img className="block h-full w-full rounded-full object-cover" src={user.photo} alt="" /> : user?.name?.slice(0, 1) || "Y"}
        </button>
      </header>

      <div className="flex flex-1 flex-col">
        {activeTab === "home" && <HomeView />}
        {activeTab === "discover" && (
          <main className="mx-auto flex w-full flex-1 flex-col items-stretch gap-0 px-5 pt-4 pb-[15px] md:grid md:max-w-[1120px] md:grid-cols-[minmax(270px,1fr)_minmax(350px,430px)] md:grid-rows-[auto_1fr] md:items-center md:gap-x-[clamp(36px,8vw,112px)] md:px-[38px] md:pt-[37px] md:pb-7 min-[1300px]:pt-[52px] min-[1300px]:pb-9 max-[390px]:px-[14px]">
            <section className="py-[9px] pb-[13px] md:col-start-1 md:row-start-1 md:self-end md:py-[22px] md:pb-[15px]">
              <p className="mb-[7px] text-[10px] font-bold tracking-[.16em] text-[#827c72] md:mb-[14px]"><span className="pr-[7px] text-sm text-coral">âœ³</span> YOUR NEXT CHAPTER</p>
              <div className="flex items-end justify-between gap-[10px]">
                <h1 className="m-0 font-display text-[clamp(32px,8vw,43px)] font-medium leading-[1.1] tracking-[-1.8px] md:text-[clamp(38px,4vw,54px)] md:tracking-[-2.7px] max-[390px]:text-[32px]">
                  Meet someone<br /><em className="font-serif font-normal tracking-[-1.5px] text-coral md:tracking-[-2px]">worth the pause.</em>
                </h1>
                <p className="mb-[5px] text-[10px] leading-[1.5] text-[#928d84] max-[390px]:hidden md:text-xs md:leading-[1.7]">No rush. Just<br />the right kind<br />of possibility.</p>
              </div>
              <div className="mt-3 flex justify-between gap-3 border-t border-line pt-[10px] text-[9px] text-[#817c74] md:mt-[21px] md:pt-[13px] md:text-[10px]">
                <span className="flex items-center gap-2"><span className="inline-block h-[6px] w-[6px] rounded-full bg-sage shadow-[0_0_0_3px_rgba(139,155,121,0.12)]" /> Thoughtful connections, one at a time</span>
                <span className="text-right">{remaining} profiles to explore</span>
              </div>
            </section>
            {error && <div className="relative z-[3] rounded bg-[#fff0ec] px-[13px] py-2.5 text-xs text-[#9a4f43] md:col-span-full md:row-start-1" role="alert">{error}<button className="ml-[10px] cursor-pointer border-0 bg-transparent text-[#753b32] underline" onClick={retry}>Try again</button></div>}
            <div className="relative flex h-[clamp(350px,51vh,530px)] min-h-[350px] w-full max-w-[430px] flex-none items-center justify-center self-center overflow-hidden max-[390px]:h-[48vh] max-[390px]:min-h-[325px] md:col-start-2 md:row-start-1 md:row-span-2 md:h-[min(61vh,550px)] md:min-h-[405px] md:max-w-[398px]">
              {loading ? (
                <div className="flex h-full min-h-[inherit] w-full flex-col items-center justify-center rounded-lg bg-[#f0ede7] p-[25px] text-center text-[#817c74]"><span className="mb-[14px] h-7 w-7 animate-spin rounded-full border-2 border-[#e1d9cf] border-t-coral" /><span>Finding your peopleâ€¦</span></div>
              ) : feed.length ? (
                <>
                  {feed.length > 1 && <div className="absolute h-[97%] w-[96%] rotate-[-3deg] rounded-lg bg-[#eeeae4] shadow-[0_12px_30px_rgba(63,49,39,0.07)]" />}
                  {feed.length > 1 && <div className="absolute z-[1] h-[97%] w-[96%] translate-x-[5px] translate-y-px rotate-[3deg] rounded-lg bg-[#e9e3da] shadow-[0_12px_30px_rgba(63,49,39,0.07)]" />}
                  <ProfileCard key={feed[0].id} profile={feed[0]} onSwipe={swipe} disabled={swiping} swipeDirection={swipeDirection} />
                </>
              ) : (
                <div className="flex h-full min-h-[inherit] w-full flex-col items-center justify-center rounded-lg bg-[#f0ede7] p-[25px] text-center text-ink">
                  <div className="mb-[18px] grid h-[54px] w-[54px] place-items-center rounded-full bg-[#f3e7df] text-coral"><Icon name="spark" size={27} /></div>
                  <p className="mb-[10px] text-[10px] font-bold tracking-[.16em] text-[#827c72]">THATâ€™S EVERYONE FOR NOW</p>
                  <h2 className="m-0 font-display text-[28px] font-medium leading-[1.2] tracking-[-1px]">You gave everyone<br />a thoughtful look.</h2>
                  <p className="my-3 mb-[22px] max-w-[275px] text-[13px] leading-relaxed text-[#807a71]">Weâ€™ll have more lovely people for you soon.</p>
                  <button className="cursor-pointer rounded border border-[#ded7cd] bg-transparent px-[15px] py-[11px] text-xs text-[#514e48]" onClick={retry}>Refresh Discover <span className="pl-2 text-base">â†»</span></button>
                </div>
              )}
            </div>
            {!loading && feed.length > 0 && (
              <div className="z-[2] flex items-center justify-center gap-[26px] pt-[13px] pb-[2px] md:col-start-2 md:row-start-3 md:pt-4 md:pb-0">
                <button className="grid h-[49px] w-[49px] cursor-pointer place-items-center rounded-full border border-[#e9e4dc] bg-white text-[#79756e] shadow-[0_5px_15px_rgba(53,45,36,0.06)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 md:h-[55px] md:w-[55px]" onClick={() => swipe("pass", "left")} disabled={swiping} aria-label="Pass on profile"><Icon name="close" size={25} /></button>
                <span className="text-[11px] text-[#918a81]">A feeling? Follow it.</span>
                <button className="grid h-[49px] w-[49px] cursor-pointer place-items-center rounded-full border-0 bg-coral text-white shadow-[0_7px_17px_rgba(229,116,99,0.25)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 md:h-[55px] md:w-[55px]" onClick={() => swipe("like", "right")} disabled={swiping} aria-label="Like profile"><Icon name="heart" size={23} /></button>
              </div>
            )}
            <div className="pt-[10px] text-center text-[10px] leading-relaxed text-[#858078] md:col-start-1 md:row-start-2 md:self-end md:pb-[17px] md:text-left md:text-[11px]"><span className="pr-[5px] text-coral">âœ³</span> Your likes are private. Only a mutual yes becomes a match.</div>
          </main>
        )}
        {activeTab === "matches" && (
          <main className="mx-auto w-full max-w-[720px] flex-1 px-[22px] py-[34px] md:px-[30px] md:py-[65px]">
            <MatchesView matches={matches} onDiscover={() => setActiveTab("discover")} />
          </main>
        )}
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} matchCount={matches.length} />
      <MatchModal match={matchModal} onClose={() => setMatchModal(null)} />
    </div>
  );
}
