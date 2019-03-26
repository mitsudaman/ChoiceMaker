<template>
  <div>

    

    <b-container class="px-md-5 mt-5">

      <!-- <div id="choiceBoard">
        <div class="row board rounded mb-4 no-gutters">
          <div class="col-2 col-md-1">
            <p class="h2 p-1 pl-3 mt-2">
              <i class="fas fa-hand-point-left awesome-white animationBtn"></i>
            </p>
          </div>
          <div class="col-8 col-md-10">
            <p class="h2 pt-1 mt-2 text-center font-weight-bold">
              どっちがいい？
            </p>
          </div>
          <div class="col-2 col-md-1 text-right">
            <p class="h2 p-1 mr-3 mt-2">
              <i class="fas fa-hand-point-right awesome-white animationBtn"></i>
            </p>
          </div>
        </div>
        <div class="row mb-2 no-gutters justify-content-md-center">
          <div
            class="col-md-5 mt-md-0 border-double rounded options">
            <div class="h3 py-3 optionA_title pb-2 font-weight-bold text-center text-white ">A</div>
            <div 
            class="h4 p-3 my-3 text-center font-weight-bold">{{option1}}</div>
          </div>
          <div
          class="col-md-1"></div>
          <div
            class="col-md-5 mt-3 mt-md-0 border-double rounded options">
            <div class="h3 py-3 optionB_title pb-2 font-weight-bold text-center text-white ">B</div>
            <div class="h4 p-3 my-3 text-center font-weight-bold">{{option2}}</div>
          </div>
        </div>
      </div> -->

 <div id="choiceBoard" class="py-3 py-md-5">
        <div class="row board rounded mb-2 mb-md-5 no-gutters">
          <div class="col-2 col-md-1">
            <p class="h4 p-1 pl-3 mt-2">
              <i class="fas fa-hand-point-left awesome-white animationBtn"></i>
            </p>
          </div>
          <div class="col-8 col-md-10">
            <p class="h4 pt-1 mt-2 text-center font-weight-bold">
              どっちがいい？
            </p>
          </div>
          <div class="col-2 col-md-1 text-right">
            <p class="h4 p-1 mr-3 mt-2">
              <i class="fas fa-hand-point-right awesome-white animationBtn"></i>
            </p>
          </div>
        </div>
        <div class="row mb-2 no-gutters justify-content-center">
          <div
            class="col-5 border-double rounded options">
            <div 
            class="py-3 text-center font-weight-bold">{{option1}}</div>
          </div>
          <div
          class="col-1"></div>
          <div
            class="col-5 border-double rounded options">
            <div class="py-3 text-center font-weight-bold">{{option2}}</div>
          </div>
        </div>
      </div>




      <div class="row mb-2">
        <div class="col-md-12">
          <div class="row no-gutters  rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col d-flex flex-column position-static">
              
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="font-weight-bold">回答1</label>
              <textarea  
                v-model="option1"
                class="form-control"></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="font-weight-bold">回答2</label>
              <textarea  
                v-model="option2"
                class="form-control"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right mt-3">
        <b-button 
          :disabled="createdFlg"
          @click="create()" 
          class="btn-haiku-create">
          <i 
          v-if="!createLoadFlg"
          class="fas fa-pencil-alt"></i> 
          <span
            v-if="createLoadFlg"
            class="spinner-border spinner-border-sm" 
            role="status" 
            aria-hidden="true"></span>俳句つくる</b-button>
      </div>



    </b-container>
  </div>
</template>

<script>
// import html2canvas from '../components/html2canvas.vue'
import html2canvas from 'html2canvas';
import firebase from 'firebase'
import 'firebase/firestore';
import canvg from 'canvg';
var config = {
  apiKey: "AIzaSyDZU-UvrO9Ka2meAjeYzZSCt1C6gFaGnBQ",
  authDomain: "choicemaker-e052f.firebaseapp.com",
  databaseURL: "https://choicemaker-e052f.firebaseio.com",
  projectId: "choicemaker-e052f",
  storageBucket: "choicemaker-e052f.appspot.com",
  messagingSenderId: "341375191781"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
export default {
  name: 'app',
  components: {
    html2canvas
  },
  data() {
    return {
      option1: '毎月20万円もらえる（一生）あああああああ',
      option2: 'その場で1億円もらえる',
      createLoadFlg: false,
      createdFlg: false,
      createCanvas: null,
    };
  },
  methods: {
    create() {
      var element = document.getElementById("choiceBoard");
      
      html2canvas(element).then((canvas)=> {
        
        var storageRef = firebase.storage().ref();
        var createRef = storageRef.child('aaa.jpg');
        let image = canvas.toDataURL('image/jpeg').split(',')[1]

        createRef.putString(image, 'base64').then((snapshot) =>{
          console.log('Uploaded a blob or file!');
          // var date = new Date();
          
          // db.collection("posts").add({
          //   haiku1: this.haiku1,
          //   haiku2: this.haiku2,
          //   haiku3: this.haiku3,
          //   name: this.name,
          //   ogp_full_path: this.uuid,
          //   read_count: 0,
          //   tags: this.tags,
          //   type: 1,
          //   created_date: date,
          //   del_flg: false,
          // })
          // .then((docRef) => {
          //     console.log("Document written with ID: ", docRef.id);
          //     this.documentId = docRef.id
          //     this.createdFlg = true;
          //     this.createLoadFlg = false;
          // })
          // .catch((error) => {
          //     console.error("Error adding document: ", error);
          //     this.createLoadFlg = false;
          // });
        })
      });
    }
  }
}
</script>

<style>

.board {
    background-color:#ffd31a;
    /* background-color:#49a1eb; */
    border:solid 3px grey;
}
.border-double{
  border:double 5px dimgray;
}
.border-bottom{
  /* border:solid 1px #000; */
}
.options {
  background-color: white;
}
.optionA_title{
  background-color: grey;
  border-bottom:solid 2px dimgray;
}
.optionB_title{
  background-color: grey;
  border-bottom:solid 2px dimgray;
}

.choiced {
  animation: animScale 4s infinite ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;
}
.noChoiced {
  display: none;
}
.animationBtn {
  animation: animScale 4s infinite ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;
}
@keyframes animScale {
  0% { transform: scale(0.8, 0.8); }
  10% { transform: scale(1.1, 1.1); }
  20% { transform: scale(1, 1); }
  30% { transform: scale(1.1, 1.1); }
  40% { transform: scale(1, 1); }
  50% { transform: scale(1.1, 1.1); }
  60% { transform: scale(1, 1); }
  70% { transform: scale(1.1, 1.1); }
  80% { transform: scale(1, 1); }
}
</style>
