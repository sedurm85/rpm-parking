import { useEffect, useRef, useMemo, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import parkingData from '../data/parkingLots.json';
import type { ParkingLot } from '../types/parking';
import { useLocation } from '../hooks/useLocation';
import { useFavorites } from '../hooks/useFavorites';
import { getDistanceKm, formatDistance } from '../utils/distance';
import { TabBar } from '../components/TabBar';

const lots = parkingData as ParkingLot[];

const regionCounts = lots.reduce<Record<string, number>>((acc, lot) => {
  acc[lot.region] = (acc[lot.region] || 0) + 1;
  return acc;
}, {});

// 전체 주차장의 중심 좌표 (대한민국 중심 부근)
const DEFAULT_CENTER: [number, number] = [36.5, 127.5];
const DEFAULT_ZOOM = 7;

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f8fa',
    paddingBottom: 'calc(60px + var(--sab))',
  },
  header: {
    paddingTop: 'calc(20px + var(--sat))',
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: '#0064FF',
    color: '#fff',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    margin: 0,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    margin: '2px 0 0',
  },
  statsRow: {
    display: 'flex',
    gap: 8,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    margin: '2px 0 0',
  },
  mapWrapper: {
    margin: '12px 16px',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  map: {
    height: 300,
    width: '100%',
  },
  tipBanner: {
    margin: '0 16px 12px',
    padding: '12px 16px',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    border: '1px solid #FFE082',
    fontSize: 13,
    color: '#795548',
    lineHeight: 1.5,
  },
  tipBold: {
    fontWeight: 700,
    color: '#E65100',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px 8px',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    color: '#191919',
  },
  sectionMore: {
    fontSize: 13,
    color: '#0064FF',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  lotItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f5f5f5',
    cursor: 'pointer',
  },
  lotInfo: {
    flex: 1,
    minWidth: 0,
  },
  lotName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#191919',
    margin: 0,
  },
  lotMeta: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  lotAddress: {
    fontSize: 12,
    color: '#999',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  lotBadge: {
    fontSize: 11,
    padding: '1px 6px',
    borderRadius: 4,
    backgroundColor: '#EBF4FF',
    color: '#0064FF',
    flexShrink: 0,
  },
  lotRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 12,
    flexShrink: 0,
  },
  lotDistance: {
    fontSize: 14,
    color: '#0064FF',
    fontWeight: 700,
  },
  lotHours: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 2,
  },
  regionSection: {
    padding: '0 16px 12px',
  },
  regionGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  regionChip: {
    padding: '8px 14px',
    borderRadius: 10,
    backgroundColor: '#fff',
    border: '1px solid #e8e8e8',
    fontSize: 13,
    color: '#333',
    cursor: 'pointer',
  },
  regionCount: {
    fontSize: 12,
    color: '#0064FF',
    fontWeight: 600,
    marginLeft: 4,
  },
  favButton: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
  },
};

const parkingIcon = L.divIcon({
  className: '',
  html: '<div style="background:#0064FF;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff;">P</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16],
});

const myLocationIcon = L.divIcon({
  className: '',
  html: '<div style="background:#FF3B30;border-radius:50%;width:14px;height:14px;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export function MapView() {
  const navigate = useNavigate();
  const { location, loading } = useLocation();
  const { isFavorite, toggleFavorite, favoriteIds } = useFavorites();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const sortedLots = useMemo(() => {
    if (!location) return lots;
    return [...lots].sort(
      (a, b) =>
        getDistanceKm(location, { lat: a.lat, lng: a.lng }) -
        getDistanceKm(location, { lat: b.lat, lng: b.lng })
    );
  }, [location]);

  const nearbyLots = sortedLots.slice(0, 5);
  const regions = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const center: [number, number] = location
      ? [location.lat, location.lng]
      : DEFAULT_CENTER;
    const zoom = location ? 11 : DEFAULT_ZOOM;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 현재 위치 마커
    if (location) {
      L.marker([location.lat, location.lng], { icon: myLocationIcon })
        .addTo(map)
        .bindPopup('현재 위치');
    }

    // 주차장 마커
    lots.forEach((lot) => {
      L.marker([lot.lat, lot.lng], { icon: parkingIcon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:160px">` +
            `<strong style="font-size:14px">${lot.name}</strong><br/>` +
            `<span style="font-size:12px;color:#666">${lot.address}</span><br/>` +
            `<span style="font-size:12px;color:#999">${lot.operatingHours}</span><br/>` +
            `<a href="#/detail/${lot.id}" style="font-size:12px;color:#0064FF;text-decoration:none;font-weight:600">상세보기 →</a>` +
          `</div>`
        );
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [location]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.title}>RPM 무료 주차장</h1>
            <p style={styles.subtitle}>신한카드 RPM Platinum# 제휴 주차장</p>
          </div>
        </div>
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{lots.length}</p>
            <p style={styles.statLabel}>전국 주차장</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{regions.length}</p>
            <p style={styles.statLabel}>지역</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{favoriteIds.length}</p>
            <p style={styles.statLabel}>즐겨찾기</p>
          </div>
        </div>
      </div>

      <div style={styles.mapWrapper}>
        <div ref={mapContainerRef} style={styles.map} />
      </div>

      <div style={styles.tipBanner}>
        <span style={styles.tipBold}>💡 이용 TIP</span> 출차 시 반드시{' '}
        <span style={styles.tipBold}>"무료주차 서비스"</span>를 요청하세요.
        전월 1원 이상 실적 필요 · 일 1회 · 월 3회
      </div>

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>
          {loading
            ? '위치 확인 중...'
            : location
              ? '📍 가까운 주차장'
              : '🅿️ 주차장 목록'}
        </h2>
        <button style={styles.sectionMore} onClick={() => navigate('/list')}>
          전체보기 →
        </button>
      </div>

      {nearbyLots.map((lot) => (
        <div
          key={lot.id}
          style={styles.lotItem}
          onClick={() => navigate(`/detail/${lot.id}`)}
        >
          <div style={styles.lotInfo}>
            <p style={styles.lotName}>{lot.name}</p>
            <div style={styles.lotMeta}>
              <span style={styles.lotBadge}>{lot.region}</span>
              <p style={styles.lotAddress}>{lot.address}</p>
            </div>
          </div>
          <div style={styles.lotRight}>
            {location && (
              <span style={styles.lotDistance}>
                {formatDistance(
                  getDistanceKm(location, { lat: lot.lat, lng: lot.lng })
                )}
              </span>
            )}
            <span style={styles.lotHours}>{lot.operatingHours}</span>
          </div>
          <button
            style={{ ...styles.favButton, marginLeft: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(lot.id);
            }}
          >
            {isFavorite(lot.id) ? '★' : '☆'}
          </button>
        </div>
      ))}

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>🗺️ 지역별 주차장</h2>
      </div>
      <div style={styles.regionSection}>
        <div style={styles.regionGrid}>
          {regions.map(([region, count]) => (
            <button
              key={region}
              style={styles.regionChip}
              onClick={() => navigate(`/list?region=${encodeURIComponent(region)}`)}
            >
              {region}<span style={styles.regionCount}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
