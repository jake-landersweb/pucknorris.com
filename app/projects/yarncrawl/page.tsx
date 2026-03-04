import MapWrapper from './MapWrapper';

export const metadata = {
  title: 'PNW Yarn Crawl 2026',
  description: '9 shops, 3 days, all the yarn. March 5–7, 2026.',
}

const shops = {
  thursday: [
    {
      num: 1,
      time: '10:00 AM',
      name: 'Hook & Needle',
      location: 'Vancouver, WA',
      rating: '5.0',
      badge: 'passport',
      notes: 'Farthest stop — kick off the crawl here and grab your passport!',
      mapsQuery: 'Hook+and+Needle+Vancouver+WA',
    },
    {
      num: 2,
      time: '11:30 AM',
      name: 'Weird Sisters',
      location: 'N Portland',
      rating: '5.0',
      notes: 'Chimera & Nessie theme — pick up your pre-ordered tote bags here!',
      mapsQuery: 'Weird+Sisters+Yarn+North+Portland+OR',
    },
    {
      num: 3,
      time: '1:00 PM',
      name: 'Close Knit',
      location: 'NE Alberta, Portland',
      notes: 'Garage Dyeworks trunk show happening Thursday — don\'t miss it.',
      mapsQuery: 'Close+Knit+NE+Alberta+Portland+OR',
    },
    {
      num: 4,
      time: '2:30 PM',
      name: 'Starlight Knitting Society',
      location: 'SE Woodstock, Portland',
      rating: '4.8',
      notes: 'Emtothethird, Thought to Thread & Crow & Crescent trunk shows. Easy I-5 S home to Tigard after!',
      mapsQuery: 'Starlight+Knitting+Society+SE+Woodstock+Portland+OR',
    },
  ],
  friday: [
    {
      num: 5,
      time: '11:00 AM',
      name: "For Yarn's Sake",
      location: 'Beaverton, OR',
      notes: 'Just 10 min from Tigard. Madelinetosh scavenger hunt + daily raffle!',
      mapsQuery: 'For+Yarns+Sake+Beaverton+OR',
    },
    {
      num: 6,
      time: '1:00 PM',
      name: 'Northwest Wools',
      location: 'Multnomah Village, Portland',
      notes: "Portland's oldest yarn shop. No rush — take your time, then easy home to Tigard.",
      mapsQuery: 'Northwest+Wools+Multnomah+Village+Portland+OR',
    },
  ],
  saturday: [
    {
      num: 7,
      time: '10:00 AM',
      name: 'Knotty Lamb',
      location: 'Forest Grove, OR',
      rating: '4.9',
      notes: '45 min through Oregon wine country. Indie dyer heaven — savor it. Leave by 11:30 AM.',
      mapsQuery: 'Knotty+Lamb+Forest+Grove+OR',
    },
    {
      num: 8,
      time: '12:30 PM',
      name: 'Ritual Dyes',
      location: 'SE Division, Portland',
      notes: 'Open all crawl days. Head here after wine country for a great indie dye selection.',
      mapsQuery: 'Ritual+Dyes+SE+Division+Portland+OR',
    },
    {
      num: 9,
      time: '1:30 PM',
      name: 'Fiber Rhythm',
      location: 'SE Division, Portland',
      badge: 'finish',
      notes: 'Literally next door to Ritual Dyes. Reflective Society trunk show. Easy I-5 S home to celebrate! 🎉',
      mapsQuery: 'Fiber+Rhythm+SE+Division+Portland+OR',
    },
  ],
}

type Shop = {
  num: number
  time: string
  name: string
  location: string
  rating?: string
  badge?: string
  notes: string
  mapsQuery: string
}

function ShopCard({ shop, color }: { shop: Shop; color: string }) {
  return (
    <div className="bg-bg-700 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-white/25 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-black shrink-0"
            style={{ background: color }}
          >
            {shop.num}
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
            {shop.time}
          </span>
        </div>
        {shop.rating && (
          <span className="text-xs text-gray-600">★ {shop.rating}</span>
        )}
      </div>

      <div>
        <h3 className="font-gains text-xl font-bold text-white leading-tight">{shop.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">📍 {shop.location}</p>
      </div>

      {shop.badge === 'passport' && (
        <span className="inline-block bg-main text-black text-xs font-bold tracking-wider uppercase rounded px-2 py-0.5 w-fit">
          Start here · Grab your passport
        </span>
      )}
      {shop.badge === 'finish' && (
        <span className="inline-block bg-green-400 text-black text-xs font-bold tracking-wider uppercase rounded px-2 py-0.5 w-fit">
          🎉 Shop #9 · Finish Line!
        </span>
      )}

      <p className="text-sm text-gray-400 flex-grow">{shop.notes}</p>

      <a
        href={`https://www.google.com/maps/search/${shop.mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold text-gray-500 hover:text-main transition-colors pt-3 border-t border-white/10"
      >
        Get Directions →
      </a>
    </div>
  )
}

export default function YarnCrawlPage() {
  return (
    <main className="min-h-screen bg-bg">

      {/* Hero — compact so map is visible on load */}
      <section className="relative text-center px-4 pt-20 pb-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,191,60,0.07) 0%, transparent 60%)' }}
        />
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-main mb-1">March 5 – 7, 2026</p>
        <h1 className="font-gains text-4xl sm:text-5xl font-bold text-white leading-none mb-1">
          PNW Yarn <span className="text-main">Crawl</span>
        </h1>
        <p className="text-gray-500 text-sm mb-3">Portland · Beaverton · Vancouver · Forest Grove</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="border border-main text-main text-xs rounded-full px-3 py-1 bg-main/10">9 Shops</span>
          <span className="border border-white/15 text-gray-400 text-xs rounded-full px-3 py-1">3 Days</span>
          <span className="border border-white/15 text-gray-400 text-xs rounded-full px-3 py-1">Trunk Shows</span>
          <span className="border border-white/15 text-gray-400 text-xs rounded-full px-3 py-1">Raffle Prizes</span>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 pb-12 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-main">The Route</p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded-full inline-block shrink-0" style={{ background: '#f9bf3c' }} />
              Thu (4)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded-full inline-block shrink-0" style={{ background: '#60a5fa' }} />
              Fri (2)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded-full inline-block shrink-0" style={{ background: '#4ade80' }} />
              Sat (3)
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/10 h-[300px] sm:h-[400px] md:h-[450px]">
          <MapWrapper />
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          Tap any marker for shop name · Use Get Directions links below for navigation
        </p>
      </section>

      {/* Schedule */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-main mb-2">The Plan</p>
        <h2 className="font-gains text-3xl sm:text-4xl font-bold text-white mb-8">Day by Day</h2>

        {/* Thursday */}
        <div className="mb-10">
          <div className="flex items-center gap-4 pb-4 mb-6 border-b border-white/10">
            <span className="text-3xl">🐉</span>
            <div>
              <h3 className="font-gains text-2xl font-bold text-white">Thursday, March 5</h3>
              <p className="text-sm text-gray-500">Vancouver to SE Portland — 4 shops</p>
            </div>
            <span className="ml-auto w-4 h-4 rounded-full shrink-0" style={{ background: '#f9bf3c' }} />
          </div>
          <div className="bg-main/10 border border-main/20 rounded-xl px-4 py-3 text-sm text-main mb-6">
            🗺️ Start far north in Vancouver and work your way south — home to Tigard after Starlight!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shops.thursday.map((shop) => (
              <ShopCard key={shop.name} shop={shop} color="#f9bf3c" />
            ))}
          </div>
        </div>

        {/* Friday */}
        <div className="mb-10">
          <div className="flex items-center gap-4 pb-4 mb-4 border-b border-white/10">
            <span className="text-3xl">🧶</span>
            <div>
              <h3 className="font-gains text-2xl font-bold text-white">Friday, March 6</h3>
              <p className="text-sm text-gray-500">Easy Local Day — 2 shops</p>
            </div>
            <span className="ml-auto w-4 h-4 rounded-full shrink-0" style={{ background: '#60a5fa' }} />
          </div>
          <div className="bg-main/10 border border-main/20 rounded-xl px-4 py-3 text-sm text-main mb-6">
            💡 Both shops are close to Tigard — light day, no rush, enjoy a long browse!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shops.friday.map((shop) => (
              <ShopCard key={shop.name} shop={shop} color="#60a5fa" />
            ))}
          </div>
        </div>

        {/* Saturday */}
        <div className="mb-10">
          <div className="flex items-center gap-4 pb-4 mb-4 border-b border-white/10">
            <span className="text-3xl">🐉</span>
            <div>
              <h3 className="font-gains text-2xl font-bold text-white">Saturday, March 7</h3>
              <p className="text-sm text-gray-500">Forest Grove to SE Portland — 3 shops</p>
            </div>
            <span className="ml-auto w-4 h-4 rounded-full shrink-0" style={{ background: '#4ade80' }} />
          </div>
          <div className="bg-main/10 border border-main/20 rounded-xl px-4 py-3 text-sm text-main mb-6">
            🍷 Start in wine country at Knotty Lamb, then two SE Division shops right next to each other for the finish!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shops.saturday.map((shop) => (
              <ShopCard key={shop.name} shop={shop} color="#4ade80" />
            ))}
          </div>
        </div>

      </section>

    </main>
  )
}
