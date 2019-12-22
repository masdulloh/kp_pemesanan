<template>
    <div class="product">
        <h2>Product</h2>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Products',
    data(){
        return{

        }
    },
    mounted(){
        //munculkan user sekarang
        //console.log(firebase.auth().currentUser)
    }
}
</script>

<style>

</style>