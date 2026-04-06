import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SIZE = 1024;

// Light mode logo - blue background, white icon
const lightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0074FF"/>
      <stop offset="100%" style="stop-color:#0054DD"/>
    </linearGradient>
  </defs>

  <!-- Background rounded square -->
  <rect width="${SIZE}" height="${SIZE}" rx="120" ry="120" fill="url(#bg)"/>

  <!-- P letter -->
  <text x="300" y="340" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="340" font-weight="900"
        fill="#FFFFFF" letter-spacing="-10">P</text>

  <!-- Small car icon below -->
  <g transform="translate(300, 480)" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7">
    <!-- car body -->
    <path d="M-60,0 L-50,-20 L-20,-20 L-10,-35 L35,-35 L50,-20 L60,-20 L60,0 Z" fill="#FFFFFF" fill-opacity="0.25"/>
    <!-- wheels -->
    <circle cx="-30" cy="5" r="10" fill="#FFFFFF" fill-opacity="0.5"/>
    <circle cx="35" cy="5" r="10" fill="#FFFFFF" fill-opacity="0.5"/>
  </g>
</svg>`;

// Dark mode logo - white/light background, blue icon
const darkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="100%" style="stop-color:#F0F4FF"/>
    </linearGradient>
  </defs>

  <!-- Background rounded square -->
  <rect width="${SIZE}" height="${SIZE}" rx="120" ry="120" fill="url(#bg)"/>

  <!-- P letter -->
  <text x="300" y="340" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="340" font-weight="900"
        fill="#0064FF" letter-spacing="-10">P</text>

  <!-- Small car icon below -->
  <g transform="translate(300, 480)" fill="none" stroke="#0064FF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5">
    <!-- car body -->
    <path d="M-60,0 L-50,-20 L-20,-20 L-10,-35 L35,-35 L50,-20 L60,-20 L60,0 Z" fill="#0064FF" fill-opacity="0.15"/>
    <!-- wheels -->
    <circle cx="-30" cy="5" r="10" fill="#0064FF" fill-opacity="0.3"/>
    <circle cx="35" cy="5" r="10" fill="#0064FF" fill-opacity="0.3"/>
  </g>
</svg>`;

function renderPng(svg, outputPath) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: SIZE },
    font: {
      loadSystemFonts: true,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  writeFileSync(outputPath, pngBuffer);
  console.log(`Generated: ${outputPath} (${pngBuffer.length} bytes)`);
}

const publicDir = resolve(__dirname, '..', 'public');
const iosIconDir = resolve(__dirname, '..', 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');

renderPng(lightSvg, resolve(publicDir, 'app-logo.png'));
renderPng(darkSvg, resolve(publicDir, 'app-logo-dark.png'));

// iOS App Icon (1024x1024) — no rounded corners, iOS applies mask automatically
const iosIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="ibg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0074FF"/>
      <stop offset="100%" style="stop-color:#0054DD"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#ibg)"/>
  <text x="512" y="580" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="580" font-weight="900"
        fill="#FFFFFF" letter-spacing="-17">P</text>
  <g transform="translate(512, 820)" fill="none" stroke="#FFFFFF" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7">
    <path d="M-102,0 L-85,-34 L-34,-34 L-17,-60 L60,-60 L85,-34 L102,-34 L102,0 Z" fill="#FFFFFF" fill-opacity="0.25"/>
    <circle cx="-51" cy="8.5" r="17" fill="#FFFFFF" fill-opacity="0.5"/>
    <circle cx="60" cy="8.5" r="17" fill="#FFFFFF" fill-opacity="0.5"/>
  </g>
</svg>`;

renderPng(iosIconSvg, resolve(iosIconDir, 'AppIcon-512@2x.png'));
console.log('\\niOS App Icon generated at:', resolve(iosIconDir, 'AppIcon-512@2x.png'));
