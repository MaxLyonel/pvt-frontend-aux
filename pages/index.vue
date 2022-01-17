<template>
<div id="background-page">
  <Login />
</div>

</template>
<script>
import Login from '@/components/auth/Login.vue'
export default {
  name: "PageLogin",
  //auth: false,
  components: {
    Login
  }
}
</script>
<style>
#background-page {
  background: #0AADB3;
  width: 100%;
	height: 100%;
}
</style>
