
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/account"
  },
  {
    "renderMode": 2,
    "route": "/vehicles"
  }
],
  assets: {
    'index.csr.html': {size: 842, hash: 'b4a022a7a750a624dea80aadb98210d4f1a4b4888d5a2dfef9734bcf28cc2357', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1382, hash: '0bdbed527947b704e19abecdaa052836cc443b4f7a7c8a9d4cbd35c3e5c70b13', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28336, hash: '35e154eabec6744349ea6e3ff87c0f8ff3164e085175d6785d661d224ac912d2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'vehicles/index.html': {size: 25643, hash: '1c1ff796d710bfcc53e24297326418451892b15d7f075448bc608de658057b9a', text: () => import('./assets-chunks/vehicles_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 69724, hash: '6cb2617bc0ac60e20379eea4d5edea46da54e495e3287d7b3f937cd8b25b4fde', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 25560, hash: '313eac53ccce22d3037cb46b9a96e485e4d011fef56fde5df3ae3bee06739a2c', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'account/index.html': {size: 25559, hash: 'eb3fbba6549de58428116bef5cc97dcfc5f2c20cadd98c344afd85ce4f195dd5', text: () => import('./assets-chunks/account_index_html.mjs').then(m => m.default)}
  },
};
