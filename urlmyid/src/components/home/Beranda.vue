<template>
    <div class="beranda">
        <h2>Beranda</h2>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Beranda',
    data(){
        return{

        }
    },
    mounted(){
        console.log(firebase.auth().currentUser)
    }
}
</script>

<style>

</style>