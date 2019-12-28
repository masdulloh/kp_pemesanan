<template>
    <div class="product">
        <h2>Product</h2>
        <router-link :to="{ name:'AddProduct' }"><button type="button" class="btn btn-success">+Add Product</button></router-link>
        <p>&nbsp;</p>


        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>

                <!-- Perulangan menampilkan product dari database -->
                <tr v-for="(product, index) in productdisplay" :key="index">
                    <td></td>
                    <td>{{ product.pname }}</td>
                    <td>{{ product.pprice }}</td>
                    <td></td>
                </tr>
                <!-- END -->

            </tbody>
        </table>


    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Products',
    data(){
        return{
            pneme: null,
            productdisplay:[],
            pprice: null
        }
    },
    created(){
        //view product
        db.collection('products')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    this.productdisplay.unshift({
                        pname: change.doc.data().pname,
                        pprice: change.doc.data().pprice
                    })
                }
            })
        })
    },

    // 
    mounted(){
        //munculkan user sekarang
        //console.log(firebase.auth().currentUser)
    }
}
</script>

<style>

</style>