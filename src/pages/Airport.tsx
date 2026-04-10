import { useEffect, useRef, type CSSProperties } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TabBar } from '../components/TabBar';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f8fa',
    paddingBottom: 'calc(80px + var(--sab))',
  },
  header: {
    paddingTop: 'calc(20px + var(--sat))',
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: '#0064FF',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    margin: '4px 0 0',
  },
  mapWrapper: {
    margin: '12px 16px',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  map: {
    height: 280,
    width: '100%',
  },
  legend: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    padding: '0 16px 12px',
    fontSize: 12,
    color: '#666',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    display: 'inline-block',
  },
  section: {
    margin: '0 16px 12px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: 14,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: '0 0 14px',
    color: '#191919',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
    marginTop: 8,
  },
  th: {
    padding: '8px 6px',
    backgroundColor: '#f5f7fa',
    borderBottom: '2px solid #e0e0e0',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: '#555',
  },
  td: {
    padding: '8px 6px',
    borderBottom: '1px solid #f0f0f0',
    fontSize: 13,
    color: '#333',
    verticalAlign: 'top',
  },
  tdTerminal: {
    padding: '8px 6px',
    borderBottom: '1px solid #f0f0f0',
    fontSize: 13,
    color: '#0064FF',
    fontWeight: 600,
    verticalAlign: 'top',
  },
  coffeeBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 6,
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 600,
  },
  restaurantBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 6,
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    fontSize: 12,
    fontWeight: 600,
  },
  conditionBox: {
    marginTop: 12,
    padding: '12px',
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    fontSize: 12,
    color: '#666',
    lineHeight: 1.8,
  },
  terminalLabel: {
    fontSize: 13,
    color: '#555',
    margin: '0 0 10px',
  },
  terminalLabelGap: {
    fontSize: 13,
    color: '#555',
    margin: '16px 0 10px',
  },
  valetBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 6,
    backgroundColor: '#EDE7F6',
    color: '#5E35B1',
    fontSize: 12,
    fontWeight: 600,
  },
  directionCard: {
    margin: '10px 0',
    padding: '16px',
    backgroundColor: '#f9f9ff',
    borderRadius: 12,
    border: '1px solid #E8E0F0',
  },
  directionTerminal: {
    fontSize: 15,
    fontWeight: 700,
    color: '#5E35B1',
    margin: '0 0 10px',
  },
  stepRow: {
    display: 'flex',
    gap: 10,
    padding: '8px 0',
    alignItems: 'flex-start',
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5E35B1',
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 1.5,
    paddingTop: 2,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '8px 12px',
    fontSize: 13,
    marginTop: 10,
  },
  infoLabel: {
    color: '#999',
    fontSize: 12,
  },
  infoValue: {
    color: '#333',
    fontWeight: 500,
  },
  priceTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
    marginTop: 8,
  },
  warningBox: {
    marginTop: 12,
    padding: '12px',
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    border: '1px solid #FFE082',
    fontSize: 12,
    color: '#795548',
    lineHeight: 1.8,
  },
  reserveButton: {
    display: 'block',
    marginTop: 10,
    padding: '10px 0',
    textAlign: 'center',
    backgroundColor: '#5E35B1',
    color: '#fff',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
  },
  loungeBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 6,
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    fontSize: 12,
    fontWeight: 600,
  },
};

interface AirportShop {
  terminal: string;
  area: string;
  name: string;
  location: string;
  type: 'coffee' | 'restaurant';
  lat: number;
  lng: number;
}

const airportShops: AirportShop[] = [
  // T1 커피
  { terminal: 'T1', area: '탑승동', name: '커피빈', location: '탑승동 3층 105번 게이트 부근', type: 'coffee', lat: 37.4410, lng: 126.4528 },
  { terminal: 'T1', area: '일반지역', name: '커피앳웍스', location: '일반지역 3층 12번 게이트 부근', type: 'coffee', lat: 37.4493, lng: 126.4520 },
  { terminal: 'T1', area: '일반지역', name: '잠바주스', location: '일반지역 3층 10번 게이트 부근', type: 'coffee', lat: 37.4490, lng: 126.4510 },
  { terminal: 'T1', area: '여객터미널', name: '던킨 키오스크점', location: '여객터미널 3층 출입구 부근', type: 'coffee', lat: 37.4495, lng: 126.4505 },
  { terminal: 'T1', area: '여객터미널', name: '엔젤리너스(서편)', location: '여객터미널 3층 49번 게이트 부근', type: 'coffee', lat: 37.4488, lng: 126.4470 },
  { terminal: 'T1', area: '여객터미널', name: '리브팜', location: '면세지역 3층 41번 게이트 부근', type: 'coffee', lat: 37.4485, lng: 126.4480 },
  { terminal: 'T1', area: '여객터미널', name: '베스킨라빈스31', location: '면세지역 3층 24번 게이트 부근', type: 'coffee', lat: 37.4498, lng: 126.4498 },
  // T2 커피
  { terminal: 'T2', area: '여객터미널', name: '커피앳웍스', location: '면세지역 3층 264번 게이트 부근', type: 'coffee', lat: 37.4607, lng: 126.4430 },
  { terminal: 'T2', area: '여객터미널', name: '던킨도너츠', location: '면세지역 3층 253번 탑승구 부근', type: 'coffee', lat: 37.4600, lng: 126.4420 },
  { terminal: 'T2', area: '일반지역', name: '커피앳웍스', location: '일반지역 1층 10번 게이트 부근', type: 'coffee', lat: 37.4595, lng: 126.4410 },
  { terminal: 'T2', area: '면세지역', name: '크리스피크림 도넛', location: '3층 면세지역 232번 게이트 부근', type: 'coffee', lat: 37.4610, lng: 126.4415 },
  // T1 레스토랑
  { terminal: 'T1', area: '일반지역', name: '효자곰탕', location: '여객터미널 1층 중앙 플레이팅', type: 'restaurant', lat: 37.4492, lng: 126.4530 },
  { terminal: 'T1', area: '일반지역', name: '소담반상', location: '여객터미널 1층 중앙 플레이팅', type: 'restaurant', lat: 37.4494, lng: 126.4532 },
  { terminal: 'T1', area: '일반지역', name: '공평왕돈까스', location: '여객터미널 1층 중앙 플레이팅', type: 'restaurant', lat: 37.4496, lng: 126.4534 },
  // T2 레스토랑
  { terminal: 'T2', area: '면세지역', name: '효자곰탕', location: '4층 249번 탑승구 부근 플레이팅', type: 'restaurant', lat: 37.4602, lng: 126.4435 },
  { terminal: 'T2', area: '면세지역', name: '소담반상', location: '4층 249번 탑승구 부근 플레이팅', type: 'restaurant', lat: 37.4604, lng: 126.4437 },
  { terminal: 'T2', area: '면세지역', name: '호호카츠', location: '4층 249번 탑승구 부근 플레이팅', type: 'restaurant', lat: 37.4606, lng: 126.4439 },
  { terminal: 'T2', area: '면세지역', name: '정육면체', location: '4층 249번 탑승구 부근 플레이팅', type: 'restaurant', lat: 37.4603, lng: 126.4432 },
  { terminal: 'T2', area: '면세지역', name: '콘타이', location: '4층 249번 탑승구 부근 플레이팅', type: 'restaurant', lat: 37.4605, lng: 126.4434 },
  { terminal: 'T2', area: '면세지역', name: '텍싱5', location: '4층 249번 탑승구 부근 플레이팅', type: 'restaurant', lat: 37.4601, lng: 126.4436 },
];

interface ValetLocation {
  terminal: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
}

const valetLocations: ValetLocation[] = [
  {
    terminal: 'T1',
    name: '제1여객터미널 발렛',
    location: '단기주차장 지하 1층 A구역 (A-15번)',
    lat: 37.4490,
    lng: 126.4513,
  },
  {
    terminal: 'T2',
    name: '제2여객터미널 발렛',
    location: '단기주차장 지하 1층 서편 110~112번',
    lat: 37.4607,
    lng: 126.4380,
  },
];

const coffeeIcon = L.divIcon({
  className: '',
  html: '<div style="background:#2E7D32;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff;">☕</div>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, -15],
});

const restaurantIcon = L.divIcon({
  className: '',
  html: '<div style="background:#E65100;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff;">🍽</div>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, -15],
});

const valetIcon = L.divIcon({
  className: '',
  html: '<div style="background:#5E35B1;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid #fff;">🚗</div>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, -15],
});

function AirportMap() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
    }).setView([37.4530, 126.4470], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    airportShops.forEach((shop) => {
      const icon = shop.type === 'coffee' ? coffeeIcon : restaurantIcon;
      const typeLabel = shop.type === 'coffee' ? '무료 커피' : '10% 할인';
      L.marker([shop.lat, shop.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:140px">` +
            `<strong style="font-size:13px">${shop.name}</strong>` +
            `<span style="font-size:11px;color:#888;margin-left:4px">${shop.terminal}</span><br/>` +
            `<span style="font-size:11px;color:#666">${shop.location}</span><br/>` +
            `<span style="font-size:11px;color:${shop.type === 'coffee' ? '#2E7D32' : '#E65100'};font-weight:600">${typeLabel}</span>` +
          `</div>`
        );
    });

    valetLocations.forEach((valet) => {
      L.marker([valet.lat, valet.lng], { icon: valetIcon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:140px">` +
            `<strong style="font-size:13px">${valet.name}</strong><br/>` +
            `<span style="font-size:11px;color:#666">${valet.location}</span><br/>` +
            `<span style="font-size:11px;color:#5E35B1;font-weight:600">무료 발렛파킹</span>` +
          `</div>`
        );
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={styles.map} />;
}

export function Airport() {
  const t1Coffee = airportShops.filter((s) => s.terminal === 'T1' && s.type === 'coffee');
  const t2Coffee = airportShops.filter((s) => s.terminal === 'T2' && s.type === 'coffee');
  const t1Restaurant = airportShops.filter((s) => s.terminal === 'T1' && s.type === 'restaurant');
  const t2Restaurant = airportShops.filter((s) => s.terminal === 'T2' && s.type === 'restaurant');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>✈️ 인천공항 혜택</h1>
        <p style={styles.subtitle}>Platinum# 카드 + 탑승권 제시</p>
      </div>

      <div style={styles.mapWrapper}>
        <AirportMap />
      </div>
      <div style={styles.legend}>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#2E7D32' }} /> 커피
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#E65100' }} /> 레스토랑
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#5E35B1' }} /> 발렛파킹
        </span>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          ☕ 무료 커피 <span style={styles.coffeeBadge}>아메리카노</span>
        </h2>

        <p style={styles.terminalLabel}>
          <strong>T1 여객터미널</strong> ({t1Coffee.length}개 매장)
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>구역</th>
              <th style={styles.th}>매장명</th>
              <th style={styles.th}>위치</th>
            </tr>
          </thead>
          <tbody>
            {t1Coffee.map((s, i) => (
              <tr key={i}>
                <td style={styles.td}>{s.area}</td>
                <td style={{ ...styles.td, fontWeight: 500 }}>{s.name}</td>
                <td style={styles.td}>{s.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={styles.terminalLabelGap}>
          <strong>T2 여객터미널</strong> ({t2Coffee.length}개 매장)
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>구역</th>
              <th style={styles.th}>매장명</th>
              <th style={styles.th}>위치</th>
            </tr>
          </thead>
          <tbody>
            {t2Coffee.map((s, i) => (
              <tr key={i}>
                <td style={styles.td}>{s.area}</td>
                <td style={{ ...styles.td, fontWeight: 500 }}>{s.name}</td>
                <td style={styles.td}>{s.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.conditionBox}>
          ・ 월 1회(2잔), 연 6회(12잔) 제공 (본인/가족카드 통합)<br />
          ・ 전월 Platinum# 1회 이상 사용 시<br />
          ・ 신규 발급: 2개월간 전월 실적 확인 없이 제공
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🍽️ 레스토랑 할인 <span style={styles.restaurantBadge}>10% OFF</span>
        </h2>

        <p style={styles.terminalLabel}>
          <strong>T1</strong> - 1층 일반지역 중앙 플레이팅
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>업체</th>
              <th style={styles.th}>매장명</th>
            </tr>
          </thead>
          <tbody>
            {t1Restaurant.map((s, i) => (
              <tr key={i}>
                <td style={styles.tdTerminal}>롯데GRS</td>
                <td style={{ ...styles.td, fontWeight: 500 }}>{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={styles.terminalLabelGap}>
          <strong>T2</strong> - 면세지역 4층 249번 탑승구 부근 플레이팅
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>업체</th>
              <th style={styles.th}>매장명</th>
            </tr>
          </thead>
          <tbody>
            {t2Restaurant.map((s, i) => (
              <tr key={i}>
                <td style={styles.tdTerminal}>롯데GRS</td>
                <td style={{ ...styles.td, fontWeight: 500 }}>{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.conditionBox}>
          ・ Platinum# 카드 결제 시 10% 현장 할인<br />
          ・ 다른 할인/쿠폰과 중복 적용 불가
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🚗 무료 발렛파킹 <span style={styles.valetBadge}>Platinum#</span>
        </h2>

        <div style={styles.directionCard}>
          <p style={styles.directionTerminal}>T1 제1여객터미널 <span style={{ fontSize: 12, color: '#888', fontWeight: 400 }}>운영: 맥서브(Maxerve)</span></p>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>1</span>
            <span style={styles.stepText}>단기주차장 입구 3차로 → <strong>지하 1층 A구역(A-15번)</strong>으로 진입</span>
          </div>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>2</span>
            <span style={styles.stepText}>접수장에서 Platinum# 카드 제시 → 차량 인계</span>
          </div>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>3</span>
            <span style={styles.stepText}>도보 3~4분 이동하여 출국장 진입</span>
          </div>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>4</span>
            <span style={styles.stepText}>귀국 시 지하 3층 정산소(A32/H38 구역)에서 차량 인도</span>
          </div>
          <a
            href="https://maxerve-mparking.com/reserve/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.reserveButton}
          >
            T1 발렛 예약하기 (맥서브)
          </a>
        </div>

        <div style={styles.directionCard}>
          <p style={styles.directionTerminal}>T2 제2여객터미널 <span style={{ fontSize: 12, color: '#888', fontWeight: 400 }}>운영: 아마노코리아</span></p>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>1</span>
            <span style={styles.stepText}>지하 1층 서편(West)으로 이동</span>
          </div>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>2</span>
            <span style={styles.stepText}>110~112번 주차구역의 발렛 데스크에서 접수</span>
          </div>
          <div style={styles.stepRow}>
            <span style={styles.stepNum}>3</span>
            <span style={styles.stepText}>Platinum# 카드 제시 → 무료 발렛 접수</span>
          </div>
          <a
            href="https://valet.amanopark.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.reserveButton}
          >
            T2 발렛 예약하기 (아마노코리아)
          </a>
        </div>

        <div style={styles.infoGrid}>
          <span style={styles.infoLabel}>운영 시간</span>
          <span style={styles.infoValue}>24시간 (접수/출차 모두)</span>
        </div>

        <table style={styles.priceTable}>
          <thead>
            <tr>
              <th style={styles.th}>항목</th>
              <th style={styles.th}>일반 요금</th>
              <th style={styles.th}>Platinum# 혜택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>발렛 서비스료</td>
              <td style={styles.td}>20,000원</td>
              <td style={{ ...styles.td, color: '#5E35B1', fontWeight: 700 }}>무료</td>
            </tr>
            <tr>
              <td style={styles.td}>주차 요금</td>
              <td style={styles.td}>9,000원/일</td>
              <td style={{ ...styles.td, color: '#999' }}>별도 (본인 부담)</td>
            </tr>
          </tbody>
        </table>

        <p style={{ ...styles.terminalLabelGap, fontWeight: 700 }}>카드별 이용 조건</p>
        <table style={styles.priceTable}>
          <thead>
            <tr>
              <th style={styles.th}>카드</th>
              <th style={styles.th}>전월 실적</th>
              <th style={styles.th}>이용 횟수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...styles.td, fontWeight: 600 }}>RPM Platinum# (구RPM)</td>
              <td style={{ ...styles.td, color: '#5E35B1', fontWeight: 600 }}>1회 사용 (금액 무관)</td>
              <td style={styles.td}>일 1회, 월 3회</td>
            </tr>
            <tr>
              <td style={{ ...styles.td, fontWeight: 600 }}>RPM+ Platinum#</td>
              <td style={styles.td}>30만원 이상</td>
              <td style={styles.td}>일 1회, 월 3회</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.conditionBox}>
          ・ 본인 + 가족카드, Platinum# 계열 통합 월 3회<br />
          ・ RPM Platinum#(구RPM): 전월 1회만 사용하면 금액 무관<br />
          ・ AMEX 브랜드는 전월 30만원 이상 필요
        </div>

        <div style={styles.warningBox}>
          ⚠️ 발렛 서비스료만 무료이며, 주차 요금은 별도입니다.<br />
          ⚠️ 성수기(연휴·명절)에는 서비스가 제한될 수 있습니다.<br />
          ⚠️ T1은 사전 예약 필수 (현장접수 제한)
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🛋️ 공항 라운지 <span style={styles.loungeBadge}>본인 무료</span>
        </h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>라운지</th>
              <th style={styles.th}>위치</th>
              <th style={styles.th}>혜택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...styles.td, fontWeight: 500 }}>마티나 라운지</td>
              <td style={styles.td}>인천 T1/T2</td>
              <td style={{ ...styles.td, color: '#1565C0', fontWeight: 600 }}>본인 무료 입장</td>
            </tr>
            <tr>
              <td style={{ ...styles.td, fontWeight: 500 }}>스카이허브 라운지</td>
              <td style={styles.td}>김포, 김해</td>
              <td style={{ ...styles.td, color: '#1565C0', fontWeight: 600 }}>본인 무료 입장</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.conditionBox}>
          ・ JCB / AMEX 브랜드 Platinum 등급 서비스로 <strong>본인 무료 입장</strong><br />
          ・ 연 2회 제공 (카드당)<br />
          ・ 동반자: 1인당 26,400원 (36개월 미만 유아 1명 무료)<br />
          ・ VISA 브랜드는 라운지 무료 입장 혜택 없음
        </div>
      </div>

      <TabBar />
    </div>
  );
}
