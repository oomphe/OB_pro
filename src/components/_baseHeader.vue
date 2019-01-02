<template>
  <el-row id="base_header">
    <el-col :span="24" class="logo"><img src="~image/logo.png" alt=""></el-col>
  </el-row>
</template>
<script>
export default {
  name: "baseHeader",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.logo{
  img{
    display: block;
    height: auto;
  }
}
</style>
