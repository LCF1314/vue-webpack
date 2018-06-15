<template>
    <header class="listHeader">
        <button 
            v-if="btns.includes('新增')"
            class="lcf-btn-save" 
            type="text" 
            @click="btnClick('新增')">
            <i class="iconfont">&#xe78a;</i>新增
        </button>
        <button 
            v-if="btns.includes('保存')"
            class="lcf-btn-save" 
            type="text" 
            @click="btnClick('保存')">
            <i class="iconfont">&#xe789;</i>保存
        </button>
        <button 
            v-if="btns.includes('刷新')"
            class="lcf-btn-save" 
            type="text" 
            @click="btnClick('刷新')">
            <i class="iconfont">&#xe798;</i>刷新
        </button>
        </header>
    </div>
</template>
<script>
    
    export default {
        props:{
            btns: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        components: {

        },
        data() {
            return { 
            
            }
        },
        methods: {
            btnClick(name) {
                this.$emit('btn-change', name);
            },
            
        },
        computed: {
          
        },
        created() {
        },
    }
</script>

<style lang="scss" scoped>
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
</style>


