<template>
  <b-container class="px-md-5 mt-5">
    <b-row align-h="end" class="mb-4">
      <b-col cols="4 text-right">
        <i class="fas fa-thumbs-up awesome-green"></i> 0いいね</b-col>
    </b-row>
    <div class="row board rounded mb-4 no-gutters">
      <div class="col-2 col-md-1">
        <p class="h2 p-1 pl-3 mt-2">
          <i class="fas fa-hand-point-left awesome-white animationBtn"></i>
        </p>
      </div>
      <div class="col-8 col-md-10">
        <p class="h2 pt-1 mt-2 text-center font-weight-bold">
          どっちがいい？
          <!-- 目の前に列車が走っている。線路の先にはネコがいます。助けますか？ -->
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
        v-bind:class="[{ choiced: choiced && isAChoiced },{ noChoiced: choiced && !isAChoiced }]"
        @click="choiceOption(1)"
        class="col-md-5 mt-md-0 border-double rounded options">
        <div class="h3 py-3 optionA_title pb-2 font-weight-bold text-center text-white ">A</div>
        <div 
        class="h4 p-3 my-3 text-center font-weight-bold">毎月20万円もらえる（一生）ああああああああああああああああああああああああ</div>
      </div>
      <div 
      v-bind:class= "{ noChoiced: choiced }"
      class="col-md-1"></div>
      <div 
        v-bind:class="[{ choiced: choiced && isBChoiced },{ noChoiced: choiced && !isBChoiced }]"
        @click="choiceOption(2)"
        class="col-md-5 mt-3 mt-md-0 border-double rounded options">
        <div class="h3 py-3 optionB_title pb-2 font-weight-bold text-center text-white ">B</div>
        <div class="h4 p-3 my-3 text-center font-weight-bold">その場で1億円もらえる</div>
      </div>
    </div>
    
  </b-container>
</template>

<script>
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
  components: {
  },
  data() {
    return {
      option1: '',
      option2: '',
      choiced: false,
      isAChoiced: false,
      isBChoiced: false,
      createLoadFlg: false,
      createdFlg: false
    };
  },
  methods: {
    choiceOption(option){
      console.log('aaaaaaaaaa');
      this.choiced = true;
      if(option == 1){
        this.isAChoiced = true;
        this.isBChoiced = false;
      }
      else if(option == 2){
        this.isAChoiced = false;
        this.isBChoiced = true;
      }
    },
    create() {
      var storageRef = firebase.storage().ref();
      var createRef = storageRef.child('aaa.jpg');
      var canvas = document.createElement('canvas')
      var svg = this.$refs.svgArea
      this.createLoadFlg = true;

      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      
      const data = new XMLSerializer().serializeToString(this.$refs.svgArea);
      canvg(canvas, data)
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
  border:double 10px dimgray;
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

