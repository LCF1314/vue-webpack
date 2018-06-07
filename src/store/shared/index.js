import { http } from '../../apis/index';

const getWhInfo = async() => {
    let _data = await http('post', '/api/services/app/whInfo/GetChildren', {});
    return new Promise((resolve, reject) => {
        if(_data.status === 200) {
            resolve(_data.data);
        }
    });
};

export default {
    state: {
        whInfo: [], // 所有仓库的数据
        isWhInfo: false, // 是否执行异步获取数据
    },

    mutations: {
        // 更改仓库数据 @argument isWhInfo: 是否执行异步获取
        async UpdateWhInfo(state, isWhInfo = false) {
            if(isWhInfo) {
                const WH_INFO = await getWhInfo();
                state.whInfo = WH_INFO;
                return;
            };

            if(state.isWhInfo) return;
            state.isWhInfo = true;
            
            const WH_INFO = await getWhInfo();
            state.whInfo = WH_INFO;            
        },
        clearWh(state) {
            state.whInfo = [];
            state.isWhInfo = false;
        }
        /* // 更改仓库数据
        async UpdateWhInfo(state) {
            if(state.isWhInfo) return;
            state.isWhInfo = true;
            
            let _data = await http('post', '/api/services/app/whInfo/GetChildren', {});
            if(_data.status === 200) {
                state.whInfo = _data.data;
            }            
        } */
    }
}