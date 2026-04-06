import type { CSSProperties } from 'react';
import { TabBar } from '../components/TabBar';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f8fa',
    paddingBottom: 80,
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
  section: {
    margin: '12px 16px',
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
  row: {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid #f5f5f5',
  },
  rowLast: {
    display: 'flex',
    padding: '10px 0',
  },
  label: {
    width: 90,
    fontSize: 13,
    color: '#999',
    flexShrink: 0,
  },
  value: {
    fontSize: 14,
    color: '#191919',
    flex: 1,
    lineHeight: 1.5,
  },
  highlight: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 6,
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    fontSize: 13,
    fontWeight: 600,
  },
  tipList: {
    margin: 0,
    padding: '0 0 0 18px',
    fontSize: 14,
    color: '#333',
    lineHeight: 2,
  },
  warning: {
    margin: '12px 16px',
    padding: '16px 20px',
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    border: '1px solid #FFE082',
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#E65100',
    margin: '0 0 8px',
  },
  warningText: {
    fontSize: 13,
    color: '#795548',
    lineHeight: 1.6,
    margin: 0,
  },
  stepList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  step: {
    display: 'flex',
    gap: 12,
    padding: '10px 0',
    borderBottom: '1px solid #f5f5f5',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0064FF',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 1.5,
    paddingTop: 3,
  },
};

const conditions = [
  { label: '대상 카드', value: '신한카드 RPM (구 RPM Platinum#) 및 Platinum# 계열' },
  { label: '이용 자격', value: '전월 1일~말일 사이 Platinum# 카드 1회 이상 사용 (1원이라도 실적 필요)' },
  { label: '무료 한도', value: '일 1회, 월 3회' },
  { label: '통합 기준', value: '본인 + 가족카드 통합, Platinum# 계열 통합' },
  { label: '신규 발급', value: '발급 후 1개월간 전월 실적 확인 없이 제공' },
];

const steps = [
  '제휴 주차장에 주차합니다.',
  '출차 시 무인정산기 또는 관리실에서 "무료주차 서비스"를 요청합니다.',
  '신한카드 RPM (Platinum#)으로 승인합니다.',
  '무료 주차가 적용됩니다.',
];

const tips = [
  '"무료주차 서비스 요청" 없이 카드만 제시하면 일반 요금이 결제됩니다.',
  '운영시간 외 입/출차 시 무료 혜택이 적용되지 않습니다.',
  'KTX역사 주차장은 24시간 기준이며, 입차 시점부터 24시간 이내 출차해야 합니다.',
  '주차장 만차 시 무료주차 서비스가 제공되지 않습니다.',
  '제휴 주차장은 수시 변경될 수 있으니, 이용 전 신한카드 앱에서 확인하세요.',
  'AMEX 브랜드 Platinum# 카드는 전월 실적 30만원 이상 필요합니다.',
];

export function Guide() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>무료주차 이용안내</h1>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 이용 조건</h2>
        {conditions.map((item, i) => (
          <div key={item.label} style={i < conditions.length - 1 ? styles.row : styles.rowLast}>
            <span style={styles.label}>{item.label}</span>
            <span style={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>

      <div style={styles.warning}>
        <p style={styles.warningTitle}>⚠️ 꼭 기억하세요</p>
        <p style={styles.warningText}>
          반드시 <span style={styles.highlight}>무료주차 서비스 요청</span> 후 카드를 승인해야 합니다.
          요청 없이 카드만 제시하면 일반 주차요금이 결제됩니다!
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚗 이용 방법</h2>
        <ol style={styles.stepList}>
          {steps.map((step, i) => (
            <li key={i} style={styles.step}>
              <span style={styles.stepNumber}>{i + 1}</span>
              <span style={styles.stepText}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 유의사항</h2>
        <ul style={styles.tipList}>
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <TabBar />
    </div>
  );
}
