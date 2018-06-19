<template>
    <section 
        id="app-content">
        <order-header :btns = "['保存', '刷新']" @btn-change = "btnChange"></order-header>
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="标题：">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="介绍：">
                <el-input type="textarea" v-model="form.description" placeholder="请输入介绍信息"></el-input>
            </el-form-item>
            <el-form-item label="分类类型：">
                 <el-select v-model="form.category" @change="change" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.categoryName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!--双向绑定数据流-->
        <quill-editor ref="myTextEditor"
            v-model="form.content"
            :config="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
        </quill-editor>
        <!--手动控制数据流-->
        <!--<quill-editor ref="myTextEditor"
              :content="content"
              :config="editorOption"
              @change="onEditorChange($event)">
        </quill-editor>-->
        <!--<div class="ql-editor" >{{content}}</div>-->
    </section>
</template>
<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import OrderHeader from '../../common/order/OrderHeader'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        components: {
            OrderHeader, quillEditor
        },
        data() {
            return { 
                content: 'I am Example',
                editorOption: {
                    // something config
                },
                form: {
                    title: '',
                    description: '',
                    content: '',
                    addTime: '',
                    userId: JSON.parse(localStorage.getItem('userInfo'))._id,
                    category: '',
                    comments: [],
                    views: 0,
                },
                formData: {
                    pageSize: 999,
                    pageIndex: 1,
                },
                options: [],
                value: ''
            }
        },
        methods: {
            change(val){
                log(val)
            },
            btnChange(name){
                switch(name){
                    case '保存':
                        this.form.addTime = this.$lcf.$DC.formatDates();
                        this.createContent();
                    break;
                    case '刷新':
                        // this.reset();
                    break;
                    
                    default:;
                }
            },
            async categoryInfo(){
                this.loading = true;
                let _data = await this.$http('post', '/categorys/infoList', this.formData);
                if(_data.status == 200){
                    this.options = _data.data.result;
                }
                this.loading = false;
            },
            async createContent(){
                this.loading = true;
                let _data = await this.$http('post', '/content/create', this.form);
                if(_data.status == 200){
                    this.options = _data.data.result;
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.categoryInfo();
                    }, 200)
                }
                this.loading = false;
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
            // console.log('editor change!', editor, html, text)
                this.content = html
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
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
        mounted(){
            this.categoryInfo();
        }
    }
</script>

<style >
    .listHeader{
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        background: #e9ecf0;
    }
    .quill-editor{
        background: #fff;
        
    }
    .ql-container.ql-snow{
        height: 500px;
        overflow-y: auto;
    }
    .el-form{
        background: #fff;
        padding: 20px 0;
        margin-bottom: 10px;
    }
    .el-form-item{
        width: 500px;
    }
    .el-form .el-form-item .el-select{
        width: 100%;
    }
</style>


