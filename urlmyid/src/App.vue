<template>
  <div id="app">
    
    <Navbar/>
    
    <router-view class="container"/>
  </div>
</template>

<script>
//impor navigation bar
import Navbar from '@/components/layout/navbar'
export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>



<style>

</style>
