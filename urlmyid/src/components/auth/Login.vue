<template>
    <div class="signin container">
        
        <form class="border border-light p-5" @submit.prevent="login">

            <p class="h4 mb-4 text-center">Login</p>

            <p class="red" v-if="feedback">{{ feedback }}</p>

            <label for="emailInput">Email</label>
            <input type="email" id="emailInput" class="form-control mb-4" placeholder="Email" v-model="email">

            <label for="passwdInput">Password</label>
            <input type="password" id="passwdInput" class="form-control mb-4" placeholder="Password" v-model="password">

            <button class="btn btn-info my-4 btn-block" type="submit">LOGIN</button>

            <div class="text-center">
                
                <hr>

                <p>By clicking
                    <em>Sign up</em> you agree to our
                    <a href="" target="_blank">terms of service</a> and
                    <a href="" target="_blank">terms of service</a>.
                </p>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data(){
        return {
           email: null,
           password: null,
           feedback: null 
        }
    },
    methods: {
        login(){
            if (this.email && this.password){
                console.log(this.email, this.password)
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log(user)
                    //setelah user berhasil login diarahkan ke beranda
                    this.$router.push({ name: 'Beranda' })
                }).catch( err => {
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = 'Please fill in both fields'
            }
        }
    }
}
</script>