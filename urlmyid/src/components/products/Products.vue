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
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

                <!-- Perulangan menampilkan product dari database -->
                <tr v-for="(product, index) in productdisplay" :key="index">
                    <td></td>
                    <td>{{ product.pname }}</td>
                    <td>{{ product.pprice }}</td>
                    <td>
                        <button @click="editProduct(product.idprod)" type="button" class="btn btn-success">Edit</button>
                        <button @click="deleteProduct(product.idprod)" type="button" class="btn btn-danger">Delete</button>
                    </td>
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
            pprice: null,
            idprod: null
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
                        pprice: change.doc.data().pprice,
                        idprod: change.doc.id
                    })
                }if(change.type == 'removed'){
                    this.productdisplay.shift({
                        pname: change.doc.data().pname,
                        pprice: change.doc.data().pprice,
                        idprod: change.doc.id
                    })
                }
            })
        })
    },
    methods:{
        editProduct(){
            //TODO
        },

        deleteProduct(doc){
            //TODO
            if (confirm('Are you sure ?')) {
                console.log(doc)
                db.collection('products').doc(doc).delete()
                .then(function() {
                    console.log("berhasil di delete")
                }).catch(function(error){
                    console.log(error)
                })
                /*Toast.fire({
                    type: 'success',
                    title: 'Deleted  successfully'
                })*/
            }

        }
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