<template>
    <section 
        id="app-content">
        <order-header :btns = " isAdmin ? ['新增', '保存', '刷新'] : ['刷新']" @btn-change = "btnChange"></order-header>
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
        <!--<el-upload
            class="upload-demo"
            :action="BASE_URL + '/upload'"
            enctype="multipart/form-data"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->
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
    import { BASE_URL } from '../../config/const';
    export default {
        components: {
            OrderHeader, quillEditor
        },
        data() {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            return { 
                content: 'I am Example',
                editorOption: {
                    // something config
                },
                form: {},
                isAdmin: userInfo.isAdmin,
                BASE_URL: BASE_URL,
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
            // 刷新
            reset(){
                this.$confirm('刷新后不保存已修改的数据,如若保存请先点击保存！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.categoryInfo();
                    if(this.$route.params.id != 'create'){
                        this.getModel();
                        this.$message({
                            message: '刷新成功',
                            type: 'success',
                        });
                    }else{
                        this.form = JSON.parse(JSON.stringify(this.postData));
                        this.$message({
                            message: '刷新成功',
                            type: 'success',
                        });
                    }
                }).catch(() => {
                    this.$message({
                        message: '已取消刷新',
                        type: 'info',
                    });
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            btnChange(name){
                switch(name){
                    case '新增':
                        this.$confirm('确认新增', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(() => {
                            this.$router.replace({name: '内容详情', params: {id: 'create'}});
                            this.categoryInfo();
                            this.form = JSON.parse(JSON.stringify(this.postData));
                        }).catch(() => {
                            this.$message({
                                message: '已取消新增',
                                type: 'info',
                            });
                        });
                     
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
                        this.reset();
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
            async uploadFile(){
                this.loading = true;
                let _data = await this.$http('post', '/content/upload', {id: this.$route.params.id});
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
                this.form = JSON.parse(JSON.stringify(this.postData));
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


