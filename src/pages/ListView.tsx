import { useState, useMemo, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import parkingData from '../data/parkingLots.json';
import type { ParkingLot, Region, SortType } from '../types/parking';
import { useLocation } from '../hooks/useLocation';
import { useFavorites } from '../hooks/useFavorites';
import { getDistanceKm, formatDistance } from '../utils/distance';
import { SearchBar } from '../components/SearchBar';
import { RegionFilter } from '../components/RegionFilter';
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
    padding: '16px 16px 0',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: '#191919',
  },
  sortRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px 12px',
    backgroundColor: '#fff',
  },
  count: {
    fontSize: 13,
    color: '#888',
  },
  sortButton: {
    fontSize: 13,
    color: '#0064FF',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  list: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 80,
  },
  empty: {
    textAlign: 'center',
    padding: '40px 16px',
    color: '#999',
    fontSize: 14,
  },
};

export function ListView() {
  const [searchParams] = useSearchParams();
  const initialRegion = (searchParams.get('region') || '전체') as Region;

  const { location } = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>(initialRegion);
  const [sortType, setSortType] = useState<SortType>('distance');

  const filteredLots = useMemo(() => {
    let result = lots;

    if (region !== '전체') {
      result = result.filter((lot) => lot.region === region);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (lot) =>
          lot.name.toLowerCase().includes(q) ||
          lot.address.toLowerCase().includes(q)
      );
    }

    if (sortType === 'distance' && location) {
      result = [...result].sort(
        (a, b) =>
          getDistanceKm(location, { lat: a.lat, lng: a.lng }) -
          getDistanceKm(location, { lat: b.lat, lng: b.lng })
      );
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    }

    return result;
  }, [search, region, sortType, location]);

  const toggleSort = () => {
    setSortType((prev) => (prev === 'distance' ? 'name' : 'distance'));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>주차장 검색</h1>
      </div>

      <div style={{ backgroundColor: '#fff' }}>
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter selected={region} onSelect={setRegion} />
      </div>

      <div style={styles.sortRow}>
        <span style={styles.count}>{filteredLots.length}개 주차장</span>
        <button style={styles.sortButton} onClick={toggleSort}>
          {sortType === 'distance' ? '거리순' : '이름순'} ↕
        </button>
      </div>

      <div style={styles.list}>
        {filteredLots.length === 0 ? (
          <div style={styles.empty}>검색 결과가 없습니다.</div>
        ) : (
          filteredLots.map((lot) => (
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
