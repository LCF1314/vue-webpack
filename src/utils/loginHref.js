
    import router from '../router'

    const HREF = location.href;
    const loginHref = (next, param) => {
        if(HREF.indexOf("quanerp.com") > -1 && process.env.NODE_ENV == 'productionUat') {
            location.href = "/quanerp-pc/src/login.html";
        } else if(HREF.indexOf("zhcerp.com") > -1 && process.env.NODE_ENV == 'productionUat') {
            location.href = location.protocol + "//www.zhcerp.com";
        } else {
            next ? next({path: '/login'}) : router.push('/login')
        }
    }

    export default loginHref;