export default class DateChoice {

    /** 
    @agruments config {
        s: '-', // 格式化时间分隔符 默认为'-'
    }
    **/
    constructor(config = {}) {
        this.s = config.s || (config.s === '' ? '' : '-');

        this.now = new Date(); // 当前日期
        this.nowDayOfWeek = this.now.getDay() - 1; // 今天本周的第几天
        this.nowDay = this.now.getDate(); // 当前日
        this.nowMonth = this.now.getMonth() + 1; // 当前月
        this.nowYear = this.now.getYear(); // 当前年
        this.nowYear += (this.nowYear < 2000) ? 1900 : 0; //

        this.lastMonthDate = new Date(); //上月日期
        this.lastMonthDate.setDate(1);
        this.lastMonthDate.setMonth(this.lastMonthDate.getMonth() - 1);
        this.lastYear = this.lastMonthDate.getYear();
        this.lastMonth = this.lastMonthDate.getMonth();
    }

    // 格式化日期：yyyy-MM-dd    @argument date 不传则获取今天日期
    formatDate(date){
        if(typeof date === 'string' && date.includes('T')) {
            date = date.replace('T', ' '); 
            if(isNaN(Date.parse(date))) { //注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
                date = date.replace(/\-/g, '/');
            }
        };
        const D = date ? new Date(date) : new Date();
    
        let myyear = D.getFullYear();
        let mymonth = D.getMonth() + 1;
        let myweekday = D.getDate();
        if (mymonth < 10) {
            mymonth = '0' + mymonth;
        }
        if (myweekday < 10) {
            myweekday = '0' + myweekday;
        }
        return (myyear + this.s + mymonth + this.s + myweekday);
    }

     // 格式化日期：yyyy-MM-dd h:m:s    @argument date 不传则获取今天日期
    formatDates(date){
        if(typeof date === 'string' && date.includes('T')) {
            date = date.replace('T', ' '); 
            if(isNaN(Date.parse(date))) { //注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
                date = date.replace(/\-/g, '/');
            }
        };
        const D = date ? new Date(date) : new Date();
    
        let myyear = D.getFullYear();
        let mymonth = D.getMonth() + 1;
        let myweekday = D.getDate();
        let _h = D.getHours();
        let _ms = D.getMinutes();
        let _s = D.getSeconds();
        if (mymonth < 10) {
            mymonth = '0' + mymonth;
        }
        if (myweekday < 10) {
            myweekday = '0' + myweekday;
        }
        if (_h < 10) {
            _h = '0' + _h;
        }
        if (_ms < 10) {
            _ms = '0' + _ms;
        }
        if (_s < 10) {
            _s = '0' + _s;
        }
        return (myyear + this.s + mymonth + this.s + myweekday +' ' + _h + ':' + _ms + ':' + _s);
    }


    // 获得某月的天数
    getMonthDays(myMonth) {
        const monthStartDate = new Date(this.nowYear, myMonth - 1, 1);
        const monthEndDate = new Date(this.nowYear, myMonth, 1);
        const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }

    // 获得本季度的开始月份
    getQuarterStartMonth() {
        let quarterStartMonth = 1;
        if (this.nowMonth < 4) {
            quarterStartMonth = 1;
        }
        if (3 < this.nowMonth && this.nowMonth < 7) {
            quarterStartMonth = 4;
        }
        if (6 < this.nowMonth && this.nowMonth < 10) {
            quarterStartMonth = 7;
        }
        if (this.nowMonth > 9) {
            quarterStartMonth = 10;
        }
        return quarterStartMonth;
    }

    // 获得今天之前的日期
    getTodayBeforeDate(num) {
        const beforeDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay - num);
        return this.formatDate(beforeDate);
    }

    // 获得今天之后的日期
    getTodayAfterDate(num) {
        const afterDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay + num);
        return this.formatDate(afterDate);
    }

    // 获得本周的开始日期
    getWeekStartDate() {
        const weekStartDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay - this.nowDayOfWeek);
        return this.formatDate(weekStartDate);
    }

    // 获得本周的结束日期
    getWeekEndDate() {
        const weekEndDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay + (6 - this.nowDayOfWeek));
        return this.formatDate(weekEndDate);
    }

    // 获得上周的开始日期
    getLastWeekStartDate() {
        const weekStartDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay - this.nowDayOfWeek - 7);
        return this.formatDate(weekStartDate);
    }

    // 获得上周的结束日期
    getLastWeekEndDate() {
        const weekEndDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay - this.nowDayOfWeek - 1);
        return this.formatDate(weekEndDate);
    }

    // 获得本月的开始日期
    getMonthStartDate() {
        const monthStartDate = new Date(this.nowYear, this.nowMonth - 1, 1);
        return this.formatDate(monthStartDate);
    }

    // 获得本月的结束日期
    getMonthEndDate() {
        const monthEndDate = new Date(this.nowYear, this.nowMonth - 1, this.getMonthDays(this.nowMonth));
        return this.formatDate(monthEndDate);
    }

    // 获得本季度的开始日期
    getQuarterStartDate() {
        const quarterStartDate = new Date(this.nowYear, this.getQuarterStartMonth() - 1, 1);
        return this.formatDate(quarterStartDate);
    }

    // 获得本季度的结束日期
    getQuarterEndDate() {
        const quarterEndMonth = this.getQuarterStartMonth() + 2;
        const quarterStartDate = new Date(this.nowYear, quarterEndMonth - 1, this.getMonthDays(quarterEndMonth));
        return this.formatDate(quarterStartDate);
    }

}