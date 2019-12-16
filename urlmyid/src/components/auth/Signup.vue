<template>
    <div class="signup container">
        <form class="border border-light p-5" @submit.prevent="signup">

            <p class="h4 mb-4 text-center">Sign up</p>

            <p class="red" v-if="feedback">{{ feedback }}</p>
            <label for="textInput">Username</label>
            <input type="text" id="textInput" class="form-control mb-4" placeholder="Username" v-model="username">

            <label for="emailInput">Email</label>
            <input type="email" id="emailInput" class="form-control mb-4" placeholder="Email" v-model="email">

            <label for="passwdInput">Password</label>
            <input type="password" id="passwdInput" class="form-control mb-4" placeholder="Password" v-model="password">

            <button class="btn btn-info my-4 btn-block" type="submit">Sign up</button>

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
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data(){
        return {
            username: null,
            email: null,
            password: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signup(){
            //memperbaiki inputan username
            if(this.username && this.email && this.password){
                this.slug = slugify(this.username,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // menyimpan data ke firestore koleksi
                let ref = db.collection('users').doc(this.slug)

                // cek apakah username sudah ada atau belom
                ref.get().then(doc =>{
                    if(doc.exists){
                        this.feedback = 'Username sudah ada'
                    }
                    
                    else {
                        var iki = this; //dikasih ini ga error wkwk
                        // simpan
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(function (userCreds) {
                            //console.log('uid',userCreds.user.uid)
                            ref.set({
                                username: iki.username,
                                user_id: userCreds.user.uid
                            })
                        }).then(() =>{
                            this.$router.push({ name: 'Beranda' })
                        })

                        .catch(err => {
                            console.log(err)
                            this.feedback=err.message
                        })

                        this.feedback = 'username siap digunakan'
                    }
                })
                console.log(this.slug)
            } else {
                this.feedback= "Semua form harus terisi"
            }
        }
    }
}
</script>

<style>

</style>