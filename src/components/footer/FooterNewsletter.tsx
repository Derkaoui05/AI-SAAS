export function FooterNewsletter() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-xl rounded-2xl border bg-white/70 p-3 shadow-sm backdrop-blur ">
        <form className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Get cute weekly nutrition notes"
            className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground/70 focus:border-primary"
          />
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
