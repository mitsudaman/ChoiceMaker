<template>
  <b-container class="px-md-5 mt-5">
    <div class="row mb-2">
      <div class="col-md-12">
        <div class="row no-gutters  rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col d-flex flex-column position-static">
            <div>
              <svg ref="svgArea" viewBox="0 0 200 100">
                <rect x="0" y="0" width="200" height="100" fill="#ffd31a"></rect>
                <text 
                x="50%" 
                :y="svgQuestion1.y" 
                font-weight="bold"
                :font-size="svgQuestionFontSize"
                text-anchor="middle">{{svgQuestion1.text}}</text>
                {{svgQuestion2}}
                <text 
                v-if="svgQuestion2"
                x="50%" 
                :y="svgQuestion2.y" 
                font-weight="bold"
                :font-size="svgQuestionFontSize"
                text-anchor="middle">{{svgQuestion2.text}}</text>
                <text 
                v-if="svgQuestion3"
                x="50%" 
                :y="svgQuestion3.y" 
                font-weight="bold"
                :font-size="svgQuestionFontSize"
                text-anchor="middle">{{svgQuestion3.text}}</text>
                <text 
                x="15%" 
                y="70%"
                font-weight="bold"
                font-size="8px"
                style="fill: red"
                >A:</text>
                <text 
                x="21%" 
                y="70%"
                font-weight="bold"
                :font-size="svgOption1FontSize"
                >{{option1}}</text>
                <text 
                x="15%" 
                y="85%"
                font-weight="bold"
                font-size="8px"
                style="fill: blue"
                >B:</text>
                <text 
                x="21%" 
                y="85%"
                font-weight="bold"
                :font-size="svgOption2FontSize"
                >{{option2}}</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="font-weight-bold">質問 (3行まで)</label>
            <textarea  
              v-model="question"
              rows="3" 
              maxlength="50" 
              class="form-control"></textarea>
            <p class="text-right">{{question.length}}/50</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">選択肢A</label>
            <input  
              v-model="option1"
              maxlength="20" 
              class="form-control">
            <p class="text-right">{{option1.length}}/20</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">選択肢B</label>
            <input  
              v-model="option2"
              maxlength="20" 
              class="form-control">
            <p class="text-right">{{option2.length}}/20</p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <b-button 
        :disabled="createdFlg"
        @click="create()" 
        variant="warning">
        <i 
        v-if="!createLoadFlg"
        class="fas fa-pencil-alt"></i> 
        <span
          v-if="createLoadFlg"
          class="spinner-border spinner-border-sm text-white" 
          role="status" 
          aria-hidden="true"></span>
          <span class="font-weight-bold text-white">選択をつくる</span></b-button>
    </div>
    <div 
    v-if="createdFlg"
    class="mt-4">
      <a 
        class="btn btn-block animationBtn btn-tw p-2" 
        v-bind:href="'https://twitter.com/share?text=究極の選択メーカー。究極の選択を促し周りの人に刺激を与えましょう。&hashtags=究極の選択メーカー&url=https://www.choice-maker.site/m/'+ documentId"
        target="_blank" rel="noopener"
        role="button">
        <i class="fab fa-twitter"></i>問いかける</a>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore';
import canvg from 'canvg';
import { uuid } from 'vue-uuid';
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
var db = firebase.firestore();
export default {
  components: {
  },
  data() {
    return {
      loginUser: null,
      question: '',
      option1: '',
      option2: '',
      uuid: uuid.v1(),
      documentId: "",
      createLoadFlg: false,
      createdFlg: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.loginUser = user;
        this.loginFlg = true;
      } else {
        this.$router.push('login')
      }
    });
  },
  computed: {
    svgQuestion1 () { 
      var questionArray = this.question.split('\n')
      var questionRow = questionArray[0]
      questionRow = questionRow.length == 0? "どっちがいい？" : questionRow
      var length = this.getFontLength(questionRow);

      var y ="40%"
      if(questionArray.length == 2){
        y = "35%"
      }
      if(questionArray.length >= 3){
        y = "20%"
      }
      return { text: questionRow, y: y}
    },
    svgQuestion2 () { 
      var questionArray = this.question.split('\n')
      var questionRow = questionArray[1]
      if(!questionRow){
        return 
      }
      var y ="50%"
      if(questionArray.length >= 3){
        y = "35%"
      }
      return { text: questionRow, y: y}
    },
    svgQuestion3 () { 
      var questionArray = this.question.split('\n')
      var questionRow = questionArray[2]
      if(!questionRow){
        return 
      }
      var y ="50%"
      return { text: questionRow, y: y}
    },
    svgQuestionFontSize(){
      var questionArray = this.question.split('\n')
      var questionRow = questionArray[0]
      var maxLength = this.getFontLength(questionRow);
      

      var questionRow2 = questionArray[1]
      if(questionRow2){
        var length = this.getFontLength(questionRow2)
        maxLength = maxLength > length ? maxLength : length
      }
      var questionRow3 = questionArray[2]
      if(questionRow3){
        var length = this.getFontLength(questionRow3)
        maxLength = maxLength > length ? maxLength : length
      }
      // var questionRow1 = questionArray[0]
      // var length1 = this.getFontLength(questionRow1);
      // var questionRow2 = questionArray[1]
      // var length2 = this.getFontLength(questionRow2);
      // var questionRow3 = questionArray[3]
      // var length3 = this.getFontLength(questionRow3);
      
      return this.getQestionFontSizeByLength(maxLength)
    },
    svgOption1FontSize(){
      var length = this.getFontLength(this.option1);
      return this.getOptionFontSizeByLength(length)
    },
    svgOption2FontSize(){
      var length = this.getFontLength(this.option2);
      return this.getOptionFontSizeByLength(length)
    },
  },
  methods: {
    create() {
      //ログイン確認
      firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          this.loginUser = user;
        } else {
          this.$router.push('login')
        }
      });
      var storageRef = firebase.storage().ref();
      var createRef = storageRef.child(this.uuid + '.jpg');
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
        var date = new Date();
        if(this.question.length == 0){
          this.question = "どっちがいい？"
        }
        
        db.collection("questions").add({
          question: this.question,
          option1: this.option1,
          option2: this.option2,
          option3: '',
          option4: '',
          option1_choiced_user: [],
          option2_choiced_user: [],
          option3_choiced_user: [],
          option4_choiced_user: [],
          photo_url: this.loginUser.photoURL,
          user_name: this.loginUser.displayName,
          ogp_full_path: this.uuid,
          like_users: [],
          type: 1,
          created_date: date,
          del_flg: false,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.documentId = docRef.id
            this.createdFlg = true;
            this.createLoadFlg = false;
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            this.createLoadFlg = false;
        });
      });
    },
    getFontLength(value){
      var length = 0;
      for (var i = 0; i < value.length; i++) {
        var c = value.charCodeAt(i);
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
          length += 1;
        } else {
          length += 2;
        }
      }
      return length
    },
    getQestionFontSizeByLength(length){
      var fontSize = "20px";
      if(length > 85){
        fontSize = "3px"
        return  fontSize
      }
      if(length > 75){
        fontSize = "4px"
        return  fontSize
      }
      if(length > 60){
        fontSize = "5px"
        return  fontSize
      }
      if(length > 51){
        fontSize = "6px"
        return  fontSize
      }
      if(length > 45){
        fontSize = "7px"
        return  fontSize
      }
      if(length > 40){
        fontSize = "8px"
        return  fontSize
      }
      if(length > 35){
        fontSize = "9px"
        return  fontSize
      }
      if(length > 33){
        fontSize = "10px"
        return  fontSize
      }
      if(length > 30){
        fontSize = "11px"
        return  fontSize
      }
      if(length > 27){
        fontSize = "12px"
        return  fontSize
      }
      if(length > 25){
        fontSize = "13px"
        return  fontSize
      }
      if(length > 24){
        fontSize = "14px"
        return  fontSize
      }
      if(length > 21){
        fontSize = "15px"
        return  fontSize
      }
      if(length > 20){
        fontSize = "16px"
        return  fontSize
      }
      if(length > 18){
        fontSize = "17px"
        return  fontSize
      }
      if(length > 15){
        fontSize = "18px"
        return  fontSize
      }
      return  fontSize
    },
    getOptionFontSizeByLength(length){
      var fontSize = "8px";
      if(length > 34){
        fontSize = "7px"
        return  fontSize
      }
      return  fontSize
    },
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

