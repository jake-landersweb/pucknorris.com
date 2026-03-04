'use client';

import { useEffect, useRef } from 'react';

const DAY_COLORS: Record<string, string> = {
  thursday: '#f9bf3c',
  friday:   '#60a5fa',
  saturday: '#4ade80',
};

const SHOPS = [
  { num: 1, name: 'Hook & Needle',              location: 'Vancouver, WA',           lat: 45.6366, lng: -122.6710, day: 'thursday' },
  { num: 2, name: 'Weird Sisters',               location: 'N Portland',              lat: 45.5720, lng: -122.6839, day: 'thursday' },
  { num: 3, name: 'Close Knit',                 location: 'NE Alberta, Portland',    lat: 45.5601, lng: -122.6289, day: 'thursday' },
  { num: 4, name: 'Starlight Knitting Society', location: 'SE Woodstock, Portland',  lat: 45.4769, lng: -122.6332, day: 'thursday' },
  { num: 5, name: "For Yarn's Sake",            location: 'Beaverton, OR',           lat: 45.4866, lng: -122.8034, day: 'friday'   },
  { num: 6, name: 'Northwest Wools',            location: 'Multnomah Village',       lat: 45.4806, lng: -122.7148, day: 'friday'   },
  { num: 7, name: 'Knotty Lamb',                location: 'Forest Grove, OR',        lat: 45.5200, lng: -123.1084, day: 'saturday' },
  { num: 8, name: 'Ritual Dyes',                location: 'SE Division, Portland',   lat: 45.5041, lng: -122.6357, day: 'saturday' },
  { num: 9, name: 'Fiber Rhythm',               location: 'SE Division, Portland',   lat: 45.5035, lng: -122.6340, day: 'saturday' },
];

export default function YarnMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Load Leaflet CSS from CDN to avoid bundler conflicts
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [45.535, -122.78],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      SHOPS.forEach((shop) => {
        const color = DAY_COLORS[shop.day] ?? '#fff';
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:30px;height:30px;background:${color};border:2px solid rgba(0,0,0,0.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#111;box-shadow:0 2px 10px rgba(0,0,0,0.6);font-family:system-ui,sans-serif;">${shop.num}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -18],
        });

        L.marker([shop.lat, shop.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui,sans-serif;min-width:140px"><strong style="font-size:14px">${shop.num}. ${shop.name}</strong><br/><span style="color:#888;font-size:12px">${shop.location}</span></div>`
          );
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
}
