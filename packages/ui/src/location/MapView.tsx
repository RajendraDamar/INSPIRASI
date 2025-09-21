import React from 'react';

export function MapViewWeb({ lat, lng }: { lat: number; lng: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
        try {
        	// Lazy-load MapLibre GL JS only on web when needed. This dependency is optional
        	// for projects that don't display maps. Add `maplibre-gl` to the web app package
        	// if you want a full interactive map. Use a computed specifier so bundlers
        	// don't statically resolve this optional module during SSR builds.
        	const spec = 'maplibre-gl';
        	const mod = (await import(spec)) as unknown;
        if (!ref.current) return;
        // runtime guard: maplibre exports a Map constructor
        const asAny = mod as unknown as Record<string, unknown>;
        const MapCtor = asAny?.Map as unknown | undefined;
        if (!MapCtor || typeof MapCtor !== 'function') return;
        const MapClass = MapCtor as new (opts: unknown) => { remove: () => void };
        const map = new MapClass({
          container: ref.current,
          style: 'https://demotiles.maplibre.org/style.json',
          center: [lng, lat],
          zoom: 12,
        });
        return () => map.remove();
      } catch (e) {
        // If maplibre isn't available, do nothing — placeholder remains
      }
    })();
    return () => {
      mounted = false;
    };
  }, [lat, lng]);

  return <div ref={ref} style={{ width: '100%', height: 200, background: '#e5e7eb' }} />;
}

export default function MapView() {
  return <div style={{ padding: 12 }}>Map placeholder</div>;
}
