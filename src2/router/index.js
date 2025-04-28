import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/malgo-frontend/',
    name: 'formulario',
    component: () => import('../views/application_form.vue'),
    meta: {
      icon: 'fa-regular fa-rectangle-list ',
      label: 'Formulario',
      roles: ['admin']
    }
  },
  {
    path: '/malgo-frontend/aplicaciones',
    name: 'aplicaciones',
    component: () => import('../views/applications.vue'),
    meta: {
      icon: 'fa-regular fa-folder-open',
      label: 'Aplicaciones',
      roles: ['admin']
    }
  },
  {
    path: '/malgo-frontend/facturas',
    name: 'facturas',
    component: () => import('../views/bills.vue'),
    meta: {
      icon: 'fa-solid fa-file-invoice-dollar',
      label: 'Facturas',
      roles: ['admin']
    }
  },
  {
    path: '/malgo-frontend/contratos',
    name: 'contratos',
    component: () => import('../views/contracts.vue'),
    meta: {
      icon: 'fa-solid fa-file-signature',
      label: 'Contratos',
      roles: ['admin']
    }
  }, {
    path: '/malgo-frontend/pagos',
    name: 'pagos',
    component: () => import('../views/payments.vue'),
    meta: {
      icon: 'fa-solid fa-money-bill-wave',
      label: 'Pagos',
      roles: ['admin', 'user']
    }
  },
  {
    path: '/malgo-frontend/servicios',
    name: 'servicios',
    component: () => import('../views/servicios.vue'),
    meta: {
      icon: 'fa-solid fa-hand-holding-droplet',
      label: 'Servicios',
      roles: ['admin']
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


