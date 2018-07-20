
const baseUrlHash = {
    production: 'https://www.lw1314.cn:3000',
    // production: 'http://www.lw1314.cn:3000',
    development: 'http://localhost:3000',//http://www.lw1314.cn
    'productionUat': ''
};
const BASE_URL = baseUrlHash[process.env.NODE_ENV]; // 根据构建名称创建不同地址
//const BASE_URL = 'http://192.168.0.199';




export { ROUTER_NAME, BASE_URL };