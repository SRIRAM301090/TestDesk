
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: 'execute', component: () => import('pages/Execute.vue') },
      { path: 'keywords', component: () => import('pages/Keywords.vue') },
      { path: 'reports', component: () => import('pages/Reports.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
