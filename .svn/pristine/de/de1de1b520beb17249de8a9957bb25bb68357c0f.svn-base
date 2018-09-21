<template>
  <div id="app">
    <!-- <Layout style="height:100%;">
        <Sider hide-trigger >Sider</Sider>
        <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    </Layout> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      
    }
  },
  mounted(){
    let token=getCookie('token');
    if(token=="" || token==undefined || token==null){
      this.$router.push({ path: "/login" });
    }

  }
};
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}
</style>
