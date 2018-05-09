<template>  
    <div>
       <!-- <div class="w3-bar w3-large navbar-color ">
            <a href="#" class="w3-bar-item w3-button w3-mobile">Lung cancer Detector</a>
            <a href="#" class="w3-bar-item w3-button w3-mobile"><span class="glyphicon glyphicon-home"></span> Home</a>
            <a href="home.html" class="w3-bar-item w3-button w3-mobile"> About us</a>
            <a href="#" class="w3-bar-item w3-button w3-blue w3-right w3-mobile"><span class="glyphicon glyphicon-log-in"></span> Log in</a>
        </div> -->
       <div class="w3-row " style="background-color:#36486b;min-height:900px" >
            <!-- <div class="w3-col l1">.</div> -->
            <div class="w3-col l7 w3-padding-xlarge" style="padding=20px">
                <!--background: url(image/index3.jpg) no-repeat;background-size: 40% auto; <center>-->
                <img src="../assets/image/index_bg.png" style="width:80%;height:auto;margin:auto 0 "> 
            </div>
            <div class="w3-col l5">
                <div style="padding:10vh">
                    <!-- Login from -->
                    <form class="w3-container w3-card-4" style="background-color:#4051B3"  @submit.prevent="validateBeforeSubmit">
                        <h2 class="w3-text-white">Sign in</h2>
                        <p>
                            <label class="w3-text-white"><b>E-mail</b></label>
                            <input class="w3-input w3-border" v-model.lazy="user.email" name="email" type="text" id="email"
                            v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('user.email') }">
                            <label v-show="errors.has('email')" style="color: white;font-size:small;">{{ errors.first('email') }}</label>
                        </p>
                        <p>
                            <label class="w3-text-white"><b>Password</b></label>
                            <input class="w3-input w3-border w3-text-black" v-model.lazy="user.password" name="password" type="password" id="password"
                            v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.password1') }">
                            <label v-show="errors.has('password')" style="color: white;font-size:small;">{{ errors.first('password') }}</label>
                        </p>
                        <p>
                            <button class="w3-btn w3-white w3-right w3-margin" >Ok</button>
                            <router-link to="/register"  class="w3-btn  w3-right w3-margin w3-text-black"  style="background-color:#b7d7e8">Register</router-link>
                            <!-- <a class="w3-btn  w3-right w3-margin w3-text-black" style="background-color:#FFB3B3" href="register.html">Register </a> -->
                        </p>
                    </form>
                    <!-- End login from -->
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    import firebase from 'firebase';
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);
    VeeValidate.Validator.extend('passphrase', {
            getMessage: field => 'Sorry dude, wrong pass phrase.',
            validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
        });
    export default {    
    name: 'Index',
    data(){
        return{
            user:{
                email:"",
                password:""
            }
        }
    },
    methods:{
        validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.signin();
                    }
                });
            },
            signin() {
                firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
                    user => {
                        alert('User authentication successful');
                        this.$router.push({
                            name: 'Home'
                        });
                    },
                    err => {
                        if (err.code === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else if (err.code === 'auth/user-not-found') {
                            alert('User not found!');
                        } else if (err.code === 'auth/invalid-email') {
                            alert('Invalid email');
                        } else {
                            alert('Oops. ' + err.message);
                        }
                    }
                ).catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        alert('Wrong password')
                    } else {
                        alert(error.message);
                    }
                }) 
            //    this.addUserInfo();

            //    this.$http.post('https://lndapi.herokuapp.com/signin', this.addUserInfo())
            //         .then(response => { 
            //             if(response.body.success)
            //             {
            //                 // alert('yeah.' + response.body.message);
            //                 if ('token' in response.body) {
            //                 this.$session.start()
            //                 this.$session.set('jwt', response.body.token)
            //                 this.$session.set('user',response.body.name);
            //                 Vue.http.headers.common['x-access-token'] = response.body.token;
            //                 this.go_Home();
            //                 }                               
            //             }else {
            //                alert('Oops.' + response.body.message);     
            //             }
            //         }, error => { 
            //                 console.log(error.message);
            //             }
            //         );
            },
            addUserInfo() {
                var newUser = {
                    email:this.user.email,
                    password:this.user.password
                }
                return newUser;
            },
            go_Home() {
                this.$router.push({
                    name: 'Home'
                });
            }
    },
    // beforeCreate: function () {
    //     if (this.$session.exists()) {
    //         this.go_Home();
    //     }
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style src="../assets/css/w3.css" />

</style>
<style src="../assets/css/custom.css" />

</style>