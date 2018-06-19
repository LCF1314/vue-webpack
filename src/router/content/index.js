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
        name: '编辑内容',
        component: detail,
    },
    {
        path: `list/create`,
        name: '新增内容',
        component: detail,
    },
]