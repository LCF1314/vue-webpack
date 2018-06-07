export default class Storage {
    constructor(storageName) {
        this.storageName = storageName;
        
        if(!sessionStorage.getItem(storageName)) {
            this._save('{}')
        }
    }

    // 保存
    _save(string) {
        sessionStorage.setItem(this.storageName, string);
    }

    // 转化为json对象
    tojson() {
        return JSON.parse(sessionStorage.getItem(this.storageName));
    }

    // 获取某个属性的值
    getItem(name) {
        return this.tojson()[name];
    }

    // 新增
    setItem(key, val) {
        let _obj = this.tojson();
        _obj[key] = val;

        let _string = JSON.stringify(_obj);
        this._save(_string);
    }

    // 移除
    removeItem(key, index) {
        let _obj = this.tojson();

        if(Array.isArray(_obj[key])) {
            index != undefined ? _obj.splice(index, 1) : delete _obj[key];
        }else {
            delete _obj[key]
        }

        let _string = JSON.stringify(_obj);
        this._save(_string);
    }
}