<template>
    <div class="addproduct">
        <h2>Add Product</h2>
<!-- KODE INPUTAN FORM -->
        


        
<!-- __________________ end kode inputan form -->
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