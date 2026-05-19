export function ContactMap({ mapsUrl }: { mapsUrl?: string }) {
  return (
    <div className='overflow-hidden sm:col-span-2 rounded-2xl border border-caramel/15 shadow-sm h-full min-h-[250px]'>
      <iframe
        src={mapsUrl}
        width='100%'
        height='100%'
        style={{ border: 0, filter: 'saturate(0.7) brightness(1.02)' }}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
    </div>
  )
}
