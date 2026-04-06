import { useMemo, type CSSProperties } from 'react';
import parkingData from '../data/parkingLots.json';
import type { ParkingLot } from '../types/parking';
import { useLocation } from '../hooks/useLocation';
import { useFavorites } from '../hooks/useFavorites';
import { getDistanceKm, formatDistance } from '../utils/distance';
import { ParkingCard } from '../components/ParkingCard';
import { TabBar } from '../components/TabBar';

const lots = parkingData as ParkingLot[];

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f8fa',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '16px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: '#191919',
  },
  list: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 80,
  },
  empty: {
    textAlign: 'center',
    padding: '60px 16px',
    color: '#999',
    fontSize: 14,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
};

export function Favorites() {
  const { location } = useLocation();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favoriteLots = useMemo(
    () => lots.filter((lot) => favoriteIds.includes(lot.id)),
    [favoriteIds]
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>즐겨찾기</h1>
      </div>

      <div style={styles.list}>
        {favoriteLots.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>⭐</div>
            <p>즐겨찾기한 주차장이 없습니다.</p>
            <p style={{ fontSize: 12, color: '#bbb' }}>
              주차장 목록에서 ☆를 눌러 추가해보세요.
            </p>
          </div>
        ) : (
          favoriteLots.map((lot) => (
            <ParkingCard
              key={lot.id}
              lot={lot}
              distance={
                location
                  ? formatDistance(
                      getDistanceKm(location, { lat: lot.lat, lng: lot.lng })
                    )
                  : undefined
              }
              isFavorite={isFavorite(lot.id)}
              onToggleFavorite={() => toggleFavorite(lot.id)}
            />
          ))
        )}
      </div>

      <TabBar />
    </div>
  );
}
