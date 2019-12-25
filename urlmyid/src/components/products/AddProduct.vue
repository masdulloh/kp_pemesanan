<template>
    <div class="addproduct">
        <h2>Add Product</h2>
<!-- KODE INPUTAN FORM -->
        

<form @submit.prevent="addProduct">
  <div class="form-group">
    <label for="text">Product Name</label> 
    <input id="text" name="text" type="text" required="required" class="form-control" v-model="pname">
  </div>
  <div class="form-group">
    <label for="text4">Link</label> 
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text">url.my.id/buy/</div>
      </div> 
      <input id="text4" name="text4" type="text" class="form-control" v-model="plink">
    </div>
  </div>
  <div class="form-group">
    <label for="text1">Price</label> 
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text">Rp</div>
      </div> 
      <input id="text1" name="text1" type="text" required="required" class="form-control" v-model="pprice">
    </div>
  </div>
  <div class="form-group">
    <label for="text2">COGS</label> 
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text">Rp</div>
      </div> 
      <input id="text2" name="text2" type="text" class="form-control" required="required" v-model="pcogs">
    </div>
  </div>
  <div class="form-group">
    <label for="text3">Weight</label> 
    <div class="input-group">
      <input id="text3" name="text3" type="text" required="required" class="form-control" v-model="pweight"> 
      <div class="input-group-append">
        <div class="input-group-text">Gram</div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="select">Province</label> 
    <div>
      <select id="select" name="select" class="custom-select" required="required" v-model="pprovince">
        <option value="fish" >1</option>
      </select>
    </div>
  </div>
  <div class="form-group">
    <label for="select1">City</label> 
    <div>
      <select id="select1" name="select1" class="custom-select" v-model="pcity">
        <option value="rabbit">Rabbit</option>
      </select>
    </div>
  </div>
  <div class="form-group">
    <label for="select2">Subdistrict</label> 
    <div>
      <select id="select2" name="select2" class="custom-select" v-model="psubdistrict">
        <option value="rabbit">Rabbit</option>
        <option value="duck">Duck</option>
        <option value="fish">Fish</option>
      </select>
    </div>
  </div> 
  <div class="form-group">
      <p v-if="feedback" class="danger">{{ feedback }}</p>
    <button name="submit" type="submit" class="btn btn-primary">Save</button>
  </div>
</form>

        
<!-- __________________ end kode inputan form -->
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'


export default {
    name: 'Products',
    data(){
      return{
        profile:null,
        user:null,

        pname:null,
        plink:null,
        pprice:null,
        pcogs:null,
        pweight:null,
        plocation: null,
        pprovince: null,
        pcity: null,
        psubdistrict: null,

        feedback: null,
        slug: null
      }
    },
    created(){
      
      let ref = db.collection('users')

      //get current user
      ref.where('user_id','==', firebase.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data(),
          this.user.id = doc.id
        })
      })

      //profile data
      ref.doc(this.$route.params.id).get()
      .then(user => {
        this.profile = user.data()
      })
      
    },
    methods:{
        addProduct(){
            if(this.pname && this.plink && this.pweight && this.pprovince && this.pcity && this.psubdistrict){
              this.slug = slugify(this.plink,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })


              //let ref2 = db.collection('products').doc(this.plink)
              //plink=this.plink
              this.feedback=null
              let data = {
                pname: this.pname,
                pprice: this.pprice,
                pcogs: this.pcogs,
                pweight: this.pweight,
                ploc: {
                  province: this.pprovince,
                  city: this.pcity,
                  subdistrict: this.psubdistrict,
                },
                pcreatby: this.user.id
              }

              db.collection('products').doc(this.slug).set(data)
              .then(() => {
                this.$router.push({ name: 'Products' })
              }).catch(err => {
                console.log(err)
                this.feedback=err.message
              })

              
            } else {
                this.feedback="You must enter all form"
            }
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