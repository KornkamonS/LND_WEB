<template>
    <div>
        <div class="w3-bar navbar-color w3-large w3-card">
            <a  class="w3-bar-item w3-button w3-mobile">Lung cancer Detector</a>
            <a  class="w3-bar-item w3-button w3-mobile">Home</a>
            <!-- <a href="#" class="w3-bar-item w3-button w3-mobile">About us</a> -->
            <div class="w3-dropdown-hover w3-indigo w3-right w3-mobile">
                <button class="w3-button"><span class="glyphicon glyphicon-user"></span> {{user_current.fname}}<span class="caret" style ="margin-left:10px"></span>  </button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4" style="right:0">
                    <!-- <a href="#" class="w3-bar-item w3-button">Edit Profile</a>
                    <a href="#" class="w3-bar-item w3-button">Change Password</a>
                    <a href="#" class="w3-bar-item w3-button">Report Problem</a> -->
                    <a @click="logout" class="w3-bar-item w3-button">Log out</a>
                </div>
            </div>
        </div>
        <!-- <div class="w3-bar w3-large navbar-color ">
            <a href="#" class="w3-bar-item w3-button w3-mobile">Lung cancer Detector</a>
            <a href="#" class="w3-bar-item w3-button w3-mobile"><span class="glyphicon glyphicon-home"></span> Home</a>
            <a href="home.html" class="w3-bar-item w3-button w3-mobile"> About us</a>
            <a href="#" class="w3-bar-item w3-button w3-blue w3-right w3-mobile"><span class="glyphicon glyphicon-log-in"></span> Log in</a>
        </div> -->
    </div>
</template>

<script>
    import firebase from 'firebase';
    import {
        db
    } from '@/firebaseConfig'
    var md5 = require('md5');
    export default {
        name: 'Header',
        data(){
            return{
                user_current:{
                    fname:'',
                    lname:'',
                    email:'',
                    idcard:'',
                    gender:'',
                    department:'',
                    pid:'',
                    hospital:''         
                } 
            }
        },
        created(){
            var user = firebase.auth().currentUser;
            if(user){
                console.log(user)
                // this.user.photoURL = user.photoURL;
                this.user_current.userId = user.uid;
                this.user_current.email = user.email;
                // var uid = md5(user.email); 
                db.ref('users/' + user.uid).once('value').then(
                snapshot => {
                    if (snapshot) {
                    console.log(snapshot);
                    this.user_current.fname = snapshot.val().fname;
                    this.user_current.lname = snapshot.val().lname;
                    this.user_current.idcard = snapshot.val().idcard;
                    this.user_current.gender=snapshot.val().gender;
                    this.user_current.department=snapshot.val().department;
                    this.user_current.pid=snapshot.val().pid;
                    this.user_current.hospital=snapshot.val().hospital;
                    }
                });
            }
        },
        methods:{
            logout: function () {
            firebase.auth().signOut().then(() => {
                    this.$router.push({
                        name: 'Index'
                    });
                }) 
            },
        }
    }
</script>

<style scoped>

</style>

<style src="../assets/css/w3.css" />

</style>
<style src="../assets/css/custom.css" />

</style>