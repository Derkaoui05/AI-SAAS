export function FooterBackground() {
  return (
    <>
      <div className="absolute -top-8 left-0 right-0" aria-hidden>
        <svg
          className="w-full text-white"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,58.7C1120,64,1280,64,1360,64L1440,64L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute right-0 top-28 h-48 w-48 rounded-full bg-sky-300/30 blur-3xl" />
      </div>
    </>
  );
}
