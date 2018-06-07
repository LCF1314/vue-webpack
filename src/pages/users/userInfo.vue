<template>
     <section id="app-content">
        <div 
            class="table-box box-shadow-card" 
            element-loading-text="系统拼命加载中..." 
           >
           <header class="clearfix" padding>
                <div class=" fl">
                    <button 
                        class="lcf-btn" 
                        type="text" 
                        @click="deleteClick">
                        <i class="iconfont">&#xe69d;</i>批量删除
                    </button>
                </div>
            </header>
            <el-table 
                :data="tableData" 
                border 
                :height="500"  
                ref="multipleTable" 
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
                    :width="40">
                    <template slot-scope="scope">
                        <div class="table-i-box">
                            <i class="el-icon-plus table-color-info" title="添加"></i>
                            <i class="el-icon-delete2 table-color-info" title="删除" ></i>
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
                        <span 
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
                totalCount: 0,
                tableData: [],
                formData: {
                    pageSize: 10,
                },
                currentPage: 1,
                tableTh: [
                    {
                        columnViewName: '用户名',
                        columnName: 'username',
                        width: 120,
                    },
                    {
                        columnViewName: '是否是管理员',
                        columnName: 'isAdmin',
                        width: 120,
                    
                    },
                    {
                        columnViewName: '注册时间',
                        columnName: 'addTime',
                        width: 180,
                    
                    },
                    {
                        columnViewName: '上次登录时间',
                        columnName: 'lastLoginTime',
                        width: 180,
                    
                    },
                    {
                        columnViewName: '登录次数',
                        columnName: 'loginCounts',
                        width: 120,
                    
                    },
                    {
                        columnViewName: '登录IP',
                        columnName: 'loginIp',
                        width: 120,
                    },
                ]
            }
        },
        methods: {
            // 登录
            async userInfo(){
                let _data = await this.$http('post', '/user/userInfo');
                if(_data.status == 200){
                    _data.data.forEach((item , index) => {
                        this.$set(item, 'indexOf', index + 1);
                        item.lastLoginTime = this.$lcf.$DC.formatDates(item.lastLoginTime);
                        item.addTime = this.$lcf.$DC.formatDates(item.addTime);
                        item.isAdmin =  item.isAdmin ? '是' : '否';
                    })
                    this.totalCount = _data.data.length;
                    this.tableData = _data.data;
                }
            },
            getTableHeaderWidth(){

            },
            handleSelectionChange(){

            },
            handleSizeChange(){

            },
            paginationCurrentClick(){

            },
            deleteClick(){

            }
        },
        computed: {
           
        },
        beforeCreate(){
            
        },
        created() {
           this.userInfo();
        },
    }
</script>

<style lang="scss" scoped>
  header{
      background: #fff;
      height: 36px;
      line-height: 36px;
      font-size: 12px;
      .lcf-btn{
           color: $-color-theme-bg;
           background-color: #fff; 
      }
  }

</style>


