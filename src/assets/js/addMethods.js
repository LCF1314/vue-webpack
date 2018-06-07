// 重写forEach方法
(function() {
    // 定义throw 异常为StopIteration
    if(typeof StopIteration === 'undefined') {
        StopIteration = new Error('异常为StopIteration');
    }

    // 原始版本
    var oldForEach = Array.prototype.forEach;

    // forEach存在 可以执行throw StopIteration, 会终止循环
    if(oldForEach) {
        Array.prototype.forEach = function() {
            try {
                oldForEach.apply(this, [].slice.call(arguments, 0));
            }
            catch(e) {
                if(e != StopIteration) {
                    throw e;
                }
            }
        }
    }
})();

