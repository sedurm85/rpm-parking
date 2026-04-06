import type { NavApp } from '../types/parking';

interface NavTarget {
  lat: number;
  lng: number;
  name: string;
}

const NAV_LABELS: Record<NavApp, string> = {
  apple: 'Apple 지도',
  naver: '네이버지도',
  kakao: '카카오맵',
  google: '구글맵',
  tmap: '티맵',
};

function buildAppUrl(app: NavApp, target: NavTarget): string | null {
  const { lat, lng, name } = target;
  const encodedName = encodeURIComponent(name);

  switch (app) {
    case 'apple':
      return null; // iOS에서 https://maps.apple.com이 자동으로 Apple Maps 앱을 실행
    case 'naver':
      return `nmap://navigation?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=rpm-parking`;
    case 'kakao':
      return `kakaomap://route?ep=${lat},${lng}&by=CAR`;
    case 'tmap':
      return `tmap://route?goalx=${lng}&goaly=${lat}&goalname=${encodedName}`;
    case 'google':
      return null;
  }
}

function buildWebUrl(app: NavApp, target: NavTarget): string | null {
  const { lat, lng, name } = target;
  const encodedName = encodeURIComponent(name);

  switch (app) {
    case 'apple':
      return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
    case 'naver':
      return `https://map.naver.com/p/directions/-/${lng},${lat},${encodedName}/-/car`;
    case 'kakao':
      return `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
    case 'google':
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    case 'tmap':
      return null; // 모바일 앱 전용, 웹 폴백 없음
  }
}

function openNavApp(app: NavApp, target: NavTarget): void {
  const appUrl = buildAppUrl(app, target);
  const webUrl = buildWebUrl(app, target);

  // 웹 URL만 있는 경우 (구글맵)
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
