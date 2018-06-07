import Vue from 'vue';
import Router from 'vue-router';

const ADDRESS = '/';

/*
 * 注册页面
 */
// const index = resolve => require(['../pages/index'], resolve);
const appContent = resolve => require(['../pages/appContent'], resolve);
const index = resolve => require(['../pages/index'], resolve);
const Login = resolve => require(['../pages/login'], resolve);
const loading = resolve => require(['../pages/loading'], resolve);
const userInfo = resolve => require(['../pages/users/userInfo'], resolve);
// const mainContent = resolve => require(['../pages/mainContent.vue'], resolve);

Vue.use(Router);
/*{
  path: ADDRESS,
  redirect: `${ADDRESS}AppContent/index`
},*/
export default new Router({
  routes: [
    {
      path: ADDRESS,
      redirect: `${ADDRESS}login`
    },
    {
      path: `${ADDRESS}login`,
      name: 'login',
      component: Login
    },
    {
      path: `${ADDRESS}appContent`,
      component: appContent,
      children: [
        {
            path: `index`,
            name: '首页',
            component: index,
        },
        {
            path: `userInfo`,
            name: '用户列表',
            component: userInfo,
        },
        {
            path: `loading`,
            name: '刷新',
            component: userInfo,
        },
        {
            path: `loading1`,
            name: '刷新1',
            component: userInfo,
        },
        {
            path: `loading2`,
            name: '刷新2',
            component: userInfo,
        },
        {
            path: `loading3`,
            name: '刷新3',
            component: userInfo,
        },
        {
            path: `loading4`,
            name: '刷新4',
            component: userInfo,
        },
        {
            path: `loading5`,
            name: '刷新5',
            component: userInfo,
        },
        {
            path: `loading6`,
            name: '刷新6',
            component: userInfo,
        },
      ]
    },
  ]
})
