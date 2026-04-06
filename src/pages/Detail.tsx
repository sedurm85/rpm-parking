import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parkingData from '../data/parkingLots.json';
import type { ParkingLot, NavApp } from '../types/parking';
import { useLocation } from '../hooks/useLocation';
import { useFavorites } from '../hooks/useFavorites';
import { getDistanceKm, formatDistance } from '../utils/distance';
import { NavButton } from '../components/NavButton';

const lots = parkingData as ParkingLot[];
const NAV_APPS: NavApp[] = ['apple', 'naver', 'kakao', 'google', 'tmap'];

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f8fa',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    padding: '4px 8px 4px 0',
    color: '#191919',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
    flex: 1,
    color: '#191919',
  },
  favButton: {
    background: 'none',
    border: 'none',
    fontSize: 22,
    cursor: 'pointer',
    padding: 0,
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    margin: '0 0 4px',
    color: '#191919',
  },
  distance: {
    fontSize: 14,
    color: '#0064FF',
    fontWeight: 600,
    margin: '0 0 16px',
  },
  infoRow: {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid #f5f5f5',
  },
  infoLabel: {
    width: 80,
    fontSize: 13,
    color: '#999',
    flexShrink: 0,
  },
  infoValue: {
    fontSize: 14,
    color: '#191919',
    flex: 1,
  },
  navSection: {
    margin: '0 16px 16px',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  navTitle: {
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 12px',
    color: '#191919',
  },
  navGrid: {
    display: 'flex',
    gap: 8,
  },
  notFound: {
    textAlign: 'center',
    padding: '60px 16px',
    color: '#999',
    fontSize: 15,
  },
};

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { location } = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const lot = lots.find((l) => l.id === id);

  if (!lot) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ←
          </button>
          <h1 style={styles.headerTitle}>주차장 상세</h1>
        </div>
        <div style={styles.notFound}>주차장 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const distanceText =
    location
      ? formatDistance(getDistanceKm(location, { lat: lot.lat, lng: lot.lng }))
      : null;

  const infoItems = [
    { label: '주소', value: lot.address },
    { label: '운영시간', value: lot.operatingHours },
    { label: '무료 조건', value: lot.freeCondition },
    { label: '이용 한도', value: lot.freeLimit },
    { label: '지역', value: lot.region },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 style={styles.headerTitle}>{lot.name}</h1>
        <button
          style={styles.favButton}
          onClick={() => toggleFavorite(lot.id)}
          aria-label={isFavorite(lot.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFavorite(lot.id) ? '★' : '☆'}
        </button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.name}>{lot.name}</h2>
        {distanceText && (
          <p style={styles.distance}>현재 위치에서 {distanceText}</p>
        )}
        {infoItems.map((item) => (
          <div key={item.label} style={styles.infoRow}>
            <span style={styles.infoLabel}>{item.label}</span>
            <span style={styles.infoValue}>{item.value}</span>
          </div>
        ))}
      </div>

      <div style={styles.navSection}>
        <h3 style={styles.navTitle}>길안내</h3>
        <div style={styles.navGrid}>
          {NAV_APPS.map((app) => (
            <NavButton
              key={app}
              app={app}
              lat={lot.lat}
              lng={lot.lng}
              name={lot.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
