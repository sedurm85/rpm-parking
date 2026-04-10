import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --sat: env(safe-area-inset-top, 0px);
    --sab: env(safe-area-inset-bottom, 0px);
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f7f8fa;
    color: #191919;
  }
  button {
    font-family: inherit;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const styleEl = document.createElement('style');
styleEl.textContent = globalStyles;
document.head.appendChild(styleEl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
