<template>
    <div>
        <app-header></app-header>
        <div class="w3-row" style="padding-Top:30px;">
            <div class="w3-col m3 l3">
                <center>
                    <button class="w3-button w3-blue w3-round-large" data-toggle='modal' data-target='#uploadModal'> + UPLOAD</button>
                </center>
            </div>
            <div class="w3-col m8 l8" style="display: inline-block">
                <center>
                    <input class="search" type="text" v-model="text_filter" placeholder="Search..">
                </center>
            </div>
        </div>
        <!-- End Menu  bar-->

        <!-- Table -->
        <div class="container" style="margin-Top:10px;width:90%">
            <h1 style="text-align:center;padding:10px">History</h1>
            <table class="table table-bordered" id='data_table'>
                <thead>
                    <tr>
                        <th class="col-sm-1">Image</th>
                        <th class="col-sm-4">Patient's name</th>
                        <th class="col-sm-1">Gender</th>
                        <th class="col-sm-1">Age</th>
                        <th class="col-sm-2">Upload's Date</th>
                        <th class="col-sm-1">Prediction</th>
                        <th class="col-sm-2">Fact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="!haveData" >
                        <td colspan="7" style="text-align:center;">
                        History is empty.</td>
                    </tr>
                    <tr v-for="(person,index)  in filteredItems" :key="index">
                        <td align="center">
                            <div class="w3-container">
                                <button v-on:click="imageClicked(person)" class="w3-button w3-white"><span class="glyphicon glyphicon-search"></span></button>
                            </div>
                        </td>                        
                        <!-- <td style="display:none">{{person.id}}</td> -->
                        <td>{{person.name}}</td>
                        <td>{{person.gender}}</td>
                        <td>{{person.age}}</td>
                        <td>{{person.date}}</td>
                        <td>{{person.prediction}}</td>
                        <td>
                            <center>
                                <span v-if="person.stat"><p>{{person.fact}}</p>
                            <!-- <button class="w3-button w3-green w3-round" v-on:click="updateFact(index,0)"  style="height:20px;font-size:10;padding-Top:3">Edit</button></span> -->

                                </span>
                                <span v-else> <button class="w3-button w3-red w3-round tablebutton" v-on:click="updateFact(index,1)" >Yes</button>
                                <button class="w3-button w3-blue w3-round tablebutton" v-on:click="updateFact(index,0)"  >No</button></span>

                            </center>
                        </td>
                    </tr>
                </tbody>
            </table>            
        </div>
        <!-- End Table -->
        <!-- imageModal-->
        <div id="imageModal" class="modal fade" style="width:800px !important;margin:40px auto;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" data-dismiss="modal">&times;</span>
                    <h2 style="font-weight: 700;">{{modal_name}}
                        <span v-show="modal_stat" v-if="modal_result=='No'" class="tag w3-green w3-padding" style="font-size:medium;font-weight: 700;">don't have a nodule in lung</span>
                        <span v-show="modal_stat" v-if="modal_result=='Yes'" class="tag w3-red w3-padding" style="font-size:medium;font-weight: 700;">Have a nodule in lung</span>
                    </h2>
                </div>
                <div class="modal-body">
                    <center>
                        <img v-bind:src="modal_imgURL" style="width:700px">
                    </center>
                </div>
                <div class="modal-footer" style="height:10px">

                </div>
            </div>
        </div>
        <!--END imageModal-->

        <!-- uploadModal-->
        <div id="uploadModal" class="modal fade" style="width:800px !important;margin:40px auto;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" data-dismiss="modal" @click="resetUploadData()">&times;</span>
                    <h2>Upload Chest X-Ray image</h2>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="validateBeforeSubmit">
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="name">Patient's name</label>
                                <input v-model="u_name" type="text" name="u_name" placeholder="Patient's name.."
                                 v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('u_name') }">
                                <p v-show="errors.has('u_name')" style="color: red;font-size:small;">Patient's name is required</p>

                                <label for="gender">Gender</label>
                                <select name="u_gender" v-model="u_gender" placeholder="Patient's gender"
                                v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('u_gender') }">
                                  <option value="Female">Female</option>
                                  <option value="Male">Male</option>
                                </select>                                
                                <p v-show="errors.has('u_gender')" style="color: red;font-size:small;">Patient's gender is required</p>
                                
                                <label for="age">Age</label>
                                <input v-model="u_age" type="text" name="u_age" placeholder="Patient's age.."
                                v-validate="'required|numeric'"
                                :class="{'input': true, 'is-danger': errors.has('u_age') }">                                
                                <p v-show="errors.has('u_age')" style="color: red;font-size:small;">Patient's age is required and valid</p>
                                
                                <label for="uploadimg">Image: </label>
                                <p v-show="errors.has('imageUpload')" style="color: red;font-size:small;">Patient's age is required and valid</p>
                                
                                <input @change="previewFile" type="file" id="files" name="files[]" value="Upload image" accept="image/*" style="padding:20px"
                                v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('imageUpload') }">
                                
                                <!-- <div class="progress" style="margin-top:5px">
                                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="progress_value" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width:progress_value+'%'}">
                                        {{progress_value}}%
                                    </div>
                                </div> -->

                                <button class="w3-button w3-blue w3-right" style="width:100%">Submit</button>
                            </div>
                            <div class="col-sm-6">
                                <img v-bind:src="imageUpload" v-show="modal_stat" style="width:100%">
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer" style="height:10px">

                </div>
            </div>
        </div>
        <!--END uploadModal-->
        
    </div>
</template>

<script>
    import Header from './Header.vue';
    import firebase from 'firebase';
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);
    VeeValidate.Validator.extend('passphrase', {
            getMessage: field => 'Sorry dude, wrong pass phrase.',
            validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
        });
    let datenow = new Date();
    export default {
        name: 'Home',
        components: {
            appHeader: Header,
        },
        data(){
            return{
                text_filter:"",
                file_image:'',                
                imageUpload: '',

                progress_value: 0,
                haveData:0,
                
                modal_stat: 0,
                modal_imgURL: '',
                modal_name: 'Unknow',
                modal_result: '',

                u_id: '',
                u_name: '',
                u_age: '',
                u_date: '',
                u_gender: '',
                u_image: '',
                persons:[],                
            }
        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                this.$router.push('/')
            }
         },
         created(){
                this.fetchData();
            },
            methods: {
                validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.clickSubmit();
                    }
                });
                },fetchData() {
                    this.$http.get('https://lndapi.herokuapp.com/usertable',{
                            headers: {
                                'x-access-token': this.$session.get('jwt')
                            }
                        })
                        .then(response => {
                            if(response.body)
                                return response.json(); // return an a javascript object
                            else return null
                        })
                        .then(data => { // define what to do with the returned javascript object
                            const resultArray = [];
                            // console.log(data)
                            for (let key in data) {
                                resultArray.push(this.addKeyToData(data[key],key));
                                console.log('result '+this.addKeyToData(data[key],key))
                            }
                            this.persons = resultArray; // trigger Vue.js to update the DOM
                            if(this.persons.length>0) this.haveData=1;
                            else this.haveData=0;
                            // console.log(this.persons)
                            // this.editTable();                              
                            // $(document).ready(function(){
                            //     $('#data_table').DataTable();
                            // });
                        });
                },
                addKeyToData(data,key){
                    var person = {
                        id_data:key,
                        id : data.id,
                        name : data.name,
                        age : data.age,
                        date : data.date,
                        gender : data.gender,
                        imageURL : data.imageURL, 
                        prediction: data.prediction,
                        fact:data.fact,
                        stat:data.stat                        
                    }   
                    return person; 
                },
                imageClicked(item) {
                    this.modal_imgURL = item.imageURL;
                    this.modal_name = item.name;
                    this.modal_result = item.fact;
                    this.modal_stat = item.stat,
                        $("#imageModal").modal('show');
                },
                updateFact(item, value) {
                    let person = this.addKeyToData(this.persons[item],this.persons[item].id_data);
                    if (value == 1) {
                        person.fact="Yes";
                    } else {
                        person.fact="No";
                    }
                    person.stat=1;

                    this.$http.put('https://lndapi.herokuapp.com/editdata',person,{
                            headers: {
                                'x-access-token': this.$session.get('jwt')
                            }
                        })
                        .then(response => {
                            if(response.body.success) 
                            {
                                alert("sucsess!!");
                                if (value == 1) {
                                 this.persons[item].fact = "Yes";
                                } else {
                                    this.persons[item].fact = "No";
                                }
                                this.persons[item].stat = 1;
                            }else{
                                alert('Error! please upload data again')
                            }
                        })
                }, 
                clickSubmit() { 
                    var vm = this;
                    var file = this.file_image; 
                    var image_name=file.name    
                    var storageRef = firebase.storage().ref();
                    var LungImagesRef = storageRef.child('images_Lung/'+file.name);
                    var uploadTask = LungImagesRef.put(file);
                    var input = event.target;                        
                    var reader = new FileReader();
                    reader.onload = (event) => {
                        this.imageUpload = e.target.result;
                        // console.log(this.imageUpload)
                    }
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                    function(snapshot) {                
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        
                        console.log('Upload is ' + progress + '% done');

                        switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                        case 'storage/canceled':
                        // User canceled the upload
                        break;

                        case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                    }, function() {
                        // Upload completed successfully, now we can get the download URL
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        // console.log(downloadURL)
                        // var httpsReference = firebase.storage().refFromURL(downloadURL);
                        vm.imageUpload=downloadURL;
                        
                        // console.log(vm.imageUpload)
                        console.log(image_name)
                        vm.afterSubmit(downloadURL,image_name);
                    });
                                       
                },
                afterSubmit(image_url,image_name){
                    // console.log('test')
                    var vm = this;
                    var image_process= {
                        imageURL: image_url,
                        imageName: image_name 
                    }
                    console.log(image_process)
                    this.$http.post('http://127.0.0.1:5000/download',image_process)
                    .then(response=>{
                        console.log(response)
                        console.log(response.body.success)
                        if(response.body.success) 
                        {
                            var name=response.body.imageName
                            console.log(name)
                            // Create a reference to the file we want to download
                            var storageRef = firebase.storage().ref();
                            var starsRef = storageRef.child('test/'+name);

                            // Get the download URL
                            starsRef.getDownloadURL().then(function(url) {
                                vm.imageUpload=url
                                $('#uploadModal').modal('hide');
                                vm.uploadData();
                                vm.resetUploadData();
                            }).catch(function(error) {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/object_not_found':
                                    console.log(" File doesn't exist")
                                    break;

                                case 'storage/unauthorized':
                                    console.log("User doesn't have permission to access the object")
                                    break;

                                case 'storage/canceled':
                                    console.log("User canceled the upload")
                                    break;

                                case 'storage/unknown':
                                    console.log("Unknown error occurred, inspect the server response")
                                    break;
                            }
                            });
                            console.log("sucsess!!");
                            this.fetchData();
                            // this.persons.push(person)
                        }else{
                            alert('Error! please upload data again')
                        }
                    }),error=>{
                        alert('error!')
                    }
                    // $('#uploadModal').modal('hide');
                    // this.uploadData();
                    // this.resetUploadData();
                },   
                uploadData(){
                    var person=this.newData()
                //    console.log(person);
                   this.$http.post('https://lndapi.herokuapp.com/addtable', person,{
                            headers: {
                                'x-access-token': this.$session.get('jwt')
                            }
                        })
                    .then(response => {
                        if(response.body.success) 
                        {
                            console.log("sucsess!!");
                            this.fetchData();
                            // this.persons.push(person)
                        }else{
                            alert('Error! please upload data again')
                        }
                    }, error => { 
                            alert('Oops.' + errorMsg);                        
                    });
                },
                newData(){ 
                this.u_image=this.imageUpload;                   
                this.u_date=datenow.getDate()+'/'+datenow.getMonth()+'/'+datenow.getFullYear();
                var data = {                
                        id : this.u_id,
                        name : this.u_name,
                        age : this.u_age,
                        date : this.u_date,
                        gender : this.u_gender,
                        imageURL : this.u_image, 
                        prediction: '',
                        fact:'',
                        stat: 0

                    }
                    return data;
                },          
                resetUploadData(){                    
                    this.u_id= '',
                    this.u_name= '',
                    this.u_age= '',
                    this.u_date= '',
                    this.u_gender= '',
                    this.u_image= '',
                    this.imageUpload='',
                    this.modal_stat=0;    
                },
                sortedData: function() {
                    function compare(a, b) {
                        if (a.Date > b.Date)
                            return -1;
                        if (a.Date < b.Date)
                            return 1;
                        return 0;
                    }
                    return this.persons.sort(compare); //this.persons.sort(compare);
                },
                 previewFile(event){                    
                    var input = event.target;                    
                    if (input.files && input.files[0]) {
                       this.file_image=input.files[0];
                       console.log( this.file_image.name);
                        var reader = new FileReader();
                        
                        reader.onload = (e) => {                          
                            this.imageUpload = e.target.result;
                            this.modal_stat=1;
                        }
                       
                        reader.readAsDataURL(input.files[0]);
                    }
                 }            
                },
            computed: {
                filteredItems() {
                    let text=this.text_filter.toLowerCase().trim()
                    // console.log(this.sortedData())
                    return this.sortedData().filter(item => {
                        return item.name.toLowerCase().indexOf(text) > -1
                    })
                }
            }
    }
</script>

<style scoped>
input[type=text],
    select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type=submit] {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #45a049;
    }

    .search {
        width: 60%;
        height: 40px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        background-image: url("https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png");
        background-position: 5px 5px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        background-size: auto 25;
    }


    .tablebutton{
        height:25px;
        font-size:13px;
        padding-top:3px;
    }
    .tag {
        margin-left: 20px;
        padding: 0 10px 0 12px;
        background: #00DA2F;
        color: #fff;
        text-decoration: none;
        -moz-border-radius-bottomright: 4px;
        -webkit-border-bottom-right-radius: 4px;
        border-bottom-right-radius: 4px;
        -moz-border-radius-topright: 4px;
        -webkit-border-top-right-radius: 4px;
        border-top-right-radius: 4px;
    }

</style>

<style src="../assets/css/w3.css" />

</style>
<style src="../assets/css/custom.css" />

</style>