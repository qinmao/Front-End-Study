<template>
  <div>
    <!--年龄: {{this.$store.state.age}} 姓名是: {{this.$store.state.name}}-->
    年龄: {{this.$store.getters.getAge}} 姓名是: {{this.$store.getters.getName}}
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // this.$store.state.age = 80; //不推荐使用

    // 不支持异步
    //  this.$store.commit('changeName', {
    //     name: '猪八戒',
    //     age: 88
    // })

    // 建议完整的提交方式支持异步
    this.$store.dispatch("changeNameByAction", {
      name: "我是dispatch的参数",
      age: 18
    });
  }
};
</script>
<style>
</style>
