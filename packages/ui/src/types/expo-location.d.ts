declare module 'expo-location' {
  export enum LocationAccuracy {
    Highest = 3
  }

  export type LocationObject = {
    coords: {
      latitude: number;
      longitude: number;
    };
  };

  export function requestForegroundPermissionsAsync(): Promise<{ status: 'granted' | string }>;
  export function getCurrentPositionAsync(options?: { accuracy?: LocationAccuracy; maximumAge?: number; timeout?: number }): Promise<LocationObject>;
  export { LocationAccuracy };
}
