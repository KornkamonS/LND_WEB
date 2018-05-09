<template>
    <div>
        <app-header></app-header>
        <div class="w3-row" style="padding-Top:30px;">
            <div class="w3-col m3 l3 w3-center">                 
                   <button class="w3-btn w3-indigo w3-round-large w3-xlarge" style="font-size:18px!important; " data-toggle='modal' data-target='#uploadModal'><i class="w3-margin-right material-icons">file_upload</i>Upload</button>                
                 
            </div>
            <div class="w3-col m8 l8" style="display: inline-block">
                <center>
                    <input class="search" type="text" v-model="text_filter" placeholder="Search..">
                </center>
            </div>
        </div>
        <!-- End Menu  bar-->

        <!-- Table -->
        <div class="container w3-responsive" style="margin-Top:10px;width:90%;min-height:500px;max-height:800px">
            <h1 style="text-align:center;padding:10px">History</h1>
            <table class="table table-bordered w3-centered w3-card" id='data_table'>
                <thead>
                    <tr class="w3-indigo">
                        <th class="col-sm-1">Image</th>
                        <th class="col-sm-4">Patient's name</th>
                        <th class="col-sm-1">Gender</th>
                        <th class="col-sm-1">Age</th>
                        <th class="col-sm-2">Upload's Date</th>
                        <th class="col-sm-1">Prediction</th>
                        <th class="col-sm-1">Medical diagnosis</th>
                        <th class="col-sm-1">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="!haveData" >
                        <td colspan="8" style="text-align:center;">
                        History is empty.</td>
                    </tr>
                    <tr v-for="(person,index)  in filteredItems" :key="index">
                        <td align="center">
                            <div class="w3-container">
                                <button v-on:click="imageClicked(person,index)" class="w3-button w3-white"><span class="glyphicon glyphicon-picture"></span></button>
                            </div>
                        </td>                        
                        <!-- <td style="display:none">{{person.id}}</td> -->
                        <td style="text-align: left; padding:10px">{{person.name}}</td>
                        <td>{{person.gender}}</td>
                        <td>{{person.age}}</td>
                        <td>{{person.date}}</td>
                        <td>
                            <!-- {{person.prediction}} -->
                             <span v-if="person.prediction=='Yes'">
                                         <p data-toggle="tooltip-Yes-pre" title="Has nodule">{{person.prediction}}</p>
                                     </span>                                     
                                    <span v-else> 
                                        <p data-toggle="tooltip-No-pre" title="Don't Has Nodule" >{{person.prediction}}</p></span>                                     
                                    
                        </td>
                        <td>
                            <center>
                                <span v-if="person.stat">
                                    <!-- {{person.fact}}-->
                                    <span v-if="person.fact=='Yes'">
                                         <p data-toggle="tooltip-Yes-med" title="Has nodule">{{person.fact}}</p>
                                     </span>                                     
                                    <span v-else> 
                                        <p data-toggle="tooltip-No-med" title="Don't Has Nodule" >{{person.fact}}</p></span>                                     
                                    </span>                                
                                <span v-else> <button class="w3-button w3-pink w3-round tablebutton" v-on:click="updateFact(index,1)" data-toggle="tooltip-Yes" title="Has nodule"><i class="glyphicon glyphicon-ok"></i></button>
                                <button class="w3-button w3-blue w3-round tablebutton" v-on:click="updateFact(index,0)" data-toggle="tooltip-No" title="Don't Has Nodule" ><i class="glyphicon glyphicon-remove"></i></button></span>

                            </center>
                        </td>
                        <td> <center>
                             <!-- <button class="w3-button w3-green w3-round tablebutton" data-toggle='modal' data-target='#editModal'>Edit</button>
                             <button class="w3-button w3-red w3-round tablebutton" data-toggle='modal' data-target='#editModal'>Delete</button> -->
                             <button class="w3-button w3-green w3-round tablebutton" v-on:click="edit_modal(index)" data-toggle="tooltip-Edit" title="Edit"><i class="glyphicon glyphicon-pencil"></i></button>
                             <button class="w3-button w3-pink w3-round tablebutton" v-on:click="delete_modal(index)" data-toggle="tooltip-Delete" title="Delete" ><i class="glyphicon glyphicon-trash"></i></button>
                             
                            <!-- <button class="tablebutton w3-button w3-green w3-round" v-on:click="updateFact(index,0)"  style="height:20px;font-size:10;padding-Top:3">Edit</button> -->
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
                    <h2 style="font-weight: 700;">
                        <label style="margin-left:20px">{{modal_data.modal_name}}</label>
                        
                        
                        <span v-if="modal_data.modal_stat">
                            <span v-show="modal_data.modal_stat"  v-if="modal_data.modal_result=='No'" class="tag w3-green w3-padding" style="font-size:medium;font-weight: 700;">don't have a nodule in lung</span>
                            <span v-show="modal_data.modal_stat"  v-if="modal_data.modal_result=='Yes'" class="tag w3-pink w3-padding" style="font-size:medium;font-weight: 700;">Have a nodule in lung</span>                                     
                        </span>                                
                        <span v-else> 
                            <button class="w3-button w3-pink w3-round tablebutton" v-on:click="updateFact(modal_data.modal_index,1)" >Yes</button>
                            <button class="w3-button w3-blue w3-round tablebutton" v-on:click="updateFact(modal_data.modal_index,0)"  >No</button>
                        </span>
                                
                     
                        <button class="w3-button w3-left w3-round-large w3-blue-gray w3-large" style="margin-left:20px" @click="toggle_show_image(0)" v-show="modal_data.modal_show_stat" ><i class="glyphicon glyphicon-eye-close" style="font-size:24px"></i></button>
                        <button class="w3-button w3-left w3-round-large w3-blue-gray w3-large" style="margin-left:20px" @click="toggle_show_image(1)" v-show="!modal_data.modal_show_stat" ><i class="glyphicon glyphicon-eye-open" style="font-size:24px"></i></button>
                    </h2>
                   
                </div>
                <div class="modal-body">
                    <center>
                        <img v-show="modal_data.modal_show_stat" v-bind:src="modal_data.modal_imgURL" style="width:700px">
                        <img v-show="!modal_data.modal_show_stat" v-bind:src="modal_data.modal_imgPURL" style="width:700px">
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
                    <span class="close" data-dismiss="modal"  @click="resetUploadData()">&times;</span>
                    <h2>Edit Chest X-Ray image</h2>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="validateBeforeSubmit('upload')" data-vv-scope="upload">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- <label for="u_id">Patient's ID</label>
                                <input v-model="upload_data.u_id" type="text" name="u_id" placeholder="Patient's ID"
                                 v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('u_id') }">
                                <p v-show="errors.has('u_id')" style="color: red;font-size:small;">Patient's ID is required</p> -->


                                <label for="name">Patient's name</label>
                                <input v-model="upload_data.u_name" type="text" name="u_name" placeholder="Patient's name.."
                                 v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('upload.u_name') }">
                                <p v-show="!errors.has('upload.u_name')" style="color: white;font-size:small;">.</p>
                                <p v-show="errors.has('upload.u_name')" style="color: red;font-size:small;">Patient's name is required</p>

                                <label for="gender">Gender</label>
                                <select name="u_gender" v-model="upload_data.u_gender" placeholder="Patient's gender"
                                v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('upload.u_gender') }">
                                  <option value="Female">Female</option>
                                  <option value="Male">Male</option>
                                </select>
                                <p v-show="!errors.has('upload.u_gender')" style="color: white;font-size:small;">.</p>                                
                                <p v-show="errors.has('upload.u_gender')" style="color: red;font-size:small;">Patient's gender is required</p>
                                
                                <label for="age">Age</label>
                                <input v-model="upload_data.u_age" type="text" name="u_age" placeholder="Patient's age.."
                                v-validate="'required|numeric'"
                                :class="{'input': true, 'is-danger': errors.has('upload.u_age') }">      
                                <p v-show="!errors.has('upload.u_age')" style="color: white;font-size:small;">.</p>                          
                                <p v-show="errors.has('upload.u_age')" style="color: red;font-size:small;">Patient's age is required and valid</p>
                                
                                <label for="uploadimg">Image: {{file_image.name}}</label>
                                <!-- <p></p> -->
                                    <!-- <p v-show="!errors.has('imageUpload')" style="color: red;font-size:small;"></p>
                                    <p v-show="errors.has('imageUpload')" style="color: red;font-size:small;">Patient's age is required and valid</p> -->
                                    <a class="w3-btn w3-blue-gray w3-padding w3-margin w3-section" @click="onPickFile">Select image</a>

                                <input @change="previewFile" type="file" id="files" name="files[]" value="Upload image" ref="fileInput" accept="image/*" style="padding:20px; display:none"
                                v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('imageUpload') }">
                                <p v-show="!errors.has('imageUpload')" style="color: white;font-size:small;">.</p>
                                <p v-show="errors.has('imageUpload')" style="color: red;font-size:small;">Please select image.</p>
                                
                                <button class="w3-button w3-blue w3-right" v-show="!upload_data.u_subbimtBut" style="width:100%">Submit</button>
                                <a class="w3-button w3-red w3-right" @click="cancelUpload" v-show="upload_data.u_subbimtBut" style="width:100%">Cancel</a>
                                
                            </div>
                            <div class="col-sm-6" v-show="modal_data.modal_stat">                
                                <img  v-bind:src="imageUpload" style="width:100%">                                
                                <div class="progress" style="margin-top:5px">
                                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="progress_value" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width:getProgress}">
                                        {{progress_value}}%
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer" style="height:10px">

                </div>
            </div>
        </div>
        <!--END uploadModal-->
        <!-- editModal-->
        <div id="editModal" class="modal fade" style="width:800px !important;margin:40px auto;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" data-dismiss="modal">&times;</span>
                    <h2>Upload Chest X-Ray image</h2>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="validateBeforeSubmit('edit')" data-vv-scope="edit">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- <label for="u_id">Patient's ID</label>
                                <input v-model="upload_data.u_id" type="text" name="u_id" placeholder="Patient's ID"
                                 v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('u_id') }">
                                <p v-show="errors.has('u_id')" style="color: red;font-size:small;">Patient's ID is required</p> -->


                                <label for="e_name">Patient's name</label>
                                <input v-model="edit_data.u_name" type="text" name="e_name" placeholder="Patient's name.."
                                 v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('edit.e_name') }">
                                <p v-show="errors.has('edit.e_name')" style="color: red;font-size:small;">Patient's name is required</p>

                                <label for="e_gender">Gender</label>
                                <select name="e_gender" v-model="edit_data.u_gender" placeholder="Patient's gender"
                                v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('edit.e_gender') }">
                                  <option value="Female">Female</option>
                                  <option value="Male">Male</option>
                                </select>                                
                                <p v-show="errors.has('edit.e_gender')" style="color: red;font-size:small;">Patient's gender is required</p>
                                
                                <label for="e_age">Age</label>
                                <input v-model="edit_data.u_age" type="text" name="e_age" placeholder="Patient's age.."
                                v-validate="'required|numeric'"
                                :class="{'input': true, 'is-danger': errors.has('edit.e_age') }">                                
                                <p v-show="errors.has('edit.e_age')" style="color: red;font-size:small;">Patient's age is required and valid</p>
                                
                                <label for="date">Date</label>
                                <input v-model="edit_data.u_date" type="text" disabled=true>
                                
                                <label for="fact">Medical diagnosis</label>
                                <select v-model="edit_data.u_fact">
                                    <option disabled="" selected="" value="" name="fact" aria-placeholder="Medical diagnosis">Medical diagnosis</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                                <div class="row">
                                    <div class="col-sm-12 w3-center"> <button class="w3-button w3-blue w3-section" style="width:50%">Submit</button> </div>
                                    <!-- <div class="col-sm-6  w3-center"> <button class="w3-button w3-red w3-section" style="width:50%">Delete</button> </div> -->
                                </div>
                                <!-- <button class="w3-button w3-blue w3-right" style="width:100%">Submit</button>  -->
                            </div>
                            <div class="col-sm-6">                
                                <img  v-bind:src="edit_data.u_imageURL" style="width:100%"> 
                                
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer" style="height:10px">

                </div>
            </div>
        </div>
        <!--END uploadModal-->
        <!-- deleteConfirmModal-->
        <div id="deleteConfirmModal" class="modal fade" style="width:400px !important;margin:40px auto;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" data-dismiss="modal">&times;</span>
                    <h2>Confirm delete data</h2>
                </div>
                <div class="modal-body">                   
                        <!-- <div class="row">
                            <div class="col-sm-6">
                                <p>Name</p>
                            </div>
                            <div class="col-sm-6" v-show="modal_data.modal_stat">                
                               <p>{{delete_data.d_name}}</p>
                            </div>
                        </div>  -->
                        <div class="row">
                            <div class="col-sm-3" >
                                <p style="padding-left:30px">Name</p>
                            </div>
                            <div class="col-sm-8"  >                
                               <p>{{delete_data.d_name}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3" >
                                <p style="padding-left:38px">Date</p>
                            </div>
                            <div class="col-sm-9">                
                               <p>{{delete_data.d_date}}</p>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-6 w3-center">
                                
                            </div>
                            <div class="col-sm-6 w3-center"> 
                                <button class="w3-button w3-blue-gray w3-section" data-dismiss="modal">Cancel</button>  
                                <button class="w3-button w3-red w3-section" @click="DeleteDataTable(delete_data)">Delete</button>
                                      
                            </div>
                        </div>                
                </div>
                <!-- <div class="modal-footer" style="height:10px"> -->

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
    import {
        db
    } from '@/firebaseConfig' 
    Vue.use(VeeValidate);
    VeeValidate.Validator.extend('passphrase', {
            getMessage: field => 'Sorry dude, wrong pass phrase.',
            validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
        });
    let datenow = new Date(); 
    var md5 =require('md5');
    export default {
        name: 'Home',
        components: {
            appHeader: Header,
        },
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
                    hospital:'' ,
                    userId:''   
                },                  
                text_filter:"",
                file_image:{name:'กรุณาเลือกรูปภาพ'},                
                imageUpload: '',

                progress_value: 0,
                haveData:0,
                  
                modal_data:{
                    modal_index:'',
                    modal_stat: 0,
                    modal_imgURL: '',
                    modal_imgPURL:'',
                    modal_name: 'Unknow',
                    modal_result: '',
                    modal_show_stat:0
                },
               
                upload_data:
                    {u_id: '',
                    uploadTask:'',
                    u_name: '',
                    u_age: '',
                    u_date: '',
                    u_gender: '',
                    // u_image: '',
                    u_imageName:'',
                    u_subbimtBut:false},
                edit_data:
                    {u_id: '',
                    u_name: '',
                    u_age: '',
                    u_date: '',
                    u_gender: '',
                    u_image: '',
                    u_fact:'',
                    u_stat:'',
                    u_key:''  },
                    
                delete_data:{
                    d_key:'',
                    d_id:'',
                    d_name:'',
                    d_date:'',
                    d_imageName:'',
                    // d_image:'',
                    // d_imageResult:'',
                    d_prediction:''
                },
                persons:[],                
            }
        }, 
        created(){
            this.get_current_user();
            this.fetchData();
            console.log(this.user_current)
        },
        methods: {
            get_current_user(){
                var user = firebase.auth().currentUser; 
                if(user){
                // console.log(user)
                // this.user.photoURL = user.photoURL;
                this.user_current.userId = user.uid;
                this.user_current.email = user.email;
                db.ref('users/' +  this.user_current.userId).once('value').then(
                snapshot => {
                    if (snapshot) {
                    // console.log(snapshot);
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
            // 1==upload ,2 ==edit
            validateBeforeSubmit(scope) {
                console.log('Validate')
                if(scope=='upload'){
                    this.$validator.validateAll(scope).then((result) => {
                        if (result) {
                            this.clickSubmit();
                            
                        }
                    });
                }else if(scope=='edit'){
                    console.log('editsubmit')
                    this.$validator.validateAll(scope).then((result) => {
                        console.log(result)
                        if (result) {
                             console.log('editsubmit2')
                            this.EditSubmit();
                        }           
                    });
                } 
            },
            fetchData() {                 
                var Ref = firebase.database().ref("users/").orderByChild("email").equalTo(this.user_current.email).on("child_added",data=>{
                    console.log('data'+data.val())
                     var usertable = data.val().table;
                     console.log('table '+usertable)
                    if(usertable){
                       const resultArray = [];
                        for (let key in usertable) {
                                resultArray.push(this.addKeyToData(usertable[key],key));           
                        }
                        console.log(resultArray)
                        this.persons = resultArray; // trigger Vue.js to update the DOM
                        if(this.persons.length>0) this.haveData=1;          
                    }                   
                    else {
                        this.persons=[];
                        this.haveData=0;
                    }
                }, error=> {
                    console.log(error)
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
                    // imageURL : data.imageURL, 
                    // imageURLresult:data.imageURLresult,
                    prediction: data.prediction,
                    fact:data.fact,
                    stat:data.stat,
                    show_result:0,
                    imageName:data.imageName                       
                }   
                return person; 
            },
            imageClicked(item,index) {
                
                this.modal_data.modal_name = item.name;
                this.modal_data.modal_result = item.fact;
                this.modal_data.modal_stat = item.stat;                
                this.modal_data.modal_show_stat=item.show_result;
                this.modal_data.modal_index=index;
                console.log(item)
                this.get_result_imageURL(item);
                this.get_raw_imageURL(item);
                console.log(this.modal_data)
                $("#imageModal").modal('show');
            },
            clickSubmit() { 
                this.upload_data.u_subbimtBut=true;
                var vm = this;
                var file = this.file_image; 
                var image_name=file.name    
                
                var storageRef = firebase.storage().ref();
                
                var temp=md5(datenow.getTime())                
                var ext= image_name.slice(image_name.lastIndexOf('.'))
                image_name=temp+ext
                this.upload_data.u_imageName=image_name
                var person=this.newData()
                var LungImagesRef = storageRef.child('images_Lung/'+image_name);
                
                this.upload_data.uploadTask = LungImagesRef.put(file)
                var input = event.target;                        
                var reader = new FileReader();
                reader.onload = (event) => {
                    this.imageUpload = e.target.result; 
                }
               
                this.upload_data.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                function(snapshot) {                
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        
                    console.log('Upload is ' + progress + '% done');
                    // vm.progress(Math.round(progress))
                    vm.progress_value=Math.round(progress)
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
                function(error) {
                    vm.upload_data.u_subbimtBut=false;
                    // alert('upload error pls. upload again')                    
                }, 
                function() { 
                    // var downloadURL = vm.upload_data.uploadTask.snapshot.downloadURL; 
                    // person.imageURL=downloadURL;
                    vm.upload_data.u_subbimtBut=false;  
                    vm.addData2Table(person).then(result=>{
                        $('#uploadModal').modal('hide');
                        vm.resetUploadData();
                        vm.fetchData(); 
                        vm.process_image(person,result.key);   
                    });
                    });                                  
            },
            process_image(person,key){
                    // console.log('test') 
                    var vm = this;

                    var image_process= {
                        // imageURL: person.imageURL,
                        // imageName: person.imageName,
                        personKey: key,
                        userKey:this.user_current.userId
                    }
                    this.$http.post('http://127.0.0.1:5000/processImage',image_process)
                    .then(response=>{
                        console.log(response)
                        console.log(response.ok)
                        if(response.ok) 
                        {
                            vm.fetchData()
                            // var name=response.body.imageName
                            // var prediction = response.body.prediction
                            // console.log(prediction)
                            // var storageRef = firebase.storage().ref();
                            // console.log(storageRef)
                            // console.log('Test/'+name)
                            
                            // console.log(starsRef)
                            // var a= starsRef.getDownloadURL()
                            // console.log(a)

                           
                        }else{
                            alert('Error! please upload data again')
                        }
                    }),error=>{
                        alert('error!')
                    }
                },   
            addData2Table(person){                    
                    var vm = this  ;                       
                    return firebase.database().ref('users/' + this.user_current.userId +'/table/').push(person)
                },
            newData(){ 
                    // this.upload_data.u_image=this.imageUpload;                                       
                    this.upload_data.u_date=datenow.getDate()+'/'+datenow.getMonth()+'/'+datenow.getFullYear()+' '+datenow.getHours()+':'+datenow.getMinutes()+':'+datenow.getSeconds();
                    var data = {
                        // data_id:md5(this.upload_data.u_name+this.upload_data.u_date) ,       
                        id : this.upload_data.u_id,
                        name : this.upload_data.u_name,
                        age : this.upload_data.u_age,
                        date : this.upload_data.u_date,
                        gender : this.upload_data.u_gender,
                        // imageURL : this.upload_data.u_image, 
                        // imageURLresult:'https://firebasestorage.googleapis.com/v0/b/lungnoduledetection.appspot.com/o/2018-08-05-14-26-51.jpeg?alt=media&token=7a55564c-3185-4060-a4e5-a9d182790d4d',
                        prediction: 'Calculating',
                        fact:'',
                        stat: 0,
                        imageName:this.upload_data.u_imageName
                    }
                    return data;
                },          
            resetUploadData(){                    
                    this.upload_data.u_id= '';
                    this.upload_data.u_name= '';
                    this.upload_data.u_age= '';
                    this.upload_data.u_date= '';
                    this.upload_data.u_gender= '';
                    // this.upload_data.u_image= '';
                    this.imageUpload='';
                    this.modal_data.modal_stat=0;
                    this.progress_value=0; 
                    this.file_image={name:'กรุณาเลือกรูปภาพ'};  
                    this.upload_data.u_subbimtBut=false;
                    // this.errors.clear();
                    $("#files").val('');
                },
            updateFact(item, value) {
                    let person = {                     
                        id : this.persons[item].id,
                        name : this.persons[item].name,
                        age : this.persons[item].age,
                        date : this.persons[item].date,
                        gender : this.persons[item].gender,
                        // imageURL : this.persons[item].imageURL, 
                        // imageURLresult:this.persons[item].imageURLresult,
                        prediction: this.persons[item].prediction,
                        fact:this.persons[item].fact,
                        stat:this.persons[item].stat   
                    }
                    // this.addKeyToData(this.persons[item],this.persons[item].id_data);
                    
                    if (value == 1) {
                        person.fact="Yes";
                    } else {
                        person.fact="No";
                    }
                    person.stat=1;
                    this.editDataTable(person,this.persons[item].id_data).then(()=>
                        {
                            this.fetchData()
                            this.modal_data.modal_stat=1
                            this.modal_data.modal_result =person.fact
                        }
                    );                   
                }, 
            edit_modal(item){
                    $('#editModal').modal('show');  
                    this.edit_data.u_id =this.persons[item].id
                    this.edit_data.u_name = this.persons[item].name
                    this.edit_data.u_age = this.persons[item].age
                    this.edit_data.u_date =this.persons[item].date
                    this.edit_data.u_gender = this.persons[item].gender
                    
                    this.edit_data.u_prediction= this.persons[item].prediction
                    this.edit_data.u_fact=this.persons[item].fact
                    this.edit_data.u_stat=this.persons[item].stat
                    this.edit_data.u_key=this.persons[item].id_data 
                    
                    this.get_result_imageURL(this.persons[item]);
                    this.get_raw_imageURL(this.persons[item]);
                    // this.edit_data.u_key=this.persons[item].userId  
                    
                },
            editDataTable(person,keyID){ 
                var updates = {};
                updates['/users/'+this.user_current.userId + '/table/' + keyID] = person;
                return firebase.database().ref().update(updates)
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
            EditSubmit()
                {   console.log(this.edit_data)
                    let person = {                     
                            id : this.edit_data.u_id,
                            name : this.edit_data.u_name,
                            age : this.edit_data.u_age,
                            date : this.edit_data.u_date,
                            gender : this.edit_data.u_gender,
                            // imageURL : this.edit_data.u_imageURL, 
                            // imageURLresult:this.edit_data.u_imageURLresult,
                            prediction: this.edit_data.u_prediction,
                            fact:this.edit_data.u_fact,
                            stat:this.edit_data.u_stat   
                        }      
                    if(person.fact=='Yes' || person.fact=='No')
                    {
                        person.stat=1
                    }
                    $('#editModal').modal('hide');          
                    this.editDataTable(person,this.edit_data.u_key).then(                        
                        this.fetchData()
                    );                       
                },
            delete_modal(item){ 
                    this.delete_data.d_id =this.persons[item].id
                    this.delete_data.d_name = this.persons[item].name
                    this.delete_data.d_date =this.persons[item].date
                    this.delete_data.d_key=this.persons[item].id_data
                    this.delete_data.d_imageName=this.persons[item].imageName
                    // this.delete_data.d_image=this.persons[item].imageURL
                    // this.delete_data.d_imageResult=this.persons[item].imageURLresult
                    this.delete_data.d_prediction=this.persons[item].prediction
                    console.log(this.delete_data)
                    $('#deleteConfirmModal').modal('show')                  
                },
            DeleteDataTable(item){
                    $('#deleteConfirmModal').modal('hide')  
                    firebase.database().ref('users/' + this.user_current.userId +'/table/'+item.d_key).remove().then(
                        this.fetchData()
                    );
                    // var desertRef = firebase.storage().refFromURL(item.d_image)

                    // Delete the file
                    // desertRef.delete().then(function() {
                    //     console.log('success')
                    // }).catch(function(error) {
                    //     console.log(error)
                    // });
                    var storageRef = firebase.storage().ref();
                    var starsRef = storageRef.child('images_Lung/'+item.d_imageName).delete();
                    if(item.d_prediction=='Yes'||item.d_prediction=='No'){ 
                        var storageRef = firebase.storage().ref();
                        var starsRef = storageRef.child('Test/result_'+item.d_imageName).delete();
                        // var desertRef = firebase.storage().refFromURL(item.d_imageResult)                       
                        // desertRef.delete().then(function() {
                        //     console.log('success')
                        // }).catch(function(error) {
                        //      console.log(error)
                        // });
                    }
                   
                },
            previewFile(event){                    
                var input = event.target;                    
                if (input.files && input.files[0]) {
                    this.file_image=input.files[0];
                    console.log( this.file_image.name);
                    var reader = new FileReader();
                        
                    reader.onload = (e) => {                          
                        this.imageUpload = e.target.result;
                        this.modal_data.modal_stat=1;
                    }
                       
                    reader.readAsDataURL(input.files[0]);
                }
            },
            toggle_show_image(item){
                this.modal_data.modal_show_stat=item
            }, 
            onPickFile(){
                this.$refs.fileInput.click();
            },
            cancelUpload(){
                this.upload_data.uploadTask.cancel();
                this.resetUploadData();
            },
            re_process(item){
                this.process_image(item,item.id_data)
            },
            get_result_imageURL(person){
                var vm = this
                if(person.prediction=='Yes'||person.prediction=='No')
                {
                    console.log('get_result')
                    var storageRef = firebase.storage().ref();
                    var starsRef = storageRef.child('Test/result_'+person.imageName);
                    return starsRef.getDownloadURL().then(result=>{
                        console.log(result)
                        vm.modal_data.modal_imgPURL=result  
                        vm.edit_data.u_imageURLresult=result
                        // return result
                    })
                    .catch(function(error) {
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
                        vm.modal_data.modal_imgPURL= 'https://firebasestorage.googleapis.com/v0/b/lungnoduledetection.appspot.com/o/2018-08-05-14-26-51.jpeg?alt=media&token=7a55564c-3185-4060-a4e5-a9d182790d4d'
                        vm.edit_data.u_imageURLresult== 'https://firebasestorage.googleapis.com/v0/b/lungnoduledetection.appspot.com/o/2018-08-05-14-26-51.jpeg?alt=media&token=7a55564c-3185-4060-a4e5-a9d182790d4d'
                });
                }else this.modal_data.modal_imgPURL= 'https://firebasestorage.googleapis.com/v0/b/lungnoduledetection.appspot.com/o/2018-08-05-14-26-51.jpeg?alt=media&token=7a55564c-3185-4060-a4e5-a9d182790d4d'
                this.edit_data.u_imageURLresult== 'https://firebasestorage.googleapis.com/v0/b/lungnoduledetection.appspot.com/o/2018-08-05-14-26-51.jpeg?alt=media&token=7a55564c-3185-4060-a4e5-a9d182790d4d'
            },
            get_raw_imageURL(person){ 
                var vm = this
                console.log('get_raw')
                var storageRef = firebase.storage().ref();
                var starsRef = storageRef.child('images_Lung/'+person.imageName);
           
                starsRef.getDownloadURL().then(result=>{
                    // console.log(result)
                    vm.modal_data.modal_imgURL=result                                          
                    vm.edit_data.u_imageURL = result 
                    // return result
                })
                .catch(function(error) {
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
                
            },
            re_process_toggle(person){
                if(person.prediction=='No'||person.prediction=='Yes')
                    return true
                else return false
            }            
        },
        computed: {
            filteredItems() {
                    let text=this.text_filter.toLowerCase().trim()
                    // console.log(this.sortedData())
                    return this.sortedData().filter(item => {
                        return item.name.toLowerCase().indexOf(text) > -1
                    })
            },
            getProgress(){
                    // console.log(Math.round(this.progress_value) + "%")
                    return this.progress_value + "%";
                }
        },
            // watch:{
            //     persons: function(value){
            //             var v= this;
            //             setTimeout(function()
            //             {
            //              v.fetchData()    
            //             },4000);
            //         }
            // }            
    }
</script>

<style scoped>
.material-icons {vertical-align:-20%}
input[type=text],
    select {
        width: 100%;
        padding: 6px 20px;
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
<style src="../assets/css/icon.css" />

</style>
 