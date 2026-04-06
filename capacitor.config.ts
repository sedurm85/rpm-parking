import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rpmparking.app',
  appName: 'RPM카드 주차장 찾기',
  webDir: 'dist',
  server: {
    // iOS WKWebView에서 로컬 파일 로딩
    androidScheme: 'https',
  },
  ios: {
    // 상태바 스타일
    preferredContentMode: 'mobile',
  },
  plugins: {
    Geolocation: {
      // iOS에서 위치 권한 요청 시 표시되는 메시지는 Info.plist에서 설정
    },
  },
};

export default config;
