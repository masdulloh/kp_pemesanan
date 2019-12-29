<template>
    <div class="product">
        <h2>Product</h2>
        <router-link :to="{ name:'AddProduct' }"><button type="button" class="btn btn-success">+Add Product</button></router-link>
        <p>&nbsp;</p>


        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Last</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

                <!-- Perulangan menampilkan product dari database -->
                <tr v-for="(product, index) in productdisplay" :key="index">
                    <td><img :src=product.pimage alt="" width="150"></td>
                    <td>{{ product.pname }}</td>
                    <td>{{ product.pprice }}</td>
                    <td>
                        <button @click="editProduct(product.idprod)" type="button" class="btn btn-success">Edit</button>
                        <button @click="deleteProduct(product.idprod, index)" type="button" class="btn btn-danger">Delete</button>
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
            pname: null,
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
                        pimage: change.doc.data().pimage,
                        idprod: change.doc.id
                    })
                }if(change.type == 'removed'){
                    this.productdisplay.$forceupdate()
                }
            })
        })
    },
    methods:{
        editProduct(id){
            //TODO
            this.$router.push({ name: 'EditProduct', params: {id: id } })
        },

        deleteProduct(doc,index){

            //productdisplay= this.productdisplay
            if (confirm('Are you sure ?')) {
                console.log(doc)
                db.collection('products').doc(doc).delete()
                .then(function() {
                    console.log("berhasil di delete", index)
                    //this.$delete(this.productdisplay, index)
                    //const filteredItems = this.productdisplay.slice(0, index).concat(this.productdisplay.slice(index + 1, this.productdisplay.length))
                }).catch(function(error){
                    console.log(error)
                })
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