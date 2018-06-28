<template>
    <section 
        id="app-content">
       <!-- <el-upload
            class="upload-demo"
            :action="BASE_URL + '/uploadFile'"
            enctype="multipart/form-data"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            multiple
            :limit="3"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->
        <el-upload
            :file-list="fileList"
            :action="BASE_URL + '/uploadFile'"
            enctype="multipart/form-data"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="onSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!--手动控制数据流-->
    </section>
</template>
<script>
    import { BASE_URL } from '../../config/const';
    export default {
        data() {
            return { 
                dialogImageUrl: '',
                dialogVisible: false,
                BASE_URL: BASE_URL,
                fileList: [],
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
                log(file)
                this.deletePhoto(file);
            },
            handlePreview(file) {
                console.log(file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            onSuccess(response, file, fileList){
               this.getPhotos();
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG/PNG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return false;  
                }
                return isJPG && isLt2M;
            },
            async getPhotos(){
                this.loading = true;
                let _data = await this.$http('post', '/getPhotos', {id: this.$route.params.id});
                if(_data.status == 200){
                    this.fileList = _data.data.result.map(item => {
                        return {
                            name: item.originalname,
                            fileName: item.fileName,
                            url: item.filePath,
                            link: item.link,
                            uid: item._id
                        }
                    });
                }
                this.loading = false;
            },
            async deletePhoto(file){
                this.loading = true;
                let _data = await this.$http('post', '/deletePhoto', {id: file.uid,fileName: file.fileName});
                if(_data.status == 200){
                     this.$message({
                        message: '删除成功',
                        type: 'success',
                    });
                }
                this.loading = false;
            },
          
        },
        beforeCreate(){
            
        },
        activated() {
            if(this.$route.params.id != 'create'){
            }else{
            }
        },
        created() {
            this.getPhotos();
        },
        mounted(){
        }
    }
</script>

<style >
   
</style>


