<template>
  <div class="login">
    <el-container>
      <el-header>
        <base-header></base-header>
      </el-header>
      <el-main>
        <div class="flex-center">
          <el-col :span="22" class="container">
            <div class="left">
              <el-button type="text" @click="logout">登出</el-button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="FaceBook主页信息展示" name="FcIndex">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <i class="el-icon-edit"></i>
                    <span>
                      创建爬虫任务
                      <span class="tips">(url为待爬虫地址)</span>
                    </span>
                  </div>
                  <div class="text item">
                    <el-form
                      :model="ruleForm"
                      :rules="rules"
                      ref="ruleForm"
                      label-width="100px"
                      class="demo-ruleForm"
                    >
                      <el-form-item label="主页类型">
                        <el-select v-model="ruleForm.type" placeholder="请选择主页类型">
                          <el-option
                            v-for="item in typeOptions"
                            clearable
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item v-if="ruleForm.type === 0">
                        <label for></label>
                        <span
                          class="tips"
                        >类型facebook videos 需添加ads页面url 如https://www.facebook.com/fashionrotita/ads/</span>
                      </el-form-item>
                      <el-form-item label="url地址" prop="url">
                        <el-input placeholder="请输入url地址" clearable v-model="ruleForm.url"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <i class="el-icon-search"></i>
                    <span>FB任务列表</span>
                  </div>
                  <div class="text item">
                    <el-form ref="form" :model="form" label-width="100px">
                      <el-form-item label="主页类型">
                        <el-select v-model="form.type" placeholder="请选择主页类型">
                          <el-option
                            v-for="item in typeOptions"
                            :key="item.key"
                            clearable
                            :label="item.value"
                            :value="item.key"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="关键词">
                        <el-input v-model="form.url" clearable placeholder="请输入主页名称或主页链接或主页类型"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">查看</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-card>
                <el-card class="box-card">
                  <template>
                    <el-table
                      :data="tableData.data"
                      style="width: 100%"
                      :default-sort="{prop: 'date', order: 'descending'}"
                    >
                      <el-table-column prop="classify" label="主页类型" sortable width="180"></el-table-column>
                      <el-table-column
                        prop="created_at"
                        label="创建时间"
                        sortable
                        :formatter="dateFormat"
                        width="180"
                      ></el-table-column>
                      <el-table-column prop="status" label="状态" sortable width="180"></el-table-column>
                      <el-table-column label="url">
                        <template slot-scope="scope">
                          <el-popover trigger="hover" placement="top">
                            <p>url: {{ scope.row.url }}</p>
                            <div slot="reference" class="name-wrapper">
                              <el-tag size="medium">{{ scope.row.url }}</el-tag>
                            </div>
                          </el-popover>
                        </template>
                        <!-- <template slot-scope="scope">
                          <el-button type="text">{{scope.row.url}}</el-button>
                        </template>-->
                      </el-table-column>
                      <el-table-column label="操作" fixed="right" width="160">
                        <template slot-scope="scope">
                          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                          >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-card>
                <el-dialog title="爬虫任务信息" :visible.sync="dialogFormVisible">
                  <el-form :model="ruleForm2">
                    <el-form-item label="主页类型" label-width="120px">
                      <el-select v-model="ruleForm2.classify" placeholder="请选择主页类型">
                        <el-option
                          v-for="item in typeOptions"
                          :key="item.key"
                          clearable
                          :label="item.value"
                          :value="item.key"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="url" label-width="120px">
                      <el-input v-model="ruleForm2.url" clearable placeholder="请输入主页名称或主页链接或主页类型"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                  </div>
                </el-dialog>
                <el-row>
                  <base-pagination :totalnum="tableData.total" @pageChange="pageChange"></base-pagination>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="FaceBook视频广告信息展示" name="FcNews">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <i class="el-icon-menu"></i>
                    <span>筛选</span>
                  </div>
                  <div class="item text">
                    <el-row>
                      <el-col style="line-height: 40px;width: auto">排序：</el-col>
                      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="3">
                        <el-select v-model="sort" placeholder="请选择">
                          <el-option
                            v-for="item in sorts"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col style="line-height: 40px;width: auto">url/主页名称：</el-col>
                      <el-col :xs="8" :sm="6" :md="4" :lg="5" :xl="5">
                        <el-input v-model="keywords" placeholder="请输入主页名称、主页链接、广告详情描述"></el-input>
                      </el-col>
                      <el-col style="line-height: 40px;width: auto;margin-left: 10px">发布日期：</el-col>
                      <el-col :xs="14" :sm="13" :md="9" :lg="8" :xl="8">
                        <el-date-picker
                          v-model="date"
                          type="datetimerange"
                          value-format="timestamp"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions2"
                        ></el-date-picker>
                      </el-col>
                      <el-col :xs="24" :sm="3" :md="3" :lg="2" :xl="2">
                        <el-button @click="search">查询</el-button>
                      </el-col>
                    </el-row>
                    <el-row class="display-wrap" :gutter="10">
                      <el-col
                        :xs="12"
                        :sm="8"
                        :md="8"
                        :lg="4"
                        :xl="4"
                        v-for="item of fansData.data"
                        :key="item.index"
                      >
                        <el-card
                          style="margin-bottom: 10px"
                          :body-style="{ padding: '0px 15px 0' }"
                        >
                          <div class="brand">
                            <div class="littleLogo">
                              <img :src="item.avatar" alt>
                            </div>
                            <div class="name" @click="goUrl(item.video_url)">{{item.title}}</div>
                          </div>
                          <div class="introduction"></div>
                          <div class="viedo">
                            <video
                              controls="controls"
                              name="media"
                              pre="metada"
                              style="width: 96%; height: 200px;"
                              :poster="item.video_pic"
                            >
                              <source :src="item.video_path" type="video/mp4">
                            </video>
                          </div>
                          <div>发布日期：{{item.public_time | formatDate}}</div>
                          <div class="flex">
                            <div>
                              <i class="el-icon-view"></i>
                              <span>{{item.play_num}}</span>次浏览
                            </div>
                            <div>
                              <i class="el-icon-check"></i>
                              <span>{{item.like_num}}</span>次点赞
                            </div>
                          </div>
                          <div class="flex">
                            <div>
                              <i class="el-icon-edit-outline"></i>
                              <span>{{item.comment_num}}</span>次评论
                            </div>
                            <div>
                              <i class="el-icon-share"></i>
                              <span>{{item.share_num}}</span>次分享
                            </div>
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                    <el-row>
                      <base-pagination
                        :totalnum="fansData.total ? fansData.total : 0"
                        @pageChange="pageChangeT"
                      ></base-pagination>
                    </el-row>
                  </div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="Spy工具登陆" name="SpyTools">
                <el-table :data="spyTableData" style="width: 100%" height="250">
                  <el-table-column fixed prop="user_name" label="登陆名" width="150"></el-table-column>
                  <el-table-column prop="classify_name" label="spy工具分类" width="150"></el-table-column>
                  <el-table-column prop="url" label="url地址" width="350"></el-table-column>
                  <el-table-column label="操作" align="right">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="loginSpy(scope.$index, scope.row)">登陆</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <form method="POST" action="https://dropship-spy.com/login/" v-show="false">
                  <input type="text" name="log" v-model="user_name">
                  <input type="password" name="pwd" v-model="password">
                  <input type="hidden" value="https://dropship-spy.com/home">
                  <input type="hidden" redirect_to= "cc" name="mepr_process_login_form" value="true">
                  <input type="hidden" name="mepr_is_login_page" value="true">
                  <input type="submit" id="c" value="提交">
                </form>
              </el-tab-pane>
              <!--  <el-tab-pane label="FaceBook主页状态" name="FcIndexState">定时任务补偿</el-tab-pane>-->
            </el-tabs>
          </el-col>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import baseHeader from "@/components/_baseHeader.vue"; //baseHeader是一个头部组件
import basePagination from "@/components/_basePagination.vue"; //basePagination是一个分页组件
import { mapState } from "vuex";
import { formatDate } from "@/components/filtersDate.js"; //时间过滤器
export default {
  name: "login",
  components: {
    baseHeader,
    basePagination
  },
  data() {
    return {
      activeName: "FcIndex",
      ruleForm: {
        type: ""
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        url: [{ required: true, message: "请填写url", trigger: "blur" }]
      },
      form: {
        type: "facebook video"
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 92);
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 184);
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1 - 1);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      date: "",
      fansCurPage: 1,
      fansCardCurPage: 1,
      scanTimes: [],
      clickTimes: [],
      markTimes: [],
      shareTimes: [],
      areas: "",
      type: "",
      definedType: "",
      sort: "",
      keywords: "",
      typeOptions: [],
      options: [
        {
          value: [0, 5000],
          label: "0至5000"
        },
        {
          value: [5000, 10000],
          label: "5千至1万"
        },
        {
          value: [10000, 100000],
          label: "1万至10万"
        },
        {
          value: [100000, -1],
          label: "10万以上"
        }
      ],
      options2: [
        {
          value: [0, 500],
          label: "0至500"
        },
        {
          value: [500, 1000],
          label: "5百至1千"
        },
        {
          value: [1000, 10000],
          label: "1千至1万"
        },
        {
          value: [10000, -1],
          label: "1万以上"
        }
      ],
      defineItems: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "未分类"
        },
        {
          value: "0",
          label: "新奇特"
        },
        {
          value: "0",
          label: "服装"
        }
      ],
      sorts: [
        {
          value: "public_time desc",
          label: "发布日期"
        },
        {
          value: "play_num desc",
          label: "浏览次数"
        },
        {
          value: "like_num desc",
          label: "点赞次数"
        },
        {
          value: "comment_num desc",
          label: "评论次数"
        },
        {
          value: "share_num desc",
          label: "分享次数"
        }
      ],
      areasItems: [
        {
          value: "0",
          label: "美国"
        },
        {
          value: "1",
          label: "全部"
        }
      ],
      fansData: [],
      tableData: [],
      spyTableData: [],
      spyTotalnum: 0,
      ruleForm2: [],
      dialogFormVisible: false,
      ormLabelWidth: "120px",
      page: 0,
      user_id: null,
      password: null,
      user_name: null,
      // action: null,redirect_to: "cc"
    };
  },
  mounted() {
    this.user_id = parseInt(sessionStorage.getItem("userId"));
    this.onSubmit();
    this.search();
    this.$store.dispatch("GetFbSplidersClassifys").then(data => {
      this.typeOptions = data.classify;
    });
    this.getSpyToolsList();
  },
  computed: {},

  filters: {
    formatDate(time) {
      const date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property];
      if (daterc != null) {
        const dateMat = new Date(daterc);
        return formatDate(dateMat, "yyyy-MM-dd hh:mm");
      }
    },
    pageChange(item) {
      this.fansCurPage = item;
      this.onSubmit();
    },
    pageChangeT(item) {
      this.page = item - 1;
      this.search();
    },
    handleClick(tab, event) {},
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.data.splice(index, 1);
          this.$store
            .dispatch("DeleteFaceBookSpiders", row.id)
            .then(data => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.ruleForm2 = row;
      const id = row.id;
      const res = {
        classify: this.ruleForm2.classify,
        url: this.ruleForm2.url
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const res = {
            classify: 0,
            url: this.ruleForm.url,
            user_id: this.user_id
          };
          this.$store
            .dispatch("CreateFaceBookSpliders", res)
            .then(data => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.ruleForm = {};
              this.search();
              this.onSubmit();
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "添加失败!"
              });
            });
        } else {
          return false;
        }
      });
    },
    update() {
      const id = this.ruleForm2.id;
      const res = {
        classify: this.ruleForm2.classify,
        url: this.ruleForm2.url,
        user_id: this.user_id
      };
      this.$store
        .dispatch("UpdateFaceBookSpliders", { res, id })
        .then(data => {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        })
        .catch(err => {
          this.dialogFormVisible = false;
          this.$message({
            type: "error",
            message: "更新失败!"
          });
        });
    },
    onSubmit() {
      const res = {
        classify: this.form.type == "facebook video" ? 0 : this.form.type,
        url: this.form.url,
        user_id: this.user_id
      };
      this.$store.dispatch("GetFaceBookSpliders", res).then(data => {
        data.data.data.forEach(element => {
          element.created_at = element.created_at * 1000;
          element.classify == 0;
          element.classify = "facebook video";
          element.status == 0
            ? (element.status = "待进行")
            : element.status == 1
            ? (element.status = "进行中")
            : element.status == 2
            ? (element.status = "成功")
            : element.status == 3
            ? (element.status = "失败")
            : "";
        });
        this.tableData = data.data;
      });
    },
    search() {
      const res = {
        begin_time: this.date ? this.date[0] / 1000 : "",
        updated_time: this.date ? this.date[1] / 1000 : "",
        user_name: "",
        splider_id: "",
        video_id: "",
        title: this.keywords,
        rows: "20",
        sort: this.sort,
        start: this.page,
        user_id: this.user_id
      };
      this.$store.dispatch("GetFaceBookVideos", res).then(data => {
        this.fansData = [];
        this.fansData = data.data;
      });
    },
    reset() {
      this.date = "";
      this.fansCardCurPage = 1;
      this.scanTimes = "";
      this.clickTimes = "";
      this.markTimes = "";
      this.shareTimes = "";
    },
    goUrl(val) {
      window.open(val);
    },
    logout() {
      sessionStorage.clear();
      location.reload();
      // this.$store.dispatch("LogOut").then(data => location.reload());
    },
    async getSpyToolsList() {
      const data = await this.$store.dispatch("GetSpyToolsList");
      this.spyTotalnum = data.total;
      this.spyTableData = data.data.data;
    },
    loginSpy(index, row) {
      // const res = {
      //   log:row.user_name,
      //   pwd: row.password,
      //   mepr_process_login_form: true,
      //   mepr_is_login_page: true
      // }
      // this.$store.dispatch("SpyLogin", res).then((data) => {
      //   console.log(data)
      // })
      this.user_name = row.user_name;
      this.password = row.password;
             this.$message({
          message: '2s后将跳转登陆，请等待',
          type: 'warning'
        });
      setTimeout(
       'document.getElementById("c").click()', 2000)
      // ;
    }
  }
};
</script>
<style lang="scss">
.login {
  .el-header {
    padding: 0;
    width: 100%;
    height: 65px !important;
    border: 0 none;
    border-color: #121418;
    background-color: #212b37;
    box-shadow: 0 -3px 3px #2c343d inset;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 10pt;
  }
  .left {
    text-align: right;
  }
  .display-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .el-main {
    .tips {
      color: #c9302c;
      font-size: 9pt;
    }
    padding: 0;
    .flex-center {
      display: flex;
      justify-content: center;
    }
    .el-card {
      padding: 0;
    }
    .container {
      background: #fff;
      box-shadow: 0 0 5px #ccc;
      border-radius: 0 0 5px 5px;
      padding: 10px 10px 0;
      padding-bottom: 150px;
      .el-card__header {
        color: #6f7a81;
        font-weight: 700;
        font-size: 13pt;
      }
      .box-card {
        margin-bottom: 15px;
      }
      .display {
        .el-col {
          margin: 15px 0;
          display: flex;
          label {
            min-width: 84px;
            line-height: 40px;
          }
        }
      }
      .el-card {
        width: 100%;

        .display {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .brand {
        display: flex;
        .littleLogo {
          width: 30px;
          height: 30px;
          line-height: 30px;
          img {
            height: 100%;
          }
        }
        .name {
          line-height: 30px;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #337ab7;
          cursor: pointer;
        }
      }
      .flex {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        span {
          color: red;
          font-style: italic;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
