<template>
     <section 
        id="app-content">
        <order-header :btns = "['保存', '刷新']" @btn-change = "btnChange"></order-header>
        <header class="clearfix" padding>
            <div class=" fl">
                <span class="markdownColor">markdown常用语法</span>
                <strong @click="clickFn('**粗体**')">B</strong>
                <span @click="clickFn('*斜体*')">/</span>
                <span @click="clickFn('# 标题1')">h1</span>
                <span @click="clickFn('## 标题2')">h2</span>
                <span @click="clickFn('### 标题3')">h3</span>
                <span @click="clickFn('#### 标题4')">h4</span>
                <span @click="clickFn('##### 标题5')">h5</span>
                <span @click="clickFn('###### 标题6')">h6</span>
                <span @click="clickFn('----')">一</span>
                <span @click="clickFn('> 666666')">></span>
                <span class="iconfont" @click="clickFn('``` \nCODE\n```')">&#xe69f;</span>
                <span class="iconfont" @click="clickFn('[Vue](https://cn.vuejs.org/images/logo.png)')">&#xe68c;</span>
                <span class="iconfont" @click="clickFn('![Vue](https://cn.vuejs.org/images/logo.png)')">&#xe651;</span>
                <span class="iconfont" @click="clickFn(table)">&#xe607;</span>
                <span class="iconfont" @click="clickFn(' * 66666')">&#xec56;</span>
                <span class="iconfont" @click="clickFn('1. 6666454545')">&#xe67a;</span>
                <span class="iconfont" @click="isOpen = false">&#xe613;</span>
                <span class="iconfont" @click="isOpen = true">&#xe653;</span>
            </div>
        </header>
        <div id="editor">
            <textarea v-if ="isOpen" :value="input" @input="update" autofocus="autofocus"></textarea>
            <div class="compiledMarkdown" v-html="compiledMarkdown"></div>
        </div>
    </section>
</template>
<script>
    import OrderHeader from '../../common/order/OrderHeader'
    import marked from 'marked'
    const _ = require('lodash');
    export default {
        components: {
            OrderHeader
        },
        data() {
            return { 
                loading:false,
                input: '# hello',
                isOpen: true,
                table: 'header1 | header2 \n ---|--- \nrow 1 col 1 | row 1 col \n2row 2 col 1 | row 2 col 2 \n'
            }
        },
        methods: {
            btnChange(name){
                switch(name){
                    case '保存':
                        // this.saveFn();
                    break;
                    case '刷新':
                        // this.reset();
                    break;
                    
                    default:;
                }
            },
            clickFn(type){
                log(type)
                this.input += '\n';
                this.input += type + '\n';
                log(this.compiledMarkdown)
            },
            update: _.debounce(function (e) {
                this.input = e.target.value
            }, 300)
            
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, { sanitize: true })
            }
        },
        beforeCreate(){
            
        },
        
        activated() {
            if(this.$route.meta.keepAlive){
                // this.userInfo();
            }else{

            }
        },
        created() {

        },
    }
</script>

<style>
    .listHeader{
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        background: #e9ecf0;
    }
    header{
        background: #fff;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        
    }
    table tr, table td, table th{
        border: 1px solid #ddd;
    }
    thead{
        background-color: #e9ecf0;
    }
    table td, table th{
        padding: 4px 10px;
    }
    header span,header strong{
        display: inline-block;
        padding: 0 4px;
        font-size: 16px;
        cursor: pointer;
        margin-right: 6px; 
    }
    header span:hover, header strong:hover{
        background: #36b1da;
        color: #fff;
    }
    header span:first-child:hover{
         background: #fff;
         color: #36b1da;
    }
    .compiledMarkdown blockquote {
        padding: 0 1em;
        color: #777;
        border-left: .25em solid #ddd;
    }
    .compiledMarkdown ul, .compiledMarkdown ul li {
        list-style-type: disc;  
    }
    .compiledMarkdown ul li, .compiledMarkdown ol li{
        height: 30px;
        line-height: 30px;
        border-bottom:1px solid #ddd;
        padding-left: 10px;
    }
    .compiledMarkdown ul,.compiledMarkdown ol{
        padding: 0 20px;
        margin-bottom: 10px;
    }
    .compiledMarkdown ol, .compiledMarkdown ol li {
        list-style-type: decimal; 
    }
    .compiledMarkdown hr{
        height: 2px;
        background: #ccc;
    }
    .compiledMarkdown h1 { font-size: 36px; border-bottom: 1px solid #ccc; padding-bottom: 10px;margin-bottom: 10px;}
    .compiledMarkdown h2 { font-size: 30px; border-bottom: 1px solid #ccc; padding-bottom: 10px;margin-bottom: 10px;}
    .compiledMarkdown h3 { font-size: 24px; border-bottom: 1px solid #ccc; padding-bottom: 10px;margin-bottom: 10px;}
    .compiledMarkdown h4 { font-size: 20px; padding-bottom: 10px;margin-bottom: 10px;}
    .compiledMarkdown h5 { font-size: 16px; padding-bottom: 10px;margin-bottom: 10px;}
    .compiledMarkdown h6 { font-size: 14px; padding-bottom: 10px;margin-bottom: 10px;}
    .compiledMarkdown h1, .compiledMarkdown h2, .compiledMarkdown h3, .compiledMarkdown h4, .compiledMarkdown h5, .compiledMarkdown h6{
        font-weight: 600 !important;
    }
    #editor{
        border-top: 1px solid #ccc;
    }
    html, body, #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }
    .markdownColor{
        color:#36b1da;
        cursor: default;
    }
    textarea, #editor div {
        display: inline-block;
        width: 49%;
        height: 600px;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
        overflow-y: auto;
    }
    #editor div.compiledMarkdown{
        padding-top: 16px; 
        background-color: #fff;
    }
    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #42485B;
        font-size: 16px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
        color: #fff;
    }
   
    code {
        color: #f66;
    }
    pre{
        padding: 10px;
        background: #e9ecf0;
        margin: 10px 0;
        border-radius: 5px;
        
    }

</style>


