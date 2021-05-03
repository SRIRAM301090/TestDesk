
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/PageHome.vue') },
      { path: '/execute', component: () => import('src/pages/PageExecute.vue') },
      { path: '/reports', component: () => import('src/pages/PageReports.vue') },
      { path: '/settings', component: () => import('src/pages/PageSettings.vue') },
      { path: '/auth', component: () => import('src/pages/PageAuth.vue') },
      { path: '/404', component: () => import('pages/Error404.vue') },
      { path: '/keywords', component: () => import('src/pages/PageKeywordList.vue')},
      { path: '/keywords/:id', component: () => import('src/pages/PageKeywords.vue'), props: true},
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
