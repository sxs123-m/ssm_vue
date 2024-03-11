<template>
  <div>
    <!--增加按钮和搜索框-->
    <!--magrin代表上下边距为10px，左右边距为5px-->
    <div style="margin: 10px 5px">
      <!--为添加按钮把绑定一个事件，当点击的新增的时候就会显示提示框-->
      <el-button type="primary" @click="dialogVisible = true; this.form = {}">新增</el-button>
      <el-button>其他</el-button>
    </div>
    <!--再增加一个搜索框并设置边距-->
    <div style="margin: 10px 5px">
      <!--搜索框，双向绑定一个search-->
      <el-input v-model="search" style="width: 30%" placeholder="请输入关键字"/>
      <el-button type="primary">查找</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 90%">
      <el-table-column
          prop="id"
          label="ID" sortable
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="家居名">
      </el-table-column>
      <el-table-column
          prop="maker"
          label="厂家">
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格">
      </el-table-column>
      <el-table-column
          prop="sales"
          label="销量">
      </el-table-column>
      <el-table-column
          prop="stock"
          label="库存">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <!--#default="scope"然后使用scope.row可以获取当前行的数据-->
          <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加提示框-->
    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <el-form :model="form" label-width="120px">
        <!--注意：表单的属性名字必须与Furn的属性名一致-->
        <el-form-item label="家居名">
          <el-input v-model="form.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="厂商">
          <el-input v-model="form.maker" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sales" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
          <!--当点击确定会执行save方法-->
        <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//导入request对象
import request from "@/utils/request";

export default {
  name: 'HomeView',
  components: {},
  // 增加一个data，单项绑定tableData
  data() {
    return {
      form: {}, //表单数据是一个json对象
      dialogVisible: false, //是否显示提示框
      search: '', //搜索框双向绑定的search
      tableData: []
    }
  },
  //model加载完毕，调用list返回所有家居
  created() {
    this.list()
  },
  methods: {
    //当用户输入完要添加的信息之后会点击确定，此时会触发这个save方法
    save() {
      //如果form有id则说明这个提示框是修改的提示框
      if (this.form.id) {
        //向后端发送请求，进行修改家居
        request.post("/api/update", this.form).then(
            res => {
              //code是200则表示修改成功
              if (res.code === 200) {
                //弹出更新成功的消息框
                this.$message(
                    {
                      type: "success",
                      message: "更新成功！"
                    }
                )
              } else {
                //修改失败
                //弹出更新失败的消息框
                this.$message(
                    {
                      type: "error",
                      message: "更新失败！"
                    }
                )
              }
              //刷新数据
              this.list()
              //关闭提示框
              this.dialogVisible = false
            }
        )
      }
      else {
        //如果form没有id则说明这个提示框是新增的提示框
        //发送post请求并携带form这个js对象的数据，会以json格式进行发送
        request.post("/api/save", this.form).then(
            res => {
              console.log("res=", res);
              this.dialogVisible = false;
              //调用list方法，刷新家居信息
              this.list();
            }
        )
      }

    },
    //请求返回所有家居
    list() {
      request.get("/api/furns").then(
          res => {
            console.log(res)
            this.tableData = res.extend.furnList
          }
      )
    },
    //将这行的数据绑定到提示框并回显
    handleEdit(row) {
      //绑定到提示框
      //将这个row对象（是一个代理对象）转换成JSON格式然后直接绑定到提示框
      this.form = JSON.parse(JSON.stringify(row));
      //显示提示框
      this.dialogVisible = true;
    }

  }
}
</script>



















