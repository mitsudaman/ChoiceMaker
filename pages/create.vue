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
                :y="svgOption1_1.y"
                font-weight="bold"
                font-size="8px"
                style="fill: red"
                >A:</text>
                <text 
                x="21%" 
                :y="svgOption1_1.y"
                font-weight="bold"
                font-size="8px"
                >{{svgOption1_1.text}}</text>
                <text 
                v-if="svgOption1_2"
                x="21%" 
                :y="svgOption1_2.y"
                font-weight="bold"
                font-size="8px"
                >{{svgOption1_2.text}}</text>
                <text 
                x="15%" 
                :y="svgOption2_1.y"
                font-weight="bold"
                font-size="8px"
                style="fill: blue"
                >B:</text>
                <text 
                x="21%" 
                :y="svgOption2_1.y"
                font-weight="bold"
                font-size="8px"
                >{{svgOption2_1.text}}</text>
                <text 
                v-if="svgOption2_2"
                x="21%" 
                :y="svgOption2_2.y"
                font-weight="bold"
                font-size="8px"
                >{{svgOption2_2.text}}</text>
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
            <label class="font-weight-bold">選択肢A (2行まで)</label>
            <textarea  
              v-model="option1"
              maxlength="50" 
              class="form-control"></textarea>
            <p class="text-right">{{option1.length}}/50</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">選択肢B (2行まで)</label>
            <textarea  
              v-model="option2"
              maxlength="50" 
              class="form-control"></textarea>
            <p class="text-right">{{option2.length}}/50</p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right mt-3">
      <b-button 
        :disabled="createdFlg"
        @click="create()" 
        variant="warning">
        <i 
        v-if="!createLoadFlg"
        class="fas fa-pencil-alt"></i> 
        <span
          v-if="createLoadFlg"
          class="spinner-border spinner-border-sm" 
          role="status" 
          aria-hidden="true"></span>
          <span class="font-weight-bold text-white">選択をつくる</span></b-button>
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
      question: '',
      option1: '',
      option2: '',
      createLoadFlg: false,
      createdFlg: false
    };
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
    svgOption1_1 () { 
      var option1Array = this.option1.split('\n')
      var option1Row = option1Array[0]
      var length = this.getFontLength(option1Row);

      var y ="65%"
      return { text: option1Row, y: y}
    },
    svgOption1_2 () { 
      var option1Array = this.option1.split('\n')
      var option1Row = option1Array[1] 
      if(!option1Row){
        return 
      }
      var length = this.getFontLength(option1Row);

      var y ="75%"
      return { text: option1Row, y: y}
    },
    svgOption2_1 () { 
      var option2Array = this.option2.split('\n')
      var option2Row = option2Array[0]
      var length = this.getFontLength(option2Row);

      var y ="87.5%"
      return { text: option2Row, y: y}
    },
    svgOption2_2 () { 
      var option2Array = this.option2.split('\n')
      var option2Row = option2Array[1] 
      if(!option2Row){
        return 
      }
      var length = this.getFontLength(option2Row);

      var y ="97.5%"
      return { text: option2Row, y: y}
    },
  },
  methods: {
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

