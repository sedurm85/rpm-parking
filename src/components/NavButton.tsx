import type { CSSProperties } from 'react';
import type { NavApp } from '../types/parking';
import { NAV_LABELS, openNavApp } from '../utils/navigation';

interface NavButtonProps {
  app: NavApp;
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const colorMap: Record<NavApp, string> = {
  apple: '#333333',
  naver: '#03C75A',
  kakao: '#FEE500',
  google: '#4285F4',
  tmap: '#EF4136',
};

const textColorMap: Record<NavApp, string> = {
  apple: '#fff',
  naver: '#fff',
  kakao: '#000',
  google: '#fff',
  tmap: '#fff',
};

const styles: Record<string, CSSProperties> = {
  button: {
    flex: 1,
    padding: '12px 8px',
    borderRadius: 10,
    border: 'none',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export function NavButton({ app, lat, lng, name, address }: NavButtonProps) {
  return (
    <button
      style={{
        ...styles.button,
        backgroundColor: colorMap[app],
        color: textColorMap[app],
      }}
      onClick={() => openNavApp(app, { lat, lng, name, address })}
    >
      {NAV_LABELS[app]}
    </button>
  );
}
