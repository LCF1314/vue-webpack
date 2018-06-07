<template>
    <section id="app-content">
        <div class="fl main-l">
            <div class="userMain">
                <div class="userLogo">LCF</div>
                <div class="userName">
                    <span> 用户名：</span>{{userName}}
                </div>
                <div class="loginDate">
                    <span>上次登录：</span>{{lastLoginTime}}
                </div>
            </div>
        </div>
    </section>
    
</template>
<script>
    // 引入 ECharts 主模块
    // import echarts from 'echarts/lib/echarts';
    //   import'echarts/lib/chart/tree'
    //引入柱状图
    // import'echarts/lib/chart/line'
    // import'echarts/lib/chart/pie'
    /*import'echarts/lib/chart/bar'
    import'echarts/lib/chart/radar'
    import'echarts/lib/chart/line'
    import'echarts/lib/chart/pie'
    import'echarts/lib/chart/scatter'
    import'echarts/lib/chart/radar'

    import'echarts/lib/chart/map'
    import'echarts/lib/chart/treemap'
    import'echarts/lib/chart/graph'
    import'echarts/lib/chart/gauge'
    import'echarts/lib/chart/funnel'
    import'echarts/lib/chart/parallel'
    import'echarts/lib/chart/sankey'
    import'echarts/lib/chart/boxplot'
    import'echarts/lib/chart/candlestick'
    import'echarts/lib/chart/effectScatter'
    import'echarts/lib/chart/lines'
    import'echarts/lib/chart/heatmap'
    import'echarts/lib/chart/pictorialBar'
    import'echarts/lib/chart/themeRiver'*/
    // 引入提示框和标题组件
    // import'echarts/lib/component/tooltip';
    // import'echarts/lib/component/title';
    // import'echarts/lib/component/grid';
    // import'echarts/lib/component/legend';   
    // import'echarts/lib/component/toolbox';
    export default {
        components: {
        },
        methods: {
            /*testEcharts(){
                let myChart = echarts.init(document.getElementById('main'));
                myChart.showLoading();

                let data1 = {
                    "name": "前端学习路线图",
                    "children": [
                        {
                            "name": "切图",
                            "children": [
                                {
                                    "name": "PHOTOSHOP",
                                    "value": ''
                                },
                                {
                                    "name": "HTML",
                                    // "children": [
                                    //     {"name": "Converters", "value": 721},
                                    //     {"name": "DelimitedTextConverter", "value": 4294}
                                    // ]
                                },
                                {
                                    "name": "CSS",
                                    "value": ''
                                },
                            ]
                        },
                        {
                            "name": "开发语言",
                            "children": [
                                {"name": "JAVASCRIPT", "value": ''},
                                {"name": "NODE", "value": ''}
                            ]
                        },
                        {
                            "name": "开发工具",
                            "children": [
                                {"name": "webstorm", "value": ''},
                                {"name": "sublime", "value": ''},
                                {"name": "Microsoft Visual Studio", "value": ''},
                            ]
                        },
                        {
                            "name": "前端标准/规范",
                            "children": [
                                {"name": "w3c/DOM/BOM/JSON/JSONP/XHTML/XML", "value": ''},
                                {"name": "HTML5/CSS3", "value": ''},
                                {"name": "ECMAScript3/ECMAScript5", "value": ''},
                                {"name": "CommonJS/AMD/CMD", "value": ''},
                                {"name": "HTTP", "value": ''},
                            ]
                        },
                        {
                            "name": "浏览器兼容",
                            "children": [
                                {"name": "IE9以下", "value": ''},
                                {"name": "Chrome/Safari/Firefox", "value": ''},
                            ]
                        },
                        {
                            "name": "前端进阶",
                            "children": [
                                {"name": "MVC/MVVM/MVP", "value": ''},
                                {"name": "JS面向对象", "value": ''},
                                {"name": "JS函数式编程", "value": ''},
                                {"name": "ES6/ES7", "value": ''},
                            ]
                        },
                        {
                            "name": "前端框架/库",
                            "children": [
                                {"name": "vue/react/angularjs等", "value": ''},
                                {"name": "jquery/zepto等", "value": ''},
                                {"name": "Bootstrap/Element UI/Semantic UI/Amaze UI/Pure等", "value": ''},
                            ]
                        },
                        
                    ]
                };
                myChart.hideLoading();
                let option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    legend: {
                        top: '2%',
                        left: '3%',
                        orient: 'vertical',
                        data: [{
                            name: '前端学习路线图',
                            icon: 'rectangle'
                        } ,
                        {
                            name: 'tree2',
                            icon: 'rectangle'
                        }],
                        borderColor: '#c23531'
                    },
                    series:[
                        {
                            type: 'tree',

                            name: '前端学习路线图',

                            data: [data1],

                            top: '5%',
                            left: '20%',
                            bottom: '2%',
                            right: '50%',

                            symbolSize: 7,

                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right'
                                }
                            },

                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },

                            expandAndCollapse: true,

                            animationDuration: 550,
                            animationDurationUpdate: 750

                        },
                    ]
                }
                myChart.setOption(option);
            }*/
        },
        data() {
            return { 
                isShowNotice: false
            }
        },
        created() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.userName = this.userInfo.username;
            this.lastLoginTime = this.$lcf.$DC.formatDates(this.userInfo.lastLoginTime)
        },
        mounted(){
        }
    }
</script>

<style lang="scss" scoped>
    #app-content{
        .main-l{
            width: 340px;
            height: 100%;
        }
        .userMain{
            margin-top: 60px;
            height: 300px;
            background-color: #fff;
            border-radius: 6px; 
            box-shadow: 0 0 0 #000;
            position: relative;
            text-align: center;
            padding-top:100px;
            box-sizing: border-box; 
            .userLogo{
                position: absolute;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 100px;
                line-height: 100px;
                text-align: center;
                background-color: $-color-theme-bg;
                color: #fff;
                border-radius: 50%;
                margin: 0 auto;
            }
            span{
                display: inline-block;
                width: 80px;
                text-align: right;
            }
            .userName{
                font-size: 16px;
                margin-bottom: 40px;
            }
        }
    }
    
</style>


