'use client';

import dynamic from 'next/dynamic';

const YarnMap = dynamic(() => import('./YarnMap'), { ssr: false });

export default function MapWrapper() {
  return <YarnMap />;
}
