import Vue from 'vue';
import Router from 'vue-router';

const ADDRESS = '/';

/*
 * 注册页面
 */
// const index = resolve => require(['../pages/index'], resolve);
const appContent = resolve => require(['../pages/appContent'], resolve);
const Index = resolve => require(['../pages/index'], resolve);
const Login = resolve => require(['../pages/login'], resolve);
const loading = resolve => require(['../pages/loading'], resolve);
const UserInfo = resolve => require(['../pages/users/userInfo'], resolve);
const InfoList = resolve => require(['../pages/categorys/infoList'], resolve);
const mainContent = resolve => require(['../pages/mainContent'], resolve);
// 期初
import content from './content';
log(mainContent)
log(content)
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
            component: Index,
        },
        {
            path: `UserInfo`,
            name: '用户列表',
            component: UserInfo,
        },
        {
            path: `infoList`,
            name: '技术栈',
            component: InfoList,
        },
        {
            path: `content`,
            component: mainContent,
            children: content
        },
        {
            path: `loading2`,
            name: '编辑内容',
            component: UserInfo,
        },
        {
            path: `loading3`,
            name: '刷新3',
            component: UserInfo,
        },
        {
            path: `loading4`,
            name: '刷新4',
            component: UserInfo,
        },
        {
            path: `loading5`,
            name: '刷新5',
            component: UserInfo,
        },
        {
            path: `loading6`,
            name: '刷新6',
            component: UserInfo,
        },
      ]
    },
  ]
})
