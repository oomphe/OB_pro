<template>
  <div class="about">
    <el-container>
      <el-header>
        <base-header></base-header>
      </el-header>
      <el-main>
        <div class="flex-center">
          <el-col :span="22" class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="FaceBook主页信息展示" name="FcIndex">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <i class="el-icon-edit"></i>
                    <span>
                      FB主页地址添加
                      <span class="tips">(主页地址为单击‘首页’时的地址)</span>
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
                      <!-- <el-form-item label="主页类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择主页类型">
                          <el-option label="未分类" value="noclassy"></el-option>
                          <el-option label="新奇特" value="Novelty"></el-option>
                          <el-option label="服装" value="costume"></el-option>
                        </el-select>
                      </el-form-item>-->
                      <el-form-item label="粉丝页名称" prop="url">
                        <el-input placeholder="请输入粉丝页名称" v-model="ruleForm.url">
                          <template slot="prepend">Http://</template>
                        </el-input>
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
                    <span>FB主页信息展示</span>
                  </div>
                  <div class="text item">
                    <el-form ref="form" :model="form" label-width="100px">
                      <!-- <el-form-item label="主页类型">
                        <el-select v-model="form.type" placeholder="请选择主页类型">
                          <el-option label="全部" value="all"></el-option>
                          <el-option label="未分类" value="noclassy"></el-option>
                          <el-option label="新奇特" value="Novelty"></el-option>
                          <el-option label="服装" value="costume"></el-option>
                        </el-select>
                      </el-form-item>-->
                      <el-form-item label="粉丝页名称">
                        <el-input v-model="form.keywords" placeholder="请输入粉丝页名称搜索"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">找一找</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-card>
                <el-card class="box-card">
                  <template>
                    <el-table
                      :data="tableData"
                      style="width: 100%"
                      :default-sort="{prop: 'date', order: 'descending'}"
                    >
                      <el-table-column prop="logo" label="主页logo"></el-table-column>
                      <el-table-column prop="name" label="主页名称" sortable width="180"></el-table-column>
                      <el-table-column prop="url" label="主页链接" sortable width="180"></el-table-column>
                      <el-table-column prop="station" label="关联站点" sortable width="180"></el-table-column>
                      <el-table-column prop="type" label="主页类型" sortable width="180"></el-table-column>
                      <el-table-column prop="clickTimes" label="点赞次数" sortable width="180"></el-table-column>
                      <el-table-column prop="followTimes" label="关注次数" sortable width="180"></el-table-column>
                    </el-table>
                  </template>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="FaceBook视频广告信息展示" name="FcNews">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <i class="el-icon-menu"></i>
                    <span>筛选</span>
                  </div>
                  <div class="item text">
                    <el-row>发布日期：
                      <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
                      <el-button type="text">今天</el-button>
                      <el-button type="text">昨天</el-button>
                      <el-button type="text">最近七天</el-button>
                      <el-button type="text">本月</el-button>
                      <el-button type="text">上个月</el-button>
                      <el-button type="text">最近半年</el-button>
                      <el-button type="text">上一年</el-button>
                    </el-row>
                    <el-row class="display" :gutter="10">
                      <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <label>浏览次数：</label>
                        <el-select v-model="scanTimes" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <label>点赞次数：</label>
                        <el-select v-model="clickTimes" placeholder="请选择">
                          <el-option
                            v-for="item in options2"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <label>评论次数：</label>
                        <el-select v-model="markTimes" placeholder="请选择">
                          <el-option
                            v-for="item in options2"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <label>分享次数</label>
                        <el-select v-model="shareTimes" placeholder="请选择">
                          <el-option
                            v-for="item in options2"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <!-- <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <label>发布地区：</label>
                        <el-select v-model="areas" placeholder="请选择">
                          <el-option
                            v-for="item in areasItems"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <label>主页类型：</label>
                        <el-select v-model="type" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col> -->
                    </el-row>
                    <el-row class="display" :gutter="10">
                      <el-col :span="4">
                        <label>排序：</label>
                        <el-select v-model="sort" placeholder="请选择">
                          <el-option
                            v-for="item in sorts"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="6">
                        <el-input v-model="keywords" placeholder="请输入主页名称、主页链接、广告详情描述"></el-input>
                      </el-col>
                      <el-col :span="6">
                        <el-button>查询</el-button>
                        <el-button>重置</el-button>
                      </el-col>
                    </el-row>
                    <el-row class="display">
                      <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
                        <el-card :body-style="{ padding: '0px' }">
                          <div class="brand">
                            <div class="littleLogo"></div>
                            <div class="name">212</div>
                          </div>
                          <div class="introduction"></div>
                          <div class="viedo"></div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="FaceBook视频广告收藏" name="FcVideos">角色管理</el-tab-pane>
              <el-tab-pane label="FaceBook主页状态" name="FcIndexState">定时任务补偿</el-tab-pane>
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
export default {
  name: "about",
  components: {
    baseHeader
  },
  data() {
    return {
      activeName: "FcIndex",
      ruleForm: {
        type: "noclassy"
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        url: [{ required: true, message: "请填写url", trigger: "blur" }]
      },
      form: {
        type: "all"
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      date: "",
      scanTimes: "",
      clickTimes: "",
      markTimes: "",
      shareTimes: "",
      areas: "",
      type: "",
      definedType: "",
      sort: "",
      keywords: "",
      options: [
        {
          value: "1",
          label: "0至5000"
        },
        {
          value: "2",
          label: "5千至1万"
        },
        {
          value: "3",
          label: "1万至10万"
        },
        {
          value: "4",
          label: "10万以上"
        }
      ],
      options2: [
        {
          value: "1",
          label: "0至500"
        },
        {
          value: "2",
          label: "5百至1千"
        },
        {
          value: "2",
          label: "1千至1万"
        },
        {
          value: "2",
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
          value: "0",
          label: "发布日期"
        },
        {
          value: "1",
          label: "浏览次数"
        },
        {
          value: "2",
          label: "点赞次数"
        },
        {
          value: "3",
          label: "评论次数"
        },
        {
          value: "4",
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
      ]
    };
  },
  methods: {
    handleClick(tab, event) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("AddPages", this.ruleForm.url);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit() {
      this.$store.dispatch("searchByState", this.form.keywords);
    }
  }
};
</script>
<style lang="scss">
.about {
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
  .el-main {
    padding: 0;
    .flex-center {
      display: flex;
      justify-content: center;
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
        .tips {
          color: #c9302c;
          font-size: 9pt;
        }
      }
      .box-card {
        margin-bottom: 15px;
      }
      .display {
        .el-col {
          display: flex;
          label {
            min-width: 84px;
            line-height: 40px;
          }
        }
      }
      .item {
        .el-row {
          margin-bottom: 15px;
        }
      }
      .el-card {
        width: 100%;
        padding: 10px;
      }
      .brand {
        display: flex;
        .littleLogo {
          width: 30px;
          height: 30px;
          line-height: 30px;
          img {
            width: 100%;
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
    }
  }
}
</style>
