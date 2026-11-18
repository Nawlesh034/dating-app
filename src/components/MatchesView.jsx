import { Icon } from './Navigation.jsx';

export function MatchModal({ match, onClose }) {
  if (!match) return null;
  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-[rgba(35,32,28,0.56)] p-5 backdrop-blur-[5px]" role="dialog" aria-modal="true" aria-labelledby="match-title">
      <div className="relative w-full max-w-[390px] rounded-lg bg-paper px-7 pb-[30px] pt-[39px] text-center shadow-[0_25px_80px_rgba(0,0,0,0.2)]">
        <button className="absolute right-[15px] top-[15px] grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[#7d786f]" onClick={onClose} aria-label="Close match message"><Icon name="close" /></button>
        <div className="mx-auto mb-[15px] grid h-12 w-12 place-items-center rounded-full bg-[#f4e8e1] text-coral"><Icon name="spark" size={29} /></div>
        <p className="mb-[7px] text-[9px] font-bold tracking-[.16em] text-[#827c72]">GOOD THINGS HAPPEN BOTH WAYS</p>
        <h2 id="match-title" className="mb-[18px] mt-0 font-display text-[34px] font-semibold tracking-[-1.5px]">Itâ€™s a match!</h2>
        <div className="mx-auto h-[94px] w-[94px] rounded-full border border-[#e5cfc4] p-1">
          <img className="h-full w-full rounded-full object-cover" src={match.photo} alt="" />
        </div>
        <p className="my-[15px] mb-[22px] text-[13px] leading-relaxed text-[#777169]">You and {match.name} liked each other.<br />A lovely place to start.</p>
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-ink px-[17px] py-[13px] text-xs font-semibold text-white transition hover:-translate-y-px hover:bg-[#494640]" onClick={onClose}>Keep discovering <Icon name="arrow" size={17} /></button>
      </div>
    </div>
  );
}

export function MatchesView({ matches, onDiscover }) {
  if (!matches.length) {
    return (
      <section className="flex min-h-[52vh] flex-col items-center justify-center text-center">
        <div className="mb-[21px] grid h-[54px] w-[54px] place-items-center rounded-full bg-[#f3e7df] text-coral"><Icon name="heart" size={26} /></div>
        <p className="mb-[10px] text-[10px] font-bold tracking-[.16em] text-[#827c72]">YOUR PEOPLE, WHEN THEY FIND YOU</p>
        <h2 className="m-0 font-display text-[28px] font-medium leading-[1.2] tracking-[-1px]">Good things take<br />a little time.</h2>
        <p className="my-3 mb-[22px] max-w-[275px] text-[13px] leading-relaxed text-[#807a71]">When you both say yes, youâ€™ll find each other here.</p>
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded bg-ink px-[17px] py-[13px] text-xs font-semibold text-white transition hover:-translate-y-px hover:bg-[#494640]" onClick={onDiscover}>Back to Discover <Icon name="arrow" size={17} /></button>
      </section>
    );
  }
  return (
    <section className="py-3 pb-[30px]">
      <div className="flex items-end justify-between border-b border-line pb-[23px]">
        <div><p className="mb-[7px] text-[10px] font-bold tracking-[.16em] text-[#827c72]">A LITTLE MUTUAL MAGIC</p><h2 className="m-0 font-display text-[34px] font-semibold tracking-[-1.5px]">Your matches</h2></div>
        <span className="pb-[5px] text-xs text-[#817c74]">{matches.length} {matches.length === 1 ? "match" : "matches"}</span>
      </div>
      <div className="flex flex-col">
        {matches.map((match) => (
          <article className="flex items-center gap-[15px] border-b border-line py-[18px]" key={match.id}>
            <img className="h-[62px] w-[62px] rounded-full bg-[#e9e3da] object-cover" src={match.photo} alt="" />
            <div className="flex-1"><h3 className="mb-[5px] mt-0 font-display text-[15px] font-semibold">{match.name}, {match.age}</h3><p className="m-0 text-xs text-[#878178]">{match.city}</p></div>
            <span className="flex items-center gap-[5px] text-[11px] text-[#9a655b]"><Icon name="heart" size={15} /> Mutual</span>
          </article>
        ))}
      </div>
      <p className="my-[23px] text-[11px] text-[#827c73]"><span className="mr-[7px] inline-block h-[7px] w-[7px] rounded-full bg-sage" />Only mutual matches appear here. Your likes stay yours.</p>
    </section>
  );
}

