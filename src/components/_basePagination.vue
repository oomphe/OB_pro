<template>
  <div class="base_pagination" v-if="totalnum!==0">
    <el-pagination
      style="text-align: end"
      :current-page.sync="curPage"
      @current-change="handleCurrentChange"
      background
      :page-size="curPageSize"
      layout="prev, pager, next"
      :total="totalnum"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "base_pagination",
  props: {
    totalnum: Number
  },
  data() {
    return {
      curPage: 1,
      curPageSize: 20
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.curPage = val;
      this.$emit("pageChange", this.curPage);
    }
  }
};
</script>