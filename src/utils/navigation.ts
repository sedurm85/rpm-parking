import type { NavApp } from '../types/parking';

interface NavTarget {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const NAV_LABELS: Record<NavApp, string> = {
  apple: 'Apple 지도',
  naver: '네이버지도',
  kakao: '카카오맵',
  google: '구글맵',
  tmap: '티맵',
};

function buildAppUrl(app: NavApp, target: NavTarget): string | null {
  const { address } = target;
  const query = encodeURIComponent(address);

  switch (app) {
    case 'apple':
      return null;
    case 'naver':
      return `nmap://search?query=${query}&appname=rpm-parking`;
    case 'kakao':
      return `kakaomap://search?q=${query}`;
    case 'tmap':
      return `tmap://search?keyword=${query}`;
    case 'google':
      return null;
  }
}

function buildWebUrl(app: NavApp, target: NavTarget): string | null {
  const { address } = target;
  const query = encodeURIComponent(address);

  switch (app) {
    case 'apple':
      return `https://maps.apple.com/?q=${query}`;
    case 'naver':
      return `https://map.naver.com/p/search/${query}`;
    case 'kakao':
      return `https://map.kakao.com/?q=${query}`;
    case 'google':
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    case 'tmap':
      return null;
  }
}

function openNavApp(app: NavApp, target: NavTarget): void {
  const appUrl = buildAppUrl(app, target);
  const webUrl = buildWebUrl(app, target);

  // 웹 URL만 있는 경우 (Apple, 구글맵)
  if (!appUrl && webUrl) {
    window.open(webUrl, '_blank');
    return;
  }

  // 앱 전용 + 웹 폴백 없음 (티맵)
  if (appUrl && !webUrl) {
    window.location.href = appUrl;
    setTimeout(() => {
      alert('티맵 앱이 설치되어 있지 않습니다.\n모바일에서 티맵 앱을 설치 후 이용해주세요.');
    }, 1500);
    return;
  }

  // 앱 딥링크 시도 → 실패 시 웹 URL 폴백 (네이버, 카카오)
  if (appUrl && webUrl) {
    const start = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.open(webUrl, '_blank');
      }
    }, 1000);
  }
}

export { NAV_LABELS, buildWebUrl, openNavApp };
