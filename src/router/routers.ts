import { RouteRecordRaw, _RouteRecordBase, RouteMeta } from 'vue-router'

declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean | string | number
    meta?: RouteMeta
  }
}

// 常量路由
export const constantRouter: Array<RouteRecordRaw> = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      icon: '',
      title: '',
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/login',
    meta: {
      icon: '',
      title: '',
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      icon: '',
      title: '',
      hidden: true,
    },
  },
]

// 异步路由
export const asyncRouter: Array<RouteRecordRaw> = [
  // 超级管理员
  {
    path: '/schoolAdmin1',
    component: () => import('@/layout/index.vue'),
    name: 'schoolAdmin',
    redirect: '/schoolAdmin1/schoolAdmin',
    meta: {
      icon: '',
      title: '',
      hidden: false,
    },
    children: [
      {
        path: '/schoolAdmin1/schoolAdmin',
        component: () => import('@/views/schoolAdmin/index.vue'),
        name: 'schoolAdmin',
        meta: {
          icon: 'User',
          title: '校级管理员',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/schoolInformation1',
    component: () => import('@/layout/index.vue'),
    name: 'schoolInformation',
    redirect: '/schoolInformation1/schoolInformation',
    meta: {
      icon: '',
      title: '',
      hidden: false,
    },
    children: [
      {
        path: '/schoolInformation1/schoolInformation',
        component: () => import('@/views/schoolInformation/index.vue'),
        name: 'schoolInformation',
        meta: {
          icon: 'School',
          title: '录入学校信息',
          hidden: false,
        },
      },
    ],
  },
  // 校级管理员
  {
    path: '/buildingAdmin1',
    component: () => import('@/layout/index.vue'),
    name: 'buildingAdmin',
    redirect: '/buildingAdmin1/buildingAdmin',
    meta: {
      icon: '',
      title: '',
      hidden: false,
    },
    children: [
      {
        path: '/buildingAdmin1/buildingAdmin',
        component: () => import('@/views/buildingAdmin/index.vue'),
        name: 'buildingAdmin',
        meta: {
          icon: 'User',
          title: '楼栋管理员',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/buildingInformation1',
    component: () => import('@/layout/index.vue'),
    name: 'buildingInformation',
    redirect: '/buildingInformation1/buildingInformation',
    meta: {
      icon: '',
      title: '',
      hidden: false,
    },
    children: [
      {
        path: '/buildingInformation1/buildingInformation',
        component: () => import('@/views/buildingInformation/index.vue'),
        name: 'buildingInformation',
        meta: {
          icon: 'School',
          title: '录入楼栋信息',
          hidden: false,
        },
      },
    ],
  },
  // 教室管理员
  {
    path: '/classInformation1',
    component: () => import('@/layout/index.vue'),
    name: 'classInformation',
    redirect: '/classInformation1/classInformation',
    meta: {
      icon: '',
      title: '',
      hidden: false,
    },
    children: [
      {
        path: '/classInformation1/classInformation',
        component: () => import('@/views/classInformation/index.vue'),
        name: 'classInformation',
        meta: {
          icon: 'User',
          title: '教室管理',
          hidden: false,
        },
      },
    ],
  },
]

// 任意路由
export const anyRouter: Array<RouteRecordRaw> = [
  // 任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      icon: '',
      title: '',
      hidden: true,
    },
  },
]

// 开发用
// export const constantRouter:Array<RouteRecordRaw> = [
//     {
//         path: '/login',
//         component: ()=> import('@/views/login/index.vue'),
//         name: 'login',
//         meta: {
//             hidden: true
//         }
//     },
//     {
//         path: '/',
//         component: () => import('@/layout/index.vue'),
//         name: 'schoolAdmin',
//         redirect: '/schoolAdmin',
//         children: [
//             {
//                 path: '/schoolAdmin',
//                 component: () => import('@/views/schoolAdmin/index.vue'),
//                 name: 'schoolAdmin',
//                 meta: {
//                     icon: 'User',
//                     title: '校级管理员',
//                     hidden: false
//                 }
//             }
//         ]
//     },
//     {
//         path: '/',
//         component: () => import('@/layout/index.vue'),
//         name: 'schoolInformation',
//         redirect: '/schoolInformation',
//         children: [
//             {
//                 path: '/schoolInformation',
//                 component: () => import('@/views/schoolInformation/index.vue'),
//                 name: 'schoolInformation',
//                 meta: {
//                     icon: 'School',
//                     title: '录入学校信息',
//                     hidden: false
//                 }
//             }
//         ]
//     },
//     // 校级管理员
//     {
//         path: '/',
//         component: () => import('@/layout/index.vue'),
//         name: 'buildingAdmin',
//         redirect: '/buildingAdmin',
//         children: [
//             {
//                 path: '/buildingAdmin',
//                 component: () => import('@/views/buildingAdmin/index.vue'),
//                 name: 'buildingAdmin',
//                 meta: {
//                     icon: 'User',
//                     title: '楼栋管理员',
//                     hidden: false
//                 }
//             }
//         ]
//     },
//     {
//         path: '/',
//         component: () => import('@/layout/index.vue'),
//         name: 'buildingInformation',
//         redirect: '/buildingInformation',
//         children: [
//             {
//                 path: '/buildingInformation',
//                 component: () => import('@/views/buildingInformation/index.vue'),
//                 name: 'buildingInformation',
//                 meta: {
//                     icon: 'School',
//                     title: '录入楼栋信息',
//                     hidden: false
//                 }
//             }
//         ]
//     },
//     // 教室管理员
//     {
//         path: '/',
//         component: () => import('@/layout/index.vue'),
//         name: 'classInformation',
//         redirect: '/classInformation',
//         children: [
//             {
//                 path: '/classInformation',
//                 component: () => import('@/views/classInformation/index.vue'),
//                 name: 'classInformation',
//                 meta: {
//                     icon: 'User',
//                     title: '教室管理',
//                     hidden: false
//                 }
//             }
//         ]
//     },
//     {
//         path: '/:pathMatch(.*)*',
//         redirect: '/404',
//         name: 'any',
//         meta: {
//             hidden: true
//         }
//     },
//     {
//         path: '/404',
//         component: () => import('@/views/404/index.vue'),
//         name: '404',
//         meta: {
//             hidden: true
//         }
//     },
// ]
