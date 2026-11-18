import { useRef, useState } from 'react';
import { Icon } from './Navigation.jsx';

export function ProfileCard({ profile, onSwipe, disabled, swipeDirection }) {
  const [offset, setOffset] = useState(0);
  const dragStart = useRef(null);
  const offsetRef = useRef(0);
  if (!profile) return null;

  const onPointerDown = (event) => {
    if (disabled) return;
    dragStart.current = event.clientX;
    offsetRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (dragStart.current === null) return;
    const nextOffset = event.clientX - dragStart.current;
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  };
  const onPointerUp = () => {
    if (dragStart.current === null) return;
    const distance = offsetRef.current;
    dragStart.current = null;
    offsetRef.current = 0;
    if (distance > 95) onSwipe("like", "right");
    else if (distance < -95) onSwipe("pass", "left");
    else setOffset(0);
  };

  const rotation = Math.max(-12, Math.min(12, offset / 22));
  const cardStyle = swipeDirection
    ? { transform: `translate(${swipeDirection === "right" ? "130%" : "-130%"}, -6%) rotate(${swipeDirection === "right" ? "18deg" : "-18deg"})`, opacity: 0 }
    : { transform: `translateX(${offset}px) rotate(${rotation}deg)` };
  const stampClass = "absolute top-7 z-[2] border-[3px] px-2.5 py-1.5 font-display text-xl font-extrabold tracking-[.1em] opacity-0 transition-opacity duration-100";

  return (
    <article
      className={`absolute z-[2] h-full w-full touch-pan-y select-none overflow-hidden rounded-lg bg-[#d3c7ba] shadow-[0_18px_50px_rgba(63,49,39,0.14)] ${dragStart.current === null ? "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]" : "transition-none"} ${swipeDirection ? "duration-[270ms] ease-in" : "cursor-grab active:cursor-grabbing"}`}
      style={cardStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-label={`${profile.name}, ${profile.age}`}
    >
      <img className="pointer-events-none block h-full w-full object-cover" src={profile.photo} alt={profile.name} draggable="false" />
      <div className={`right-[23px] rotate-[12deg] text-[#f5b5a5] ${stampClass} ${offset > 30 ? "opacity-100" : ""}`}>LIKE</div>
      <div className={`left-[23px] -rotate-[12deg] text-[#e8e1d8] ${stampClass} ${offset < -30 ? "opacity-100" : ""}`}>PASS</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[30%] bg-[linear-gradient(180deg,transparent,rgba(20,19,17,0.12)_27%,rgba(20,19,17,0.78))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-[23px_24px_23px] text-white max-[760px]:p-[20px] max-[390px]:p-[17px]">
        <div className="mb-[7px] flex items-center gap-[5px] text-[11px] text-white/80"><Icon name="pin" size={15} />{profile.city}</div>
        <h2 className="m-0 font-display text-4xl font-bold leading-[1.1] tracking-[-1.2px] max-[760px]:text-[31px]">
          {profile.name}<span className="text-[28px] font-normal max-[760px]:text-[25px]">, {profile.age}</span>
        </h2>
        <p className="my-[9px] mb-[13px] max-w-[340px] text-[13px] leading-[1.5] text-white/90 max-[760px]:my-[7px] max-[760px]:mb-[11px] max-[760px]:text-xs">{profile.bio}</p>
        <div className="flex flex-wrap gap-[6px]">
          {profile.interests.slice(0, 3).map((interest) => <span className="rounded-full border border-white/30 bg-white/15 px-[10px] py-[6px] text-[10px] text-white backdrop-blur-md" key={interest}>{interest}</span>)}
        </div>
      </div>
    </article>
  );
}


