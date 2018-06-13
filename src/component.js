import Vue from 'vue'

/* 
 * 弹窗组件
 */
// 批量添加
// import BatchAdd from './common/dialog/BatchAdd.vue';

// 批量添加客户 供应商
// import BatchAddCompany from './common/dialog/batchAddCompany/BatchAddCompany.vue';

// 单据详情搜索
// import BillGoodsSearch from './common/dialog/BillGoodsSearch.vue';


/* 
 * 单据头部自定义字段组件
 */
// import ExtColumn from './common/ExtColumn.vue'


/* 
 * 货品扫描枪添加组件
 */
// import ScanGoods from './common/ScanGoods.vue'


/* 
 * 上传组件
 */
// import Upload from './common/Upload.vue'


/* 
 * 单据列表组件
 */
// 列表头部
// import OrderListHeader from './common/order/OrderListHeader';


/* 
 * 单据详情中货品所需组件
 */
// 数量的input 里面有序列号选择
// import NumberInput from './common/order/NumberInput.vue'
// import CustomInput from './common/order/CustomInput.vue'
/* 
 * 下拉组件
 */
// 货品选择
// import SelectGoods from './common/select/SelectGoods.vue';

// 账户选择
// import SelectAccount from './common/select/SelectAccount.vue';

// 业务员选择
// import SelectClientUser from './common/select/SelectClientUser.vue';

// 客户、供应商选择
// import SelectCompany from './common/select/SelectCompany.vue';

// 客户、供应商 联系人选择
// import SelectContacts from './common/select/SelectContacts.vue'

// 币别选择
// import SelectInfoCurrency from './common/select/SelectInfoCurrency.vue';

// 单位选择
// import SelectUnit from './common/select/SelectUnit.vue';

// 仓库选择
// import SelectWH from './common/select/SelectWH.vue';

// 计税方式选择
// import SelectTaxRateType from './common/select/SelectTaxRateType.vue';

// 批次储位选择
// import SelectBatchStorage from './common/select/SelectBatchStorage.vue'

// 储位选择
// import SelectStorageName from './common/select/SelectStorageName.vue'

// checkbox组件
// import checkboxComp from './common/checkBox'

// 部门下拉组件
// import SelectDept from './common/select/SelectDept'

// 角色下拉组件
// import SelectRole from './common/select/SelectRole'

// bom下拉组件
// import SelectBom from './common/select/SelectBom'


const components = [
   /* 
    {
        name: 'batch-add',
        component: BatchAdd
    },
    {
        name: 'batchAddCompany-dialog',
        component: BatchAddCompany
    },
    {
        name: 'billGoodsSearch-dialog',
        component: BillGoodsSearch
    },
    {
        name: 'ext-column',
        component: ExtColumn
    },
    {
        name: 'scan-goods',
        component: ScanGoods
    },
    {
        name: 'upload',
        component: Upload
    },
    {
        name: 'select-goods',
        component: SelectGoods
    },
    {
        name: 'select-bom',
        component: SelectBom
    },
    {
        name: 'select-account',
        component: SelectAccount
    },
    {
        name: 'select-clientUser',
        component: SelectClientUser
    },
    {
        name: 'select-company',
        component: SelectCompany
    },
    {
        name: 'select-contacts',
        component: SelectContacts
    },
    {
        name: 'select-unit',
        component: SelectUnit
    },
    {
        name: 'select-wh',
        component: SelectWH
    },
    {
        name: 'select-dept',
        component: SelectDept
    },
    {
        name: 'select-role',
        component: SelectRole
    },
    {
        name: 'select-taxRateType',
        component: SelectTaxRateType
    },
    {
        name: 'select-infoCurrency',
        component: SelectInfoCurrency
    },
    {
        name: 'select-batchStorage',
        component: SelectBatchStorage
    },
    {
        name: 'select-storageName',
        component: SelectStorageName
    },
    {
        name: 'lcf-checkbox',
        component: checkboxComp
    },
    {
        name: 'number-input',
        component: NumberInput
    },
    {
        name: 'custom-input',
        component: CustomInput
    },
    {
        name: 'orderList-header',
        component: OrderListHeader
    }*/
]

components.forEach(i => {
    Vue.component(i.name, i.component);
})

