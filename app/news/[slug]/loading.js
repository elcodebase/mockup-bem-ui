export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-5 pt-16" aria-busy="true" aria-label="Memuat artikel">
      <div className="mx-auto h-5 w-28 bg-permukaan2" />
      <div className="mx-auto mt-6 h-12 w-3/4 bg-permukaan2" />
      <div className="mx-auto mt-3 h-12 w-1/2 bg-permukaan2" />
      <div className="mt-10 aspect-[21/9] w-full bg-permukaan2" />
      <div className="mt-10 max-w-[680px] space-y-3">
        <div className="h-4 bg-permukaan2" />
        <div className="h-4 bg-permukaan2" />
        <div className="h-4 w-2/3 bg-permukaan2" />
      </div>
    </div>
  );
}
