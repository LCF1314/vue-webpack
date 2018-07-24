<template>
    <div styLe="width: 100%; height: 100%;" class="appContent" >
        <div href="1">
            1111
            <div href="1">222</div>
        </div>
        <div>
            <input type="text" v-model="tableThisRow.amount">
            66666
        </div>
    </div>  
</template>
<script>
    let Mock = require('mockjs');
    export default {
        components: {

        },
        data() {
            return { 
                txt: '的第三方第三方是的范德萨范德萨',
                tableThisRow : {
                    price: 5,
                    number: 6,
                    amount: 10,
                    unitCodeNumber: 2,
                    selfAmount: 0,
                } 
            }
        },
        methods: {
            createdFn(ms) {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, ms, 'done');
                })
            },
            regStr(str, obj){
                let regs =  /[\s]/g;
                let arr = str.substring(1,str.length).split(regs);
                arr = arr.filter((item) => {
                    return item
                })
                let strs = '';
                if(arr.length){
                    arr.forEach((item, index) => {
                        if(index == 0 && item == "("){
                            strs = item;
                        }else{
                            if(obj[item]){
                                strs += obj[item] + '';
                            }else{
                                strs += item;
                            }
                        }
                    })
                }
                /*log(strs)
                let amount = eval(strs);
                log(amount)*/
                return eval(strs);
            },
            quchong(arr){
                let hash = [];
                let newArr = [];
                arr.forEach(item => {
                    if(!hash[item] && item){
                        hash[item] = item;
                        newArr.push(item)
                    }
                })
                return newArr;
            }
            
        },
        computed: {
           
        },
        beforeCreate(){
            
        },
        created() {
            let template = {
                'title': 'Syntax Demo',

                'string1|1-10': '★',
                'string2|3': 'value',

                'number1|+1': 100,
                'number2|1-100': 100,
                'number3|1-100.1-10': 1,
                'number4|123.1-10': 1,
                'number5|123.3': 1,
                'number6|123.10': 1.123,

                'boolean1|1': true,
                'boolean2|1-2': true,

                'object1|2-4': {
                    '110000': '北京市',
                    '120000': '天津市',
                    '130000': '河北省',
                    '140000': '山西省'
                },
                'object2|2': {
                    '310000': '上海市',
                    '320000': '江苏省',
                    '330000': '浙江省',
                    '340000': '安徽省'
                },

                'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],
                'array2|1-10': ['Mock.js'],
                'array3|3': ['Mock.js'],

                'function': function() {
                    return this.title
                }
            }
            let data = Mock.mock(template)
            log(data)
            // 计算数值型字段
            // let regs =  /[()+\-*/]/g;
            // let str = " ( price * number ) + amount / unitCodeNumber + amount * ( price + number )";
            // let str1 = JSON.parse(JSON.stringify(str));
            // str1 = str.replace(/[\s]/g, '');
            // // let arrs = str1.substring(1,str.length).split(regs);
            // arrs = Array.from(new Set(arrs)); // 数组去重
            // // log(this.quchong(arrs))
            // this.regStr(str, obj)
            // arrs.filter(item => !!item).forEach(item => {
            //     this.$watch(`tableThisRow.${item}`, (newVal, oldVal) => {
            //         if(newVal && newVal > 0 && newVal !== oldVal)
            //         this.tableThisRow.selfAmount = this.regStr(str, this.tableThisRow);
            //         log(this.tableThisRow)
            //     })
            // })
           
        },
        
        
    }
</script>

<style lang="scss" scoped>
    .loginContent{
        position: relative;
        width: 100%;
        height: 100%;
        .nowRegister{
            color: $-color-theme-login;
            position: absolute;
            right: 20px;
            cursor: pointer;
        }
        h1{
            color: #fff;
            text-align: center;
            position: absolute;
            width: 100%;
            top: -60px;
            left: 0;
            font-weight: 600;
            font-size: 30px;
        }
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 500px;
        height: 340px;
        box-shadow: 0px 0px 10px #030303;
        margin:  auto;
        background-color: #fff;
        border-radius: 10px;
        h3{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background: $-color-theme-login;
            color: #fff;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 22px;
        }
        .register{
             .login_box{
                margin-top: 40px;
                p{
                    padding-left: 100px;
                    text-align: left;
                }
                .password{
                    margin-bottom: 20px;
                }
             }
            
        }
        .login_box{
            margin-top: 60px;
            padding: 0 30px;
            font-size: 14px;
            .password{
                margin-bottom: 40px;
            }
            p{
                padding-left: 100px;
                text-align: left;
            }
            span{
                display: inline-block;
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: right;
                color: $-color-theme-login;
            }
            div{
                height: 40px;
                margin-bottom: 20px;
                width: 100%;
                input{
                    width: 300px;
                    height: 38px;
                    line-height: 38px;
                    border: 1px solid $-color-theme-login;
                    padding: 0 10px;
                    border-radius: 4px; 
                }
                text-align: center;
            }
            button{
                padding: 10px 60px;
                cursor: pointer;
                margin: 0 auto;
                display: block;
                border-radius: 4px; 
                background-color: $-color-theme-login;
                color: #fff;
                font-size: 16px;
            }
           
        }
    }
</style>


