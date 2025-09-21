import React from 'react';
import { useLocation, nominatimSearch, Place } from './index';

export default function LocationSearch({ placeholder = 'Search location' }: { placeholder?: string }) {
  const { setPlace } = useLocation();
  const [q, setQ] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<Place[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    if (!q || q.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = setTimeout(() => {
      (async () => {
        const res = await nominatimSearch(q.trim());
        if (!mounted) return;
        setSuggestions(res);
        setLoading(false);
      })();
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [q]);

  return (
    <div style={{ position: 'relative' }}>
      <input aria-label="location-search" placeholder={placeholder} value={q} onChange={(e) => setQ((e.target as HTMLInputElement).value)} className="border p-1 rounded" />
      {loading && <div className="absolute bg-white border mt-1 p-2">Searching…</div>}
      {suggestions.length > 0 && (
        <div className="absolute bg-white border mt-1 w-full z-10">
          {suggestions.map((s) => (
            <div key={s.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setPlace(s); setQ(''); setSuggestions([]); }}>
              {s.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
