<template>
  <div>
    <!--  布局-->
    <div>
      <!--header组件-->
      <Header/>
      <!--主体，弹性布局-->
      <div style="display: flex">
        <!--侧边栏-->
        <Aside/>
        <!--内容区域，这个部分通过路由来展示，这里路由到HomeView, flex: 1-->
        <!--这里路由的view默认是/-->
        <router-view style="flex: 1"/>
      </div>
    </div>

  </div>
</template>
<script>
//引入Header组件
import Header from "@/components/Header.vue";
//引入Aside
import Aside from "@/components/Aside.vue";
//导出Header组件，当前Vue组件的名字为Layout
export default {
  name: "Layout",
  components: {
    Header,
    Aside
  }
}
</script>
<style>

</style>
