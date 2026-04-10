import type { CSSProperties } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', label: '🗺️ 지도' },
  { path: '/list', label: '📋 리스트' },
  { path: '/favorites', label: '⭐ 즐겨찾기' },
  { path: '/guide', label: 'ℹ️ 이용안내' },
  { path: '/airport', label: '✈️ 공항혜택' },
];

const styles: Record<string, CSSProperties> = {
  bar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fff',
    paddingBottom: 'var(--sab)',
    zIndex: 100,
  },
  tab: {
    flex: 1,
    padding: '14px 0',
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  tabActive: {
    flex: 1,
    padding: '14px 0',
    textAlign: 'center',
    fontSize: 13,
    color: '#0064FF',
    fontWeight: 600,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
};

export function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.bar}>
      {tabs.map((tab) => (
        <button
          key={tab.path}
          style={location.pathname === tab.path ? styles.tabActive : styles.tab}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
