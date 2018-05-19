<template> 
       <div class="contianer"  style="background-color:#36486b">
           <div class="w3-bar w3-large navbar-color ">
            <a @click="go_home" class="w3-bar-item w3-button w3-mobile">Lung cancer Detector</a>
            <a @click="go_home" class="w3-bar-item w3-button w3-mobile"><span class="glyphicon glyphicon-home"></span> Home</a>
            <!-- <a href="home.html" class="w3-bar-item w3-button w3-mobile"> About us</a> -->
            <a @click="go_home" class="w3-bar-item w3-button w3-blue w3-right w3-mobile"><span class="glyphicon glyphicon-log-in"></span> Log in</a>
        </div>
        <div class="w3-card center 0" style='margin-top=20px'>
            <h1>Register</h1>

            <form style="width:80%; margin: 0 auto;" @submit.prevent="validateBeforeSubmit">

                 <div class="form-group" style="min-height:100px">
                   <label for="email">E-mail*</label>
                    <input type="text"  v-model="user.email" name="email" value="" placeholder="E-mail"
                    v-validate="'required|email'"
                    :class="'form-control '+{'input': true, 'is-danger': errors.has('user.email') }">
                    <label v-show="errors.has('email')" style="color: red;font-size:small;">{{ errors.first('email') }}</label>
                </div>
                
                <div class="form-group half" style="min-height:100px">
                   <label for="password">Password*</label>
                    <input type="password" v-model="user.password" name="password" value="" placeholder="Choose your password"
                    v-validate="'required'" :class="'form-control '+{'input': true, 'is-danger': errors.has('user.password1') }"> 
                </div>

                <!-- <p class="half">
                    <label for="password">Password </label>
                    <input type="password" v-model="user.password" name="password" value="" placeholder="Choose your password"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.password1') }">                    
                </p> -->
                <div class="form-group half last" style="min-height:100px">
                    <label for="cpassword">Re-password*</label>
                    <input type="password"  v-model="user.cpassword" name="cpassword" value="" placeholder="Confirm password"
                    v-validate="'required|confirmed:password'" :class="'form-control '+{'input': true, 'is-danger': errors.has('user.cpassword') }" data-vv-as="password">
                 <p>
                    <label v-show="errors.has('cpassword')" style="color: red;font-size:small;">{{ errors.first('cpassword') }}</label>    
                </p> 
                </div>
                

                <!-- <p class="half last">
                    <label for="cpassword">Re-password</label>
                    <input type="password"  v-model="user.cpassword" name="cpassword" value="" placeholder="Confirm password"
                    v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger': errors.has('user.cpassword') }" data-vv-as="password">
                     
                </p> -->
                <div class="form-group half" style="min-height:100px">
                    <label for="fname">First Name*</label>
                    <input type="text"  v-model="user.fname" name="fname" value="" placeholder="First Name"
                    v-validate="'required'" :class="'form-control '+{'input': true, 'is-danger': errors.has('user.fname') }">
                     <label v-show="errors.has('fname')" style="color: red;font-size:small;">First name is required.</label>
                </div>
                <div class="form-group half last" style="min-height:100px">
                    <label for="lname">Last Name*</label>
                    <input type="text" v-model="user.lname" name="lname" value="" placeholder="Last Name"
                    v-validate="'required'" :class="'form-control '+{'input': true, 'is-danger': errors.has('user.lname') }">
                     <label v-show="errors.has('lname')" style="color: red;font-size:small;">Last name is required.</label>
                </div>

                <!-- <p class="half">
                    <label for="fname">First Name</label>
                    <input type="text"  v-model="user.fname" name="fname" value="" placeholder="First Name"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.fname') }">
                     <label v-show="errors.has('fname')" style="color: red;font-size:small;">First name is required.</label>
                </p>
                <p class="half last">
                    <label for="lname">Last Name</label>
                    <input type="text" v-model="user.lname" name="lname" value="" placeholder="Last Name"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.lname') }">
                     <label v-show="errors.has('lname')" style="color: red;font-size:small;">Last name is required.</label>
                </p> -->
                  
                <div class="form-group" style="min-height:100px">
                    <label for="gender">Gender</label>
                    <select v-model="user.gender"
                     v-validate="'required'" :class="'form-control '+{'input': true, 'is-danger': errors.has('user.lname') }">
                    <option disabled="" selected="" value="none" name="gender">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                    <label v-show="errors.has('gender')" style="color: red;font-size:small;">Gender is required.</label>
                </div>
                <!-- <p>
                    <label for="idcard">ID Card number</label>
                    <input type="text"  v-model="user.idcard" name="idcard" value="" placeholder="ID Card number"
                    v-validate="'required|numeric|min:13|max:13'" :class="{'input': true, 'is-danger': errors.has('user.idcard') }">
                    <label v-show="errors.has('idcard')" style="color: red;font-size:small;">{{ errors.first('idcard') }}</label>
                </p> -->

                <div class="form-group">
                     <label for="department">Department</label>
                    <input class="form-control" type="text" v-model="user.department"  name="department" value="" placeholder="department">
                </div>
                <!-- <p>
                    <label for="department">Department</label>
                    <input type="text" v-model="user.department"  name="department" value="" placeholder="department">
                </p> -->

                <!-- <p>
                    <label for="pid">Certificate of Medical Profession</label>
                    <input type="text" v-model="user.pid"  name="pid" value="" placeholder="เลขที่ใบประกอบวิชาชีพเวชกรรม"
                     v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.pid') }">
                     <label v-show="errors.has('pid')" style="color: red;font-size:small;">Certificate of Medical Profession is required.</label>
                </p> --> 
                                    
                <div class="form-group" style="min-height:95px">
                    <label for="hospital">เลือกโรงพยาบาล</label>
                    <select class="form-control">
                            <option disabled="" selected="" value="0" name="hospital">Choose your Hospital</option>
                            <option value="1">โรงพยาบาลศิริราช</option>
                            <option value="2">โรงพยาบาลมหาราชนครเชียงใหม่ </option>
                            <option value="3">อื่น ๆ</option>
                        </select>
                </div>
                <!-- <p><input type="checkbox" name="remember">I agree with terms and conditions.</p>
                    <p><input type="checkbox" name="remember">I want to recive the news and offers.</p> -->
                    <p><button class="w3-button w3-blue w3-right w3-padding">Submit</button></p>
                
            </form>
        </div>
    </div> 
</template>

<script>

    import firebase from 'firebase';
    import {db} from '@/firebaseConfig'
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);
    VeeValidate.Validator.extend('passphrase', {
            getMessage: field => 'Sorry dude, wrong pass phrase.',
            validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
    });
    require('bootstrap')
    var md5 = require('md5');
    export default {
        name: 'Register',
        data(){
            return {
                user:{
                    fname:'',
                    lname:'',
                    email:'',
                    password:'',
                    cpassword:'',
                    idcard:'',
                    gender:'',
                    department:'',
                    pid:'',
                    hospital:'',    
                    table:''                
                }
            }
        },
        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.signup();
                    }
                });
            },
            signup() {                 
                firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then( 
                user => {
                    var newUser = this.addUserInfo()
                    var user = firebase.auth().currentUser; 
                    var uid = user.uid;
                    db.ref('users/'+ uid).set(newUser)
                    alert('Your accound has been created!')               
                    this.$router.push('/home')
                }, 
                error => {
                        var errorCode = error.code
                        var errorMsg = error.message
                        if (errorCode == 'auth/weak-password') {
                                alert('The password is too week');
                        } else {
                                alert('Oops.' + errorMsg);
                        }
                    }
                );         
            },
            addUserInfo() {
                var newUser = {
                    fname:this.user.fname,
                    lname:this.user.lname,
                    email:this.user.email,
                    password:this.user.password, 
                    idcard:this.user.idcard,
                    gender:this.user.gender,
                    department:this.user.department,
                    pid:this.user.pid,
                    hospital:this.user.hospital, 
                    table:this.user.table
                }
                return newUser
                // var uid = md5(this.user.email);
                // console.log(uid);
                // var Ref = firebase.database().ref("users/");
                // db.ref('users/' + uid).set(newUser);
            },
            go_home(){
                this.$router.push({
                    name: 'Home'
                });
            }            
        }
    }
</script>

<style scoped>
    
        .half {
            float: left;
            width: 48%;
            margin-right: 4%
        }
        
        .half.last {
            margin-right: 0%;
        }
        
        p {
            font-size: 14px;
            padding: 5px
        }
        
        h1 {
            text-align: center;
            padding: 10px;
            color: #0070f9;
            font-weight: 700;
        }
        .center{
            background-color:#FFFFFF; 
            width:70%;
            margin:auto; 
            padding:20px 0 50px 0px;
        }
</style>

<style src="../assets/css/w3.css" />

</style>
<style src="../assets/css/custom.css" />

</style> 