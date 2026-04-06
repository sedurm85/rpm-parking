import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', 'assets-store');
mkdirSync(outDir, { recursive: true });

function renderPng(svg, width, outputPath) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  });
  const pngBuffer = resvg.render().asPng();
  writeFileSync(outputPath, pngBuffer);
  console.log(`Generated: ${outputPath} (${pngBuffer.length} bytes)`);
}

// ===== 1. 가로형 썸네일 (1932 x 828) =====
const thumbnailSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1932" height="828" viewBox="0 0 1932 828">
  <defs>
    <linearGradient id="tbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0074FF"/>
      <stop offset="100%" style="stop-color:#0044CC"/>
    </linearGradient>
  </defs>
  <rect width="1932" height="828" fill="url(#tbg)"/>

  <!-- Left side: text -->
  <text x="120" y="280" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" fill="#FFFFFF">RPM 카드</text>
  <text x="120" y="380" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" fill="#FFFFFF">무료주차장 찾기</text>
  <text x="120" y="460" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)">전국 제휴 무료주차장을 한눈에</text>

  <!-- Badge -->
  <rect x="120" y="510" width="260" height="52" rx="26" fill="rgba(255,255,255,0.2)"/>
  <text x="250" y="544" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#FFFFFF">신한카드 RPM 제휴</text>

  <!-- Right side: phone mockup -->
  <g transform="translate(1200, 80)">
    <!-- Phone frame -->
    <rect x="0" y="0" width="380" height="680" rx="40" fill="#1a1a1a"/>
    <rect x="8" y="8" width="364" height="664" rx="34" fill="#f7f8fa"/>

    <!-- Header area -->
    <rect x="8" y="8" width="364" height="140" rx="34" fill="#0064FF"/>
    <rect x="8" y="100" width="364" height="48" fill="#0064FF"/>
    <text x="40" y="70" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF">RPM 무료 주차장</text>
    <text x="40" y="100" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)">신한카드 RPM Platinum# 제휴</text>

    <!-- Stats row -->
    <rect x="30" y="118" width="100" height="40" rx="8" fill="rgba(255,255,255,0.15)"/>
    <rect x="140" y="118" width="100" height="40" rx="8" fill="rgba(255,255,255,0.15)"/>
    <rect x="250" y="118" width="100" height="40" rx="8" fill="rgba(255,255,255,0.15)"/>

    <!-- Map area -->
    <rect x="24" y="165" width="332" height="180" rx="12" fill="#e8eef5"/>
    <circle cx="190" cy="255" r="8" fill="#0064FF"/>
    <circle cx="140" cy="230" r="6" fill="#0064FF" opacity="0.6"/>
    <circle cx="250" cy="270" r="6" fill="#0064FF" opacity="0.6"/>
    <circle cx="220" cy="220" r="6" fill="#0064FF" opacity="0.6"/>
    <text x="190" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#999">지도 영역</text>

    <!-- List items -->
    <rect x="24" y="360" width="332" height="60" rx="8" fill="#FFFFFF"/>
    <rect x="36" y="372" width="120" height="14" rx="4" fill="#333"/>
    <rect x="36" y="394" width="80" height="10" rx="3" fill="#ccc"/>
    <rect x="310" y="378" width="36" height="16" rx="4" fill="#EBF4FF"/>

    <rect x="24" y="428" width="332" height="60" rx="8" fill="#FFFFFF"/>
    <rect x="36" y="440" width="140" height="14" rx="4" fill="#333"/>
    <rect x="36" y="462" width="90" height="10" rx="3" fill="#ccc"/>
    <rect x="310" y="446" width="36" height="16" rx="4" fill="#EBF4FF"/>

    <rect x="24" y="496" width="332" height="60" rx="8" fill="#FFFFFF"/>
    <rect x="36" y="508" width="110" height="14" rx="4" fill="#333"/>
    <rect x="36" y="530" width="70" height="10" rx="3" fill="#ccc"/>
    <rect x="310" y="514" width="36" height="16" rx="4" fill="#EBF4FF"/>

    <!-- Tab bar -->
    <rect x="8" y="614" width="364" height="58" rx="0" fill="#FFFFFF"/>
    <line x1="8" y1="614" x2="372" y2="614" stroke="#eee" stroke-width="1"/>
    <circle cx="80" cy="638" r="8" fill="#0064FF"/>
    <circle cx="150" cy="638" r="8" fill="#ddd"/>
    <circle cx="220" cy="638" r="8" fill="#ddd"/>
    <circle cx="290" cy="638" r="8" fill="#ddd"/>
  </g>

  <!-- Decorative dots -->
  <circle cx="900" cy="200" r="80" fill="rgba(255,255,255,0.05)"/>
  <circle cx="950" cy="600" r="120" fill="rgba(255,255,255,0.03)"/>
</svg>`;

// ===== 2. 세로형 스크린샷 3장 (636 x 1048) =====

// Screenshot 1: 지도 메인 화면
const screenshot1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="636" height="1048" viewBox="0 0 636 1048">
  <rect width="636" height="1048" fill="#f7f8fa"/>

  <!-- Status bar -->
  <rect width="636" height="44" fill="#0064FF"/>
  <text x="318" y="30" text-anchor="middle" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.8)">9:41</text>

  <!-- Header -->
  <rect y="44" width="636" height="180" fill="#0064FF"/>
  <text x="36" y="100" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800" fill="#FFFFFF">RPM 무료 주차장</text>
  <text x="36" y="132" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="rgba(255,255,255,0.8)">신한카드 RPM Platinum# 제휴 주차장</text>

  <!-- Stats -->
  <rect x="36" y="155" width="176" height="54" rx="10" fill="rgba(255,255,255,0.15)"/>
  <text x="124" y="178" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">48</text>
  <text x="124" y="198" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.8)">전국 주차장</text>

  <rect x="224" y="155" width="176" height="54" rx="10" fill="rgba(255,255,255,0.15)"/>
  <text x="312" y="178" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">12</text>
  <text x="312" y="198" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.8)">지역</text>

  <rect x="412" y="155" width="176" height="54" rx="10" fill="rgba(255,255,255,0.15)"/>
  <text x="500" y="178" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#FFFFFF">3</text>
  <text x="500" y="198" text-anchor="middle" font-family="Arial" font-size="11" fill="rgba(255,255,255,0.8)">즐겨찾기</text>

  <!-- Map -->
  <rect x="24" y="240" width="588" height="320" rx="14" fill="#dde5ed"/>
  <!-- Map markers -->
  <circle cx="300" cy="380" r="14" fill="#0064FF"/>
  <text x="300" y="386" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#FFF">P</text>
  <circle cx="200" cy="340" r="12" fill="#0064FF" opacity="0.7"/>
  <text x="200" y="345" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#FFF">P</text>
  <circle cx="420" cy="420" r="12" fill="#0064FF" opacity="0.7"/>
  <text x="420" y="425" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#FFF">P</text>
  <circle cx="350" cy="310" r="12" fill="#0064FF" opacity="0.7"/>
  <text x="350" y="315" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#FFF">P</text>
  <!-- My location -->
  <circle cx="310" cy="400" r="7" fill="#FF3B30"/>
  <circle cx="310" cy="400" r="10" fill="none" stroke="#FF3B30" stroke-width="2" opacity="0.3"/>

  <!-- Tip banner -->
  <rect x="24" y="576" width="588" height="56" rx="12" fill="#FFF8E1" stroke="#FFE082" stroke-width="1"/>
  <text x="48" y="608" font-family="Arial" font-size="14" fill="#795548">💡 이용 TIP: 출차 시 "무료주차 서비스"를 요청하세요</text>

  <!-- Section header -->
  <text x="36" y="672" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#191919">📍 가까운 주차장</text>
  <text x="540" y="672" font-family="Arial" font-size="16" fill="#0064FF" font-weight="500">전체보기 →</text>

  <!-- List items -->
  <rect x="0" y="692" width="636" height="80" fill="#FFFFFF"/>
  <text x="36" y="724" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#191919">여의도 IFC몰 주차장</text>
  <rect x="36" y="734" width="40" height="20" rx="4" fill="#EBF4FF"/>
  <text x="56" y="749" text-anchor="middle" font-family="Arial" font-size="12" fill="#0064FF">서울</text>
  <text x="86" y="749" font-family="Arial" font-size="13" fill="#999">서울 영등포구 국제금융로 10</text>
  <text x="570" y="724" text-anchor="end" font-family="Arial" font-size="16" font-weight="700" fill="#0064FF">1.2km</text>
  <text x="570" y="749" text-anchor="end" font-family="Arial" font-size="12" fill="#bbb">24시간</text>
  <text x="606" y="728" font-family="Arial" font-size="20" fill="#FFD700">★</text>

  <line x1="36" y1="772" x2="600" y2="772" stroke="#f5f5f5" stroke-width="1"/>

  <rect x="0" y="772" width="636" height="80" fill="#FFFFFF"/>
  <text x="36" y="804" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#191919">코엑스몰 주차장</text>
  <rect x="36" y="814" width="40" height="20" rx="4" fill="#EBF4FF"/>
  <text x="56" y="829" text-anchor="middle" font-family="Arial" font-size="12" fill="#0064FF">서울</text>
  <text x="86" y="829" font-family="Arial" font-size="13" fill="#999">서울 강남구 영동대로 513</text>
  <text x="570" y="804" text-anchor="end" font-family="Arial" font-size="16" font-weight="700" fill="#0064FF">3.5km</text>
  <text x="570" y="829" text-anchor="end" font-family="Arial" font-size="12" fill="#bbb">06:00-23:00</text>
  <text x="606" y="808" font-family="Arial" font-size="20" fill="#ccc">☆</text>

  <!-- Tab bar -->
  <rect y="988" width="636" height="60" fill="#FFFFFF"/>
  <line x1="0" y1="988" x2="636" y2="988" stroke="#eee" stroke-width="1"/>
  <text x="80" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#0064FF" font-weight="600">지도</text>
  <text x="212" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">목록</text>
  <text x="344" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">즐겨찾기</text>
  <text x="476" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">안내</text>
  <text x="558" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">공항</text>
</svg>`;

// Screenshot 2: 목록 화면
const screenshot2 = `
<svg xmlns="http://www.w3.org/2000/svg" width="636" height="1048" viewBox="0 0 636 1048">
  <rect width="636" height="1048" fill="#f7f8fa"/>

  <!-- Status bar -->
  <rect width="636" height="44" fill="#FFFFFF"/>
  <text x="318" y="30" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">9:41</text>

  <!-- Header -->
  <rect y="44" width="636" height="60" fill="#FFFFFF"/>
  <text x="318" y="84" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#191919">전체 주차장</text>
  <line x1="0" y1="104" x2="636" y2="104" stroke="#eee" stroke-width="1"/>

  <!-- Search/filter -->
  <rect x="24" y="116" width="588" height="44" rx="10" fill="#FFFFFF" stroke="#e8e8e8" stroke-width="1"/>
  <text x="52" y="144" font-family="Arial" font-size="15" fill="#bbb">🔍 주차장 검색...</text>

  <!-- Region chips -->
  <rect x="24" y="176" width="56" height="34" rx="17" fill="#0064FF"/>
  <text x="52" y="198" text-anchor="middle" font-family="Arial" font-size="14" fill="#FFFFFF">전체</text>
  <rect x="88" y="176" width="56" height="34" rx="17" fill="#FFFFFF" stroke="#e8e8e8" stroke-width="1"/>
  <text x="116" y="198" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">서울</text>
  <rect x="152" y="176" width="68" height="34" rx="17" fill="#FFFFFF" stroke="#e8e8e8" stroke-width="1"/>
  <text x="186" y="198" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">경기도</text>
  <rect x="228" y="176" width="68" height="34" rx="17" fill="#FFFFFF" stroke="#e8e8e8" stroke-width="1"/>
  <text x="262" y="198" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">부산</text>
  <rect x="304" y="176" width="68" height="34" rx="17" fill="#FFFFFF" stroke="#e8e8e8" stroke-width="1"/>
  <text x="338" y="198" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">대전</text>

  <!-- List items -->
  ${[
    { name: '여의도 IFC몰 주차장', region: '서울', addr: '서울 영등포구 국제금융로 10', dist: '1.2km', hours: '24시간', fav: true },
    { name: '코엑스몰 주차장', region: '서울', addr: '서울 강남구 영동대로 513', dist: '3.5km', hours: '06:00-23:00', fav: false },
    { name: '롯데월드몰 주차장', region: '서울', addr: '서울 송파구 올림픽로 300', dist: '5.1km', hours: '24시간', fav: true },
    { name: '스타필드 하남 주차장', region: '경기', addr: '경기 하남시 미사대로 750', dist: '12km', hours: '10:00-22:00', fav: false },
    { name: '신세계 센텀시티 주차장', region: '부산', addr: '부산 해운대구 센텀남대로 35', dist: '325km', hours: '10:00-22:00', fav: false },
    { name: '대전 갤러리아 주차장', region: '대전', addr: '대전 서구 대덕대로 211', dist: '160km', hours: '10:30-20:00', fav: false },
    { name: '현대백화점 판교점', region: '경기', addr: '경기 성남시 분당구 판교역로 146', dist: '18km', hours: '10:30-20:00', fav: false },
  ].map((item, i) => {
    const y = 230 + i * 100;
    return `
      <rect x="0" y="${y}" width="636" height="100" fill="#FFFFFF"/>
      <text x="36" y="${y + 34}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#191919">${item.name}</text>
      <rect x="36" y="${y + 46}" width="40" height="20" rx="4" fill="#EBF4FF"/>
      <text x="56" y="${y + 61}" text-anchor="middle" font-family="Arial" font-size="12" fill="#0064FF">${item.region}</text>
      <text x="86" y="${y + 61}" font-family="Arial" font-size="13" fill="#999">${item.addr}</text>
      <text x="570" y="${y + 34}" text-anchor="end" font-family="Arial" font-size="16" font-weight="700" fill="#0064FF">${item.dist}</text>
      <text x="570" y="${y + 61}" text-anchor="end" font-family="Arial" font-size="12" fill="#bbb">${item.hours}</text>
      <text x="606" y="${y + 38}" font-family="Arial" font-size="20" fill="${item.fav ? '#FFD700' : '#ccc'}">${item.fav ? '★' : '☆'}</text>
      <line x1="36" y1="${y + 99}" x2="600" y2="${y + 99}" stroke="#f5f5f5" stroke-width="1"/>
    `;
  }).join('')}

  <!-- Tab bar -->
  <rect y="988" width="636" height="60" fill="#FFFFFF"/>
  <line x1="0" y1="988" x2="636" y2="988" stroke="#eee" stroke-width="1"/>
  <text x="80" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">지도</text>
  <text x="212" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#0064FF" font-weight="600">목록</text>
  <text x="344" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">즐겨찾기</text>
  <text x="476" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">안내</text>
  <text x="558" y="1024" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">공항</text>
</svg>`;

// Screenshot 3: 상세 화면
const screenshot3 = `
<svg xmlns="http://www.w3.org/2000/svg" width="636" height="1048" viewBox="0 0 636 1048">
  <rect width="636" height="1048" fill="#f7f8fa"/>

  <!-- Status bar -->
  <rect width="636" height="44" fill="#FFFFFF"/>
  <text x="318" y="30" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">9:41</text>

  <!-- Header -->
  <rect y="44" width="636" height="60" fill="#FFFFFF"/>
  <text x="36" y="82" font-family="Arial" font-size="24" fill="#333">←</text>
  <text x="318" y="84" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#191919">주차장 상세</text>
  <text x="600" y="84" text-anchor="end" font-family="Arial" font-size="24" fill="#FFD700">★</text>
  <line x1="0" y1="104" x2="636" y2="104" stroke="#eee" stroke-width="1"/>

  <!-- Map area -->
  <rect x="0" y="104" width="636" height="260" fill="#dde5ed"/>
  <circle cx="318" cy="234" r="16" fill="#0064FF"/>
  <text x="318" y="240" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#FFF">P</text>

  <!-- Info card -->
  <rect x="24" y="380" width="588" height="200" rx="16" fill="#FFFFFF"/>
  <text x="52" y="424" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#191919">여의도 IFC몰 주차장</text>
  <rect x="52" y="440" width="46" height="24" rx="4" fill="#EBF4FF"/>
  <text x="75" y="457" text-anchor="middle" font-family="Arial" font-size="13" fill="#0064FF">서울</text>
  <rect x="106" y="440" width="46" height="24" rx="4" fill="#E8F5E9"/>
  <text x="129" y="457" text-anchor="middle" font-family="Arial" font-size="13" fill="#2E7D32">무료</text>

  <!-- Info rows -->
  <text x="52" y="498" font-family="Arial" font-size="16" fill="#666">📍 서울 영등포구 국제금융로 10</text>
  <text x="52" y="530" font-family="Arial" font-size="16" fill="#666">🕐 24시간</text>
  <text x="52" y="562" font-family="Arial" font-size="16" fill="#666">🚗 수용 1,500대</text>

  <!-- Conditions card -->
  <rect x="24" y="600" width="588" height="160" rx="16" fill="#FFFFFF"/>
  <text x="52" y="640" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#191919">이용 조건</text>
  <text x="52" y="672" font-family="Arial" font-size="15" fill="#666">• 신한카드 RPM Platinum# 소지자</text>
  <text x="52" y="700" font-family="Arial" font-size="15" fill="#666">• 전월 1원 이상 이용 실적</text>
  <text x="52" y="728" font-family="Arial" font-size="15" fill="#666">• 일 1회, 월 3회 무료 이용 가능</text>

  <!-- Action buttons -->
  <rect x="24" y="784" width="284" height="56" rx="12" fill="#0064FF"/>
  <text x="166" y="818" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#FFFFFF">길찾기</text>
  <rect x="328" y="784" width="284" height="56" rx="12" fill="#FFFFFF" stroke="#e8e8e8" stroke-width="1"/>
  <text x="470" y="818" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#333">전화하기</text>

  <!-- Notes -->
  <rect x="24" y="860" width="588" height="100" rx="16" fill="#FFF8E1" stroke="#FFE082" stroke-width="1"/>
  <text x="52" y="896" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#E65100">💡 이용 안내</text>
  <text x="52" y="924" font-family="Arial" font-size="14" fill="#795548">출차 시 반드시 "무료주차 서비스"를 요청해 주세요.</text>
  <text x="52" y="946" font-family="Arial" font-size="14" fill="#795548">미요청 시 일반 요금이 부과될 수 있습니다.</text>
</svg>`;

// Render all
renderPng(thumbnailSvg, 1932, resolve(outDir, 'thumbnail-1932x828.png'));
renderPng(screenshot1, 636, resolve(outDir, 'screenshot-1-map.png'));
renderPng(screenshot2, 636, resolve(outDir, 'screenshot-2-list.png'));
renderPng(screenshot3, 636, resolve(outDir, 'screenshot-3-detail.png'));

console.log('\nAll assets generated in:', outDir);
