
import { http } from '../../apis/index';

const getUnreadNews = async() => {
    let _data= await http('post', '/api/services/app/infoMessage/GetPage', {
        pageIndex: 1,
        pageSize: 5,
        isRead: false
    });
    return new Promise((resolve, reject) => {
        if(_data.status === 200) {
            _data.data.items.forEach(v => {
                switch(v.messageType){
                    case 1:
                        v.messageTypeName="待办工作";
                    break;
                    case 2:
                        v.messageTypeName="审核通知";
                    break;
                    case 3:
                        v.messageTypeName="消息提醒";
                    break;
                    case 4:
                        v.messageTypeName="消息提醒";
                    break;
                    case 5:
                        v.messageTypeName="审核通知";
                    break;
                }
            })
            resolve(_data.data);
        }
    });
};

export default {
    state: {
        news: null, // 消息列表
        unReadNews: [],
    },

    mutations: {
        
        async UpdateNews(state, news) {
            state.news = news; 
            const MESS = await getUnreadNews();
            state.unReadNews = MESS;      
        },
        // 实时获取未读消息
        async UpdateUnreadMessage(state) {
            const MESS = await getUnreadNews();
            state.unReadNews = MESS;  
        },
    }
}