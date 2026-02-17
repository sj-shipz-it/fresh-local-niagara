import { useState, useCallback } from 'react';
import { UserLocation } from '../types';

interface GeolocationState {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ location: null, loading: false, error: 'Geolocation is not supported by your browser.' });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: { lat: position.coords.latitude, lng: position.coords.longitude },
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState({
          location: null,
          loading: false,
          error: err.code === 1 ? 'Location access denied. Please enable location in your browser settings.' : 'Unable to determine your location.',
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setState({ location: null, loading: false, error: null });
  }, []);

  return { ...state, requestLocation, clearLocation };
}
