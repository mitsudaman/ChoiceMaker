<template>
  <b-container class="px-md-5 mt-5">
    <div class="row mb-2">
      <div class="col-md-12">
        <div class="row no-gutters  rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col d-flex flex-column position-static">





            <canvas id="SimpleCanvas" width="640" height="480" style="background-color:#FFFFFF;"></canvas>




            <!-- <div>
              <svg ref="svgArea" viewBox="0 0 200 100">
                <rect x="2.5" y="2.5" width="90" height="95" fill="#fff" stroke="#12b886" stroke-width="5"></rect>
                <rect x="107.5" y="2.5" width="90" height="95" fill="#fff" stroke="#cccccc" stroke-width="5"></rect>
                <text 
                x="25%" 
                y="50%"
                font-size="8px"
                text-anchor="middle">
                {{option1}}</text>
                <text 
                x="75%" 
                y="50%" 
                writing-mode="tb"
                glyph-orientation-vertical="0"
                font-size="8px"
                text-anchor="middle">{{option2}}</text>
              </svg>
            </div> -->
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
              v-on:change="onCreateCanvas"
              class="form-control"></textarea>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label class="font-weight-bold">タグ</label>
            <span> ※3つまで</span>
            <input-tag
            v-model="tags"
            :limit=3></input-tag> 
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="font-weight-bold">名前</label>
            <input  
              v-model="name"
              class="form-control">
          </div>
        </div>
      </div> -->
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



    <div class="row board rounded my-4 no-gutters">
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
        class="col-md-5 mt-md-0 border-double rounded options">
        <div class="h3 py-3 optionA_title pb-2 font-weight-bold text-center text-white ">A</div>
        <div 
        class="h4 p-3 my-3 text-center font-weight-bold">毎月20万円もらえる（一生）ああああああああああああああああああああああああ</div>
      </div>
      <div 
      class="col-md-1"></div>
      <div 
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
      option1: '毎月20万円もらえる（一生）ああああああああああああああああああああああああ',
      option2: 'その場で1億円もらえる',
      createLoadFlg: false,
      createdFlg: false
    };
  },
  methods: {
    onCreateCanvas(){
      console.log('aaaaaaaaaa')
        // var ctx = document.getElementById("SimpleCanvas").getContext("2d");

        // var txt ="JavaScript"; //描画する文字

        // ctx.font = "italic 40px Arial"; //フォントにArial,40px,斜体を指定
        // ctx.fillStyle = "green"; //塗り潰し色を緑に

        // ctx.fillText(txt,10,50);      //テキストを塗り潰しで描画
        // ctx.fillText(txt,10,100,100); //テキストの最大幅を100pxに指定

        // ctx.strokeStyle = "blue"; //輪郭線の色を青に

        // ctx.strokeText(txt,10,150);     //テキスト輪郭を描画
        // ctx.strokeText(txt,10,200,100); //テキストの最大幅を100pxに指定
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

