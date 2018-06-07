export default {
    state: {
        isAppMenuOpen: true,
        deleteRouter: null,
        tabRouters: null,
    },
    mutations: {
        UpdateIsAppMenuOpen(state, isopen) {
            state.isAppMenuOpen = isopen;
        },

        // 更新需要删除的路由
        UpdateDeleteRouter(state, router) {
            state.deleteRouter = router;
        },

        // 清除
        ClearDeleteRouter(state) {
            state.deleteRouter = null;
        },

        // 当前导航路由
        UpdateTabRouters(state, router) {
            state.tabRouters = router;
        },
    }
}