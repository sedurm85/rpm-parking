import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import type { Coordinates } from '../types/parking';

interface UseLocationResult {
  location: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchLocation() {
      try {
        const permission = await Geolocation.requestPermissions();

        if (permission.location === 'denied') {
          if (!cancelled) {
            setError('위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.');
            setLoading(false);
          }
          return;
        }

        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });

        if (!cancelled) {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error && err.message.includes('denied')
              ? '위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.'
              : '위치 정보를 가져올 수 없습니다.';
          setError(message);
          setLoading(false);
        }
      }
    }

    void fetchLocation();

    return () => {
      cancelled = true;
    };
  }, []);

  return { location, error, loading };
}
