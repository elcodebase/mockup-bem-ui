const angka = new Intl.NumberFormat("id-ID");

export default function StatsBar({ stats }) {
  const data = [
    { nilai: angka.format(stats.mahasiswa_terwakili), label: "Mahasiswa terwakili" },
    { nilai: `${angka.format(stats.proker_aktif)}+`, label: "Program kerja aktif" },
    { nilai: angka.format(stats.fungsionaris), label: "Fungsionaris" }
  ];
  return (
    <section aria-label="Statistik BEM UI" className="border-b border-black bg-permukaan2">
      <dl className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-black px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col-reverse items-center py-8 text-center">
            <dt className="mt-1 text-sm text-abu">{d.label}</dt>
            <dd className="text-5xl font-black tracking-tight" style={{ fontStretch: "80%" }}>
              {d.nilai}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
