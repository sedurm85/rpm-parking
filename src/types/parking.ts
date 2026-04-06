export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  operatingHours: string;
  freeCondition: string;
  freeLimit: string;
  region: string;
}

export type Region =
  | '전체'
  | '서울'
  | '경기'
  | '인천'
  | '부산'
  | '대구'
  | '대전'
  | '광주'
  | '울산'
  | '세종'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주';

export type SortType = 'distance' | 'name';

export interface Coordinates {
  lat: number;
  lng: number;
}

export type NavApp = 'apple' | 'naver' | 'kakao' | 'google' | 'tmap';
