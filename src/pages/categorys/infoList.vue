<template>
     <section 
        id="app-content" 
       >
         <header class="listHeader">
            <button 
                class="lcf-btn-save" 
                type="text" 
                @click="createFn">
                <i class="iconfont">&#xe78a;</i>新增
            </button>
            <button 
                class="lcf-btn-save" 
                type="text" 
                @click="saveFn">
                <i class="iconfont">&#xe789;</i>保存
            </button>
         </header>
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
                            <i class="el-icon-edit table-color-info" v-if="!scope.row.isAdmin && !scope.row.edit" @click="updateFn(scope.row, scope.$index)" title="编辑"></i>
                            <i class="el-icon-delete table-color-info"  v-if="!scope.row.isAdmin" @click="deleteFn(scope.row, scope.$index)" title="删除" ></i>
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
                        <el-input 
                            v-if="i.columnName == 'categoryName'"
                            v-model="scope.row[i.columnName]" 
                            :placeholder="i.columnViewName"
                            :disabled="!scope.row.edit">
                        </el-input>
                        <el-input 
                            v-else-if="i.columnName == 'notes'"
                            v-model="scope.row[i.columnName]" 
                            :placeholder="i.columnViewName"
                            :disabled="!scope.row.edit">
                        </el-input>
                        <span 
                            v-else-if="i.columnName == 'counts'"
                            v-text="scope.row[i.columnName] || 0" 
                            :class="{'table-color-disable': !scope.row[i.columnName]}"></span>
                        <span 
                            v-else
                            v-text="scope.row[i.columnName] || $lcf.appEmptyPlaceholder" 
                            :class="{'table-color-disable': !scope.row[i.columnName]}"></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                @size-change="handleSizeChange" 
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
    
    export default {
        components: {

        },
        data() {
            return { 
                loading:false,
                totalCount: 0,
                tableData: [],
                formData: {
                    pageSize: 10,
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
                        columnViewName: '备注',
                        columnName: 'notes',
                        width: 120,
                    
                    },
                    {
                        columnViewName: '内容条数',
                        columnName: 'counts',
                        width: 120,
                    
                    },
                    {
                        columnViewName: '创建时间',
                        columnName: 'addTime',
                        width: 180,
                    
                    },
                ]
            }
        },
        methods: {
            // 登录
            async categoryInfo(){
                this.loading = true;
                let _data = await this.$http('post', '/categorys/infoList');
                if(_data.status == 200){
                    _data.data.forEach((item , index) => {
                        this.$set(item, 'indexOf', index + 1);
                        log(item.addTime)
                        item.addTime = this.$lcf.$DC.formatDates(item.addTime);
                        this.$set(item, 'edit', false);
                    })
                    this.totalCount = _data.data.length;
                    this.tableData = _data.data;
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
                        message: '请先选择需要删除的用户!!!',
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
                let _data = await this.$http('post', '/categorys/bulkDelete', {ids: this.selectionData});
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.categoryInfo();
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
                        message: '请先保存已编辑的用户信息......',
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
                let _data = await this.$http('post', '/categorys/delete', {_id: row._id});
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.categoryInfo();
                    }, 200)
                }
            },
            async saveFn(){
                if(!this.tableThisRow || !this.tableThisRow.edit) return;
                let url = '/categorys/update' 
                const tableThisRow = JSON.parse(JSON.stringify(this.tableThisRow));
                
                if(!this.tableThisRow._id){
                    url = '/categorys/create';
                    if(!tableThisRow.addTime){
                        tableThisRow.addTime = this.$lcf.$DC.formatDates();
                    }
                }
                let _data = await this.$http('post', url, tableThisRow);
                if(_data.status == 200){
                    this.$message({
                        message: _data.data.message,
                        type: _data.data.status,
                    });
                    this.loading = true;
                    setTimeout(() => {
                        this.categoryInfo();
                    }, 200)
                }
            }
            
        },
        computed: {
           // 允许增加来源单货品
            isEdit() {
                // 来源单id大于0则有来源单 
                const isSource = this.tableData.some(i => {
                    return i.edit;
                });
                return isSource;
            },
        },
        beforeCreate(){
            
        },
        created() {
           this.categoryInfo();
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
    .table-i-box{
        i{
            cursor: pointer;
            margin-right: 5px;
            font-size: 14px !important;
            color: $-color-theme-bg;
        }
    }

</style>


