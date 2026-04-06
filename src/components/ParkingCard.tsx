import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ParkingLot } from '../types/parking';

interface ParkingCardProps {
  lot: ParkingLot;
  distance?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const styles: Record<string, CSSProperties> = {
  card: {
    padding: '16px',
    margin: '0 16px 12px',
    backgroundColor: '#fff',
    borderRadius: 12,
    border: '1px solid #f0f0f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: '#191919',
    margin: 0,
  },
  favButton: {
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
  },
  address: {
    fontSize: 13,
    color: '#888',
    margin: '0 0 6px',
  },
  meta: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  badge: {
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 6,
    backgroundColor: '#EBF4FF',
    color: '#0064FF',
  },
  distance: {
    fontSize: 12,
    color: '#0064FF',
    fontWeight: 500,
  },
};

export function ParkingCard({ lot, distance, isFavorite, onToggleFavorite }: ParkingCardProps) {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/detail/${lot.id}`)}
    >
      <div style={styles.header}>
        <h3 style={styles.name}>{lot.name}</h3>
        <button
          style={styles.favButton}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <p style={styles.address}>{lot.address}</p>
      <div style={styles.meta}>
        <span style={styles.badge}>{lot.region}</span>
        <span style={styles.badge}>{lot.freeLimit}</span>
        {distance && <span style={styles.distance}>{distance}</span>}
      </div>
    </div>
  );
}
