<template> 
       <div class="contianer"  style="background-color:#DDDCDC">
        <div class="w3-card center">
            <h1>Register</h1>

            <form style="width:80%; margin: 0 auto;" @submit.prevent="validateBeforeSubmit">

                <p>
                    <label for="email">E-mail</label>
                    <input type="text"  v-model="user.email" name="email" value="" placeholder="E-mail"
                    v-validate="'required|email'"
                    :class="{'input': true, 'is-danger': errors.has('user.email') }">
                    <label v-show="errors.has('email')" style="color: red;font-size:small;">{{ errors.first('email') }}</label>
                </p>

                <p class="half">
                    <label for="password">Password </label>
                    <input type="password" v-model="user.password" name="password" value="" placeholder="Choose your password"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.password1') }">                    
                </p>


                <p class="half last">
                    <label for="cpassword">Re-password</label>
                    <input type="password"  v-model="user.cpassword" name="cpassword" value="" placeholder="Confirm password"
                    v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger': errors.has('user.cpassword') }" data-vv-as="password">
                     
                </p>
                <p>
                    <label v-show="errors.has('cpassword')" style="color: red;font-size:small;">{{ errors.first('cpassword') }}</label>    
                </p>
                <p class="half">
                    <label for="fname">First Name</label>
                    <input type="text"  v-model="user.fname" name="fname" value="" placeholder="First Name"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.fname') }">
                     <label v-show="errors.has('fname')" style="color: red;font-size:small;">First name is required.</label>
                </p>
                <p class="half last">
                    <label for="lname">Last Name</label>
                    <input type="text"v-model="user.lname" name="lname" value="" placeholder="Last Name"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.lname') }">
                     <label v-show="errors.has('lname')" style="color: red;font-size:small;">Last name is required.</label>
                </p>

                <p>
                    <label for="gender">Gender</label>
                    <select v-model="user.gender"
                     v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.lname') }">
                    <option disabled="" selected="" value="0" name="gender">Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    </select>
                    <label v-show="errors.has('gender')" style="color: red;font-size:small;">Gender is required.</label>
                </p>
                <p>
                    <label for="idcard">ID Card number</label>
                    <input type="text"  v-model="user.idcard" name="idcard" value="" placeholder="ID Card number"
                    v-validate="'required|numeric|min:13|max:13'" :class="{'input': true, 'is-danger': errors.has('user.idcard') }">
                    <label v-show="errors.has('idcard')" style="color: red;font-size:small;">{{ errors.first('idcard') }}</label>
                </p>
                <p>
                    <label for="department">Department</label>
                    <input type="text"v-model="user.department"  name="department" value="" placeholder="department">
                </p>

                <p>
                    <label for="pid">Certificate of Medical Profession</label>
                    <input type="text" v-model="user.pid"  name="pid" value="" placeholder="เลขที่ใบประกอบวิชาชีพเวชกรรม"
                     v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.pid') }">
                     <label v-show="errors.has('pid')" style="color: red;font-size:small;">Certificate of Medical Profession is required.</label>
                </p>

                <p>
                    <label for="hospital">เลือกโรงพยาบาล</label>
                    <select>
                            <option disabled="" selected="" value="0" name="hospital">Choose your Hospital</option>
                            <option value="1">โรงพยาบาลศิริราช</option>
                            <option value="2">โรงพยาบาลมหาราชนครเชียงใหม่ </option>
                            <option value="3">อื่น ๆ</option>
                        </select>
                </p>
                <!-- <p><input type="checkbox" name="remember">I agree with terms and conditions.</p>
                    <p><input type="checkbox" name="remember">I want to recive the news and offers.</p> -->
                    <p><button class="w3-button w3-blue w3-right w3-padding">Submit</button></p>
                
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
VeeValidate.Validator.extend('passphrase', {
        getMessage: field => 'Sorry dude, wrong pass phrase.',
        validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
    });
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
                    hospital:''                    
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
            //   console.log(this.addUserInfo());
               this.$http.post('https://lndapi.herokuapp.com/signup', this.addUserInfo())
                    .then(response => { 
                        alert(response.body.message)
                        if ('token' in response.body) {
                            this.$session.start()
                            this.$session.set('jwt', response.body.token);
                            this.$session.set('user',response.body.name);
                            // Vue.http.headers.common['x-access-token'] = response.body.token;
                            this.go_Home();
                        }
                    }, error => { 
                        var errorCode = error.code;
                        var errorMsg = error.message;
                        if (errorCode == 'auth/weak-password') {
                            alert('The password is too week');
                        } else {
                            alert('Oops.' + errorMsg);
                        }
                    });
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
                    hospital:this.user.hospital 
                }
                return newUser;
            },
            go_Home() {
                this.$router.push({
                    name: 'Home'
                });
            }
        },
        beforeCreate: function () {
            if (this.$session.exists()) {
                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped>
    input[type="text"],
        input[type="password"],
        select {
            background-color: #faf9f8;
            padding-left: 10px;
            width: 100%;
            border: 1px solid #b2b2b2;
            height: 6%;
            color: #757575;
        }
        
        input[type=text]:focus,
        input[type=password]:focus {
            -webkit-box-shadow: 1px 1px 5px 2px #94BBFF;
            box-shadow: 1px 1px 5px 2px #94BBFF;
        }
        
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