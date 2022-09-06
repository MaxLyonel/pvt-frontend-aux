<template>
    <div>
      <MainAffiliate :affiliate_id="$route.params.id"></MainAffiliate>
      </div>
</template>

<script>
import MainAffiliate from '@/components/affiliate/MainAffiliate.vue';
export default {
  data: () => ({
    affiliate_id : null
  })
  ,
  name: "PageListAffiliate",
  components: {
    MainAffiliate
  },
 created(){
    console.log(this.$route.params)
  },
};
</script>
