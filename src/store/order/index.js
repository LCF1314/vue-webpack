export default {
    state: {
        orderData: null,
        isReadyonly: false,
        isReadyonlyPrice : false,
        goodsAmount: 0, // 总计金额
        produceData: null, // 生产组装
        produceAllData: [],
        produceOneData: [],
        produceAssembleBom: [], // 组装原料
        produceAssembleDetail: [], // 组装成品
        produceDisAssembleBom: [], // 拆卸原料
        produceDisAssembleDetail: [], // 拆卸成品
        produceProcessBom: [],
        produceProcessDetail: []
    },
    mutations: {
        // 更改订单数据
        UpdateOrderData(state, obj) {
            // 遍历单据货品明细
            if(obj.goodsDetails) {
                
                obj.goodsDetails.forEach(i => {

                    // 将自定义字段拿出来 判断存在时执行循环
                    i.extColumn && i.extColumn.forEach(j => {
                        i[`custom${j.extColumnId}`] = j.extColumnValue;
                    })                    
                })
            }
            
            state.orderData = obj;

            // 判断订单状态为草稿、驳回状态时 只读为false;
            state.isReadyonly = (obj.statusId === '' || obj.statusId === 1 || obj.statusId === 4) ? false : true;
            //window.sessionStorage.setItem('orderData', JSON.stringify(obj));
        },

        // 清除订单数据
        ClearOrderData(state) {
            state.orderData = null;
            //window.sessionStorage.removeItem('orderData');
        },

        // 更改订单是否属于只读状态
        UpdateIsReadyonly(state, boolean) {
            state.isReadyonly = !boolean;
        },

        UpdateIsReadyonlyPrice(state, boolean){
            state.isReadyonlyPrice = !boolean;
        },

        /*// 更改生产组装单数据 
        UpdateProduceData(state, obj) {
            // 遍历单据货品明细
            obj.produceAssembleDetail.forEach(i => {

                // 将自定义字段拿出来 判断存在时执行循环
                i.extColumn && i.extColumn.forEach(j => {
                    i[`custom${j.extColumnId}`] = j.extColumnValue;
                })

            }) 
            state.produceData = obj;
            // 判断订单状态为草稿、驳回状态时 只读为false;
            state.isReadyonly = (obj.statusId === '' || obj.statusId === 1 || obj.statusId === 4) ? false : true;
            //window.sessionStorage.setItem('orderData', JSON.stringify(obj));
        },*/

        /*UpdateProduceAllData(state, obj) {
            state.produceOneData = [obj[0]];
            state.produceAllData = obj;
        },*/
        // 组装原料
        UpdateProduceAssembleBom(state, obj) {
            state.produceAssembleBom = obj;
        },
        // 组装成品
        UpdateProduceAssembleDetail(state, obj) {
            state.produceAssembleDetail = obj;
        },

        // 拆卸原料
        UpdateProduceDisAssembleBom(state, obj) {
            state.produceDisAssembleBom = obj;
        },
        // 拆卸成品
        UpdateProduceDisAssembleDetail(state, obj) {
            state.produceDisAssembleDetail = obj;
        },

        // 拆卸原料
        UpdateProduceProcessBom(state, obj) {
            state.produceProcessBom = obj;
        },
        // 拆卸成品
        UpdateProduceProcessDetail(state, obj) {
            state.produceProcessDetail = obj;
        },

         

         

    }
}