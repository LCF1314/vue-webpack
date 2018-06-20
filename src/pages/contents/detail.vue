<template>
    <section 
        id="app-content">
        <order-header :btns = "['新增', '保存', '刷新']" @btn-change = "btnChange"></order-header>
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="标题：">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="介绍：">
                <el-input type="textarea" v-model="form.description" placeholder="请输入介绍信息"></el-input>
            </el-form-item>
            <el-form-item label="分类类型：">
                 <el-select v-model="form.categoryId" @change="change" placeholder="请选择">
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
                form: {},
                postData: {
                    title: '',
                    description: '',
                    content: '',
                    addTime: '',
                    userId: JSON.parse(localStorage.getItem('userInfo'))._id,
                    categoryId: '',
                    categoryName: '',
                    comments: [],
                    views: 0,
                    id: '',
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
                let arr = this.options.filter(item => {
                    return val == item._id;
                })
                this.form.categoryName = arr[0].categoryName;
            },
            btnChange(name){
                switch(name){
                    case '新增':
                       this.$router.replace({name: '内容详情', params: {id: 'create'}});
                       this.categoryInfo();
                       this.form = JSON.parse(JSON.stringify(this.postData));
                    break;
                    case '保存':
                        if(this.$route.params.id != 'create'){
                            this.form.updateTime = this.$lcf.$DC.formatDates();
                            this.updateContent();
                        }else{
                            this.form.addTime = this.$lcf.$DC.formatDates();
                            this.createContent();
                        }
                    break;
                    case '刷新':
                        this.categoryInfo();
                        if(this.$route.params.id != 'create'){
                            this.getModel();
                        }else{
                            this.form = JSON.parse(JSON.stringify(this.postData));
                        }
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
            async getModel(){
                this.loading = true;
                let _data = await this.$http('post', '/content/getModel', {id: this.$route.params.id});
                if(_data.status == 200){
                    this.form = _data.data.result;
                }
                this.loading = false;
            },
            async createContent(){
                this.loading = true;
                let _data = await this.$http('post', '/content/create', this.form);
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.$router.replace({name: '内容详情', params: {id: _data.data.result._id}});
                        this.categoryInfo();
                        this.getModel();
                    }, 200)
                }
                this.loading = false;
            },
            async updateContent(){
                this.loading = true;
                let _data = await this.$http('post', '/content/update', this.form);
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.categoryInfo();
                        this.getModel();
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
            if(this.$route.params.id != 'create'){
                this.getModel();
            }else{
                this.form = JSON.parse(JSON.stringify(this.postData));
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


