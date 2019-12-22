<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <router-link :to="{ name: 'Beranda' }" class="navbar-brand" href="#">URL.MY.ID</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item" v-if="user">
                <router-link :to="{ name: 'Beranda' }" class="nav-link">Home</router-link>
            </li>

            <li class="nav-item" v-if="user">
                <router-link :to="{ name: 'Products' }" class="nav-link">Products</router-link>
            </li>
            <li class="nav-item" v-if="user">
                <router-link :to="{ name: 'Orders' }" class="nav-link">Orders</router-link>
            </li>

            </ul>

            <form class="form-inline my-2 my-lg-0">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <!-- jika user null maka akan muncul, v-if="!user" -->
                    <li class="nav-item" v-if="!user">
                        <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!user">
                        <router-link :to="{ name: 'Signup' }" class="nav-link">SignUp</router-link>
                    </li>
                    <li class="nav-item" v-if="user">
                        <a class="nav-link">{{ user.email }}</a>
                    </li>
                    <li class="nav-item" v-if="user">
                        <button class="btn btn-outline-success my-2 my-sm-0" @click="logout">Logot</button>
                    </li>
                </ul>
                <!--button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button-->
            </form>
        </div>
    </div>
    </nav>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data(){
        return{
            user: null
        }
    },
    //jika di klik logout maka akan keluar
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        }
    },
    created(){
        //let user = firebase.auth().currentUser
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.user = user
            } else {
                this.user = null
            }
        })
    }
}
</script>