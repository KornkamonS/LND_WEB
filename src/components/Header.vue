<template>
    <div>
        <div class="w3-bar navbar-color w3-large">
            <a  class="w3-bar-item w3-button w3-mobile">Lung cancer Detector</a>
            <a  class="w3-bar-item w3-button w3-mobile">Home</a>
            <!-- <a href="#" class="w3-bar-item w3-button w3-mobile">About us</a> -->
            <div class="w3-dropdown-hover w3-blue w3-right w3-mobile">
                <button class="w3-button"><span class="glyphicon glyphicon-user"></span> {{user_name}}<span class="caret" style ="margin-left:10px"></span>  </button>
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
    export default {
        name: 'Header',
        data(){
            return{
                user_name: this.$session.get('user')
            }
        },
        methods:{
             logout: function () {
            this.$session.destroy()
            this.$router.push('/')
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