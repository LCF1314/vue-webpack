<template>
     <section 
        id="app-content" 
       >
        <order-header :btns = "['新增', '刷新']" @btn-change = "btnChange"></order-header>
        <div 
            v-loading = "loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            element-loading-text="系统拼命加载中..."
            class="table-box box-shadow-card" >
           <header class="clearfix" padding>
                <div class=" fl">
                    <button 
                        class="lcf-btn" 
                        type="text" 
                        @click.stop="deleteClick">
                        <i class="iconfont">&#xe69d;</i>批量删除
                    </button>
                </div>
            </header>
            <el-table 
                :data="tableData" 
                border 
                :height="600"  
                ref="multipleTable" 
                @row-click="tableRowClick" 
                @header-dragend="getTableHeaderWidth" 
                @selection-change="handleSelectionChange" 
               
                style="width: 100%">
                <el-table-column 
                    type="selection" 
                    align="center"
                    fixed 
                    width="46">
                </el-table-column>
                <el-table-column 
                    label=" " 
                    type="index" 
                    align="center" 
                    :width="36">
                </el-table-column>
                <el-table-column 
                    label="操作" 
                    align="center" 
                    :width="80">
                    <template slot-scope="scope">
                        <div class="table-i-box">
                            <router-link  tag="a" :to="{name: '内容详情', params: {id: scope.row._id, clear: true}}">
                                <i class="el-icon-edit table-color-info"  title="编辑"></i>
                            </router-link>
                            <i class="el-icon-delete table-color-info"   @click="deleteFn(scope.row, scope.$index)" title="删除" ></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column 
                    v-for="(i, index) in tableTh" 
                    :key="index" 
                    :label="i.columnViewName" 
                    align="center"  
                    :width="i.width"
                    :prop="i.columnName">
                    <template  slot-scope="scope">
                        <!--<div v-if="i.columnName == 'content'"  v-html="scope.row[i.columnName]" style="overflow-y:auto;"></div>-->
                        <span 
                            v-text="scope.row[i.columnName] || $lcf.appEmptyPlaceholder" 
                            :title="scope.row[i.columnName]"
                            :class="{'table-color-disable': !scope.row[i.columnName]}"></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                @size-change="handleSizeChange"
                background 
                @current-change="paginationCurrentClick" 
                :current-page.sync="currentPage" 
                :page-size="formData.pageSize" 
                layout="prev, pager, next, jumper, total" 
                :total="totalCount">
            </el-pagination>
        </div>

    </section>
</template>
<script>
    import OrderHeader from '../../common/order/OrderHeader'
    export default {
        components: {
            OrderHeader
        },
        data() {
            return { 
                loading:false,
                totalCount: 0,
                tableData: [],
                formData: {
                    pageSize: 20,
                    pageIndex: 1,
                },
                tableItemTPL:{
                    categoryName: '',
                    addTime: '',
                    counts: 0,
                    notes: '',
                    id: '',
                    edit: true,
                    userId: JSON.parse(localStorage.getItem('userInfo'))._id,
                },
                selectionData: [],
                tableThisRow: null,
                currentPage: 1,
                tableTh: [
                    {
                        columnViewName: '分类名',
                        columnName: 'categoryName',
                        width: 120,
                    },
                    {
                        columnViewName: '标题',
                        columnName: 'title',
                        width: 120,
                    },
                    {
                        columnViewName: '阅读量',
                        columnName: 'views',
                        width: 120,
                    },
                    {
                        columnViewName: '创建时间',
                        columnName: 'addTime',
                        width: 180,
                    },
                    {
                        columnViewName: '最后修改时间',
                        columnName: 'updateTime',
                        width: 180,
                    },
                    {
                        columnViewName: '创建人',
                        columnName: 'username',
                        width: 120,
                    },
                    {
                        columnViewName: '内容',
                        columnName: 'content',
                        width: 420,
                    },
                ]
            }
        },
        methods: {
            async contentInfo(){
                this.loading = true;
                let _data = await this.$http('post', '/content/infoList', this.formData);
                if(_data.status == 200){
                    _data.data.result.forEach((item , index) => {
                        this.$set(item, 'indexOf', index + 1);
                        item.addTime = item.addTime ? this.$lcf.$DC.formatDates(item.addTime) : '';
                        item.updateTime = item.updateTime ? this.$lcf.$DC.formatDates(item.updateTime) : '';
                        this.$set(item, 'edit', false);
                    })
                    this.totalCount = _data.data.totalCount;
                    this.tableData = _data.data.result;
                }
                this.loading = false;
            },
            getTableHeaderWidth(){

            },
            handleSelectionChange(selections){
               this.selectionData =  selections;
            },
            handleSizeChange(){

            },
            paginationCurrentClick(){
                this.formData.pageIndex = this.currentPage;
                this.contentInfo();
            },
            createFn(){
                if(this.tableData.some(item => {return item.edit})) {
                    this.$message({
                        message: '请先保存已编辑的分类信息!!!',
                        type: 'warning',
                    });
                    return
                };
                this.tableData.unshift(JSON.parse(JSON.stringify(this.tableItemTPL)));
            },
            deleteClick(){
                if(this.selectionData.length === 0){
                    this.$message({
                        message: '请先选择需要删除的分类!!!',
                        type: 'warning',
                    });
                    return;
                }
                this.$confirm('删除后没有保存, 且不可恢复, 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                   this.bulkDelete();
                }).catch(() => {
                   this.$message({
                        message: '已取消删除。',
                        type: 'info',
                    });
                });
            },
            async bulkDelete(){
                this.selectionData = this.selectionData.filter(item => {
                    return !item.isAdmin;
                }).map(item => {
                    return item._id;
                })
                let _data = await this.$http('post', '/content/bulkDelete', {ids: this.selectionData});
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.contentInfo();
                    }, 200)
                }
            },
            tableRowClick(row){
                this.tableThisRow = row;
            },
            
            updateFn(row, index){
                let oldIndex = 100000000;
                if(oldIndex == index){
                    return;
                }
                oldIndex = index;
                if(this.isEdit){
                    this.$message({
                        message: '请先保存已编辑的分类信息......',
                        type: 'warning',
                    });
                    return;
                }
                row.edit = true;
            },
            async deleteFn(row, index){
                this.$confirm('删除后没有保存, 且不可恢复, 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                   this.delete(row);
                }).catch(() => {
                   this.$message({
                        message: '已取消删除。',
                        type: 'info',
                    });
                });
                
            },
            async delete(row){
                let _data = await this.$http('post', '/content/delete', {_id: row._id});
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.contentInfo();
                    }, 200)
                }
            },
            // 刷新
            reset(){
                this.$confirm('确定刷新', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.contentInfo();
                }).catch(() => {
                    this.$message({
                        message: '已取消刷新',
                        type: 'info',
                    });
                });
            },
            btnChange(name){
                switch(name){
                    case '新增':
                        this.$router.replace({name: '内容详情', params: {id: 'create'}});
                    break;
                    case '刷新':
                        this.reset();
                    break;
                    default:;
                }
            }
        },
        computed: {
            // 编辑
            isEdit() {
                const isSource = this.tableData.some(i => {
                    return i.edit;
                });
                return isSource;
            },
        },
        beforeCreate(){
            
        },
        activated() {
            this.contentInfo();
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    header{
        background: #fff;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
    }
    .table-i-box{
        i{
            cursor: pointer;
            margin-right: 5px;
            font-size: 14px !important;
            color: $-color-theme-bg;
        }
    }

</style>


