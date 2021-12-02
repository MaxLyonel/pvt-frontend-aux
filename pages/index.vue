<template>
<div fluid fill-height id="background-page">
  <login />
</div>

</template>
<script>
import Login from '@/components/auth/Login.vue'
export default {
  //auth: false,
  components: {
    Login
  }
}
</script>
<style>
#background-page {
  background: linear-gradient(to bottom, #0AADB3 0%, #0AADB3 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6ba872', endColorstr='#07540f', GradientType=0 );
}
</style>
