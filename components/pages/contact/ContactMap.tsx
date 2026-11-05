export function ContactMap({ mapsUrl }: { mapsUrl?: string }) {
  if (!mapsUrl) {
    return (
      <div className="overflow-hidden sm:col-span-2 rounded-2xl border border-caramel/15 bg-caramel/5 shadow-sm h-full min-h-[250px] flex items-center justify-center p-6 text-center text-mocha/70 font-jost text-sm font-medium">
        Карта розташування пекарні
      </div>
    );
  }

  return (
    <div className="overflow-hidden sm:col-span-2 rounded-2xl border border-caramel/15 shadow-sm h-full min-h-[250px]">
      <iframe
        src={mapsUrl}
        title="Розташування пекарні Monsieur Croissant на карті"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'saturate(0.7) brightness(1.02)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
