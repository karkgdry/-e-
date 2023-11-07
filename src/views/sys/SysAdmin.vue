<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 10px;">
<el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search" style="width: 400px;margin-right: 10px;"></el-input>
<el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin,index) in admins" :key="index">
  <div slot="header" class="clearfix">
    <span>{{ admin.name }}</span>
    <el-button style="float: right; padding: 3px 0;color: red;" type="text" icon="el-icon-delete" @click="deleteAdmin(admin)"></el-button>
  </div>
 <div class="userinfo-container">
  <div>用户名:{{ admin.name }}</div>
  <div>手机号:{{ admin.phone }}</div>
  <div>电话号码:{{ admin.telephone }}</div>
  <div>地址:{{ admin.address }}</div>
  <div>用户状态:
    <el-switch
  v-model="admin.enabled"
  active-color="#13ce66"
  inactive-color="#ff4949"
  @change="enabledChange(admin)"
  active-text="启用"
  inactive-text="禁用">
</el-switch>
  </div>
  <div>
    用户角色:
    <el-tag style="margin-right: 4px;" type="success"  v-for="(role,indexj) in admin.roles" :key="indexj">{{ role.nameZh }}</el-tag>
    <el-popover
    placement="right"
    title="角色列表"
    width="200"
    @show="showPop(admin)"
    @hide="hidePop(admin)"
    trigger="click">
    <el-select v-model="selectRoles" multiple placeholder="请选择">
    <el-option
      v-for="(r,index) in allRoles"
      :key="index"
      :label="r.nameZh"
      :value="r.id">
    </el-option>
  </el-select>
    <el-button  slot="reference" type="text" icon="el-icon-more"></el-button>
  </el-popover>
  </div>
  <div>
    备注:{{ admin.remark }}
  </div>
 </div>
</el-card>
    </div>
  </div>
</template>

<script>
import StaRecordVue from '../sta/StaRecord.vue';
  export default {
  name: "SysAdmin",
  data() {
    return {
      admins: [],
      keywords: '',
      allRoles: [],
      selectRoles:[]
      }
  },
  mounted() {
    this.initAdmins();
  },
  methods: {
    hidePop(admin) {
      let url = '/system/admin/role?adminId=' + admin.id;
      this.selectRoles.forEach(sr => {
        url += '&rids=' + sr;
      });
      this.putRequest(url).then(resp => {
        if (resp) {
          this.initAdmins();
        }
      })
    },
    showPop(admin) {
      this.initAllRoles();
      let roles = admin.roles;
      this.selectRoles = [];
      roles.forEach(r => {
        this.selectRoles.push(r.id);
      });
    },
    initAllRoles() {
      this.getRequest('/system/admin/roles').then(resp => {
        if (resp) {
          this.allRoles = resp;
        }
      })
    },
    enabledChange(admin) {
      this.putRequest('/system/admin/', admin).then(resp => {
        if (resp) {
          this.initAdmins();
        }
      })
    },
    deleteAdmin(admin) {
      this.$confirm('此操作将永久删除该['+admin.name+']操作员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/admin/'+ admin.id).then(resp => {
            if (resp) {
              this.initAdmins();
          }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    doSearch() {
      this.initAdmins();
    },
    initAdmins() {
      this.getRequest('/system/admin/?keywords='+this.keywords).then(resp => {
        if (resp) {
          this.admins = resp;
          }
        })
      }
    }
 }
</script>

<style>
.admin-card{
  width: 350px;
  margin-bottom: 20px;
}
.admin-container{
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
}
.userinfo-container{
  font-size: 12px;
  color: #409eff;
}
</style>