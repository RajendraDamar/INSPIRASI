import React from 'react';

export type LatLng = { lat: number; lng: number };

export type Place = {
  id: string;
  display_name: string;
  lat: number;
  lon: number;
};

type LocationContextValue = {
  position: LatLng | null;
  place: Place | null;
  setPlace: (p: Place | null) => void;
  isFetching: boolean;
};

const LocationContext = React.createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = React.useState<LatLng | null>(null);
  const [place, setPlace] = React.useState<Place | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function tryGetLocation() {
      setIsFetching(true);

      // If running in a React Native / Expo environment, prefer expo-location
      try {
        // Detect Expo by presence of navigator.product === 'ReactNative' or process.env.EXPO_TEST
  const nav = navigator as unknown as { product?: string } | undefined;
  const isReactNative = typeof navigator !== 'undefined' && nav?.product === 'ReactNative';
        if (isReactNative) {
          try {
            // dynamic import so web bundles don't require expo-location
            // use a computed specifier to avoid bundlers statically resolving this
            const spec = 'expo-location';
            const Location = await import(spec);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
              const pos = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.Highest, maximumAge: 0, timeout: 5000 });
              if (mounted && pos?.coords) {
                setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
              }
            }
            setIsFetching(false);
            return;
          } catch (e) {
            // fall through to browser geolocation if expo-location import or call fails
          }
        }

        // Try browser geolocation if available
        if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
          try {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                if (!mounted) return;
                setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setIsFetching(false);
              },
              () => {
                if (!mounted) return;
                setIsFetching(false);
              },
              { enableHighAccuracy: true, timeout: 5000 }
            );
          } catch (e) {
            if (mounted) setIsFetching(false);
          }
        } else {
          if (mounted) setIsFetching(false);
        }
      } catch (e) {
        if (mounted) setIsFetching(false);
      }
    }

    tryGetLocation();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <LocationContext.Provider value={{ position, place, setPlace, isFetching }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = React.useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}

// Safe variant that returns null when provider is missing (useful in components
// that may be used outside the provider during tests or server renders).
export function useLocationSafe(): LocationContextValue | null {
  return React.useContext(LocationContext);
}

// Simple Nominatim search (OpenStreetMap) for autocomplete suggestions.
export async function nominatimSearch(q: string): Promise<Place[]> {
  if (!q) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=0&limit=5`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    type NItem = { place_id?: number; display_name: string; lat: string; lon: string };
    const json = (await res.json()) as NItem[];
    return json.map((r) => ({ id: r.place_id?.toString() ?? `${r.lat}:${r.lon}`, display_name: r.display_name, lat: Number(r.lat), lon: Number(r.lon) }));
  } catch (e) {
    return [];
  }
}

export default LocationProvider;
