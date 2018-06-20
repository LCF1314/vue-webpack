const list = resolve => require(['../../pages/contents/list'], resolve);
const detail = resolve => require(['../../pages/contents/detail'], resolve);
export default [
    {
        path: `list`,
        name: '内容列表',
        component: list,
    },
    {
        path: `list/:id`,
        name: '内容详情',
        component: detail,
    },
    {
        path: `list/create`,
        name: '内容详情',
        component: detail,
    },
]