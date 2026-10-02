export default function Panel({ id, nomor, label, tumpuk = false, className = "", children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-judul`}
      className={`relative scroll-mt-14 border-t border-black ${tumpuk ? "lg:sticky lg:top-14 lg:flex lg:min-h-[calc(100vh-3.5rem)] lg:items-center" : ""} ${className}`}
    >
      <p aria-hidden className="absolute left-5 top-10 hidden rotate-180 text-xs text-abu [writing-mode:vertical-rl] xl:block">
        {nomor} {label}
      </p>
      <div className="mx-auto w-full max-w-5xl px-5 py-16 lg:py-20">{children}</div>
    </section>
  );
}
