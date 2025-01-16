
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
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
    'index.csr.html': {size: 23688, hash: 'b7071ac6757148c9ff2b6a4b534a422c5aed34976e1f1c07d03eb3b3338a9900', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17262, hash: 'ab964d617456f3d7649a0d480e1a8d5789db0a68cfe640e308b987b5e45264e2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 50787, hash: 'e791a72cf33389c3f14d7defd75f568818355e673d894da1988fd19a68577226', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 48263, hash: '8eb42fba60ac86a6b9f5f30eb4fe8d3b7cbb1374484c2c03eef486b7087e5e9d', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'vehicles/index.html': {size: 48229, hash: '4e728d5d812ca023bf8cfc20586b080a9dd2bd69a39520e4289cab5a04450556', text: () => import('./assets-chunks/vehicles_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 91533, hash: 'df31a5040761003a38b9fad72c66d6030679c2bda3eb7c5000fe9b50345307d9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'account/index.html': {size: 48263, hash: '913cf01ef9093ef87e2ef084faf2594c4354d5a4a073ff65a66161ede247784f', text: () => import('./assets-chunks/account_index_html.mjs').then(m => m.default)},
    'styles-CXQUZ3PB.css': {size: 6979, hash: 'mYIPdabeAag', text: () => import('./assets-chunks/styles-CXQUZ3PB_css.mjs').then(m => m.default)}
  },
};
