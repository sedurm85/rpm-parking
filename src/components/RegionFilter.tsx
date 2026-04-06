import type { CSSProperties } from 'react';
import type { Region } from '../types/parking';
import parkingData from '../data/parkingLots.json';
import type { ParkingLot } from '../types/parking';

const lots = parkingData as ParkingLot[];
const REGIONS: Region[] = [
  '전체',
  ...([...new Set(lots.map((l) => l.region))] as Region[]).sort((a, b) => {
    const order = ['서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
    return order.indexOf(a) - order.indexOf(b);
  }),
];

interface RegionFilterProps {
  selected: Region;
  onSelect: (region: Region) => void;
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    gap: 8,
    padding: '0 16px 12px',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  chip: {
    flexShrink: 0,
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 14,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    color: '#666',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  chipActive: {
    flexShrink: 0,
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 14,
    border: '1px solid #0064FF',
    backgroundColor: '#0064FF',
    color: '#fff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

export function RegionFilter({ selected, onSelect }: RegionFilterProps) {
  return (
    <div style={styles.container}>
      {REGIONS.map((region) => (
        <button
          key={region}
          style={region === selected ? styles.chipActive : styles.chip}
          onClick={() => onSelect(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
