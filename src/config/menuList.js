export default {
    menuList: [
        {
            name:"首页",
            iconfont: "&#xe634;",
            link:'/appContent/index'
        },
        {
            name:"技术栈",
            iconfont: "&#xe635;",
            link:'/appContent/InfoList'
        },
        {
            name:"用户列表",
            iconfont: "&#xe64e;",
            link:'/appContent/userInfo'
        },
        {
            name:"内容",
            iconfont: "&#xe60f;",
            child: [
                {
                    iconfont: "&#xe6ad;",
                    name: "内容列表",
                    link: '/appContent/content/list'
                },
            ]
        },
        {
            name:"我的相册",
            iconfont: "&#xe61e;",
            link:'/appContent/photo'
        },
        /*{
            name:"留言板",
            iconfont: "&#xe649;",
            link:'/appContent/loading4'
        },
        {
            name:"爱好",
            iconfont: "&#xe650;",
            link:'/appContent/loading5'
        },
        {
            name:"关于",
            iconfont: "&#xe642;",
            link:'/appContent/loading6'
        },*/
    ]
}