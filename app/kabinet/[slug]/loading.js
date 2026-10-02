export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-5 pb-16 pt-6" aria-busy="true" aria-label="Memuat divisi">
      <div className="h-3 w-40 bg-permukaan2" />
      <div className="mt-4 aspect-[16/9] w-full bg-permukaan2 md:aspect-[21/8]" />
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <div className="h-6 w-1/2 bg-permukaan2" />
          <div className="h-4 bg-permukaan2" />
          <div className="h-4 bg-permukaan2" />
          <div className="h-4 w-3/4 bg-permukaan2" />
        </div>
        <div className="h-64 bg-permukaan2" />
      </div>
    </div>
  );
}
