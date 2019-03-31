<template>
  <b-container class="px-md-5 mt-5">
    <!-- <h1 class="text-center mt-3 h2">
        <i class="fas fa-hand-point-up awesome-yellow"></i> 
        チョイスする
    </h1> -->
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
      <div class="col-8 col-md-10 option">
        <p class="h2 pt-1 mt-2 text-center font-weight-bold">
          {{question.question}}
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
        class="h4 p-3 my-3 text-center font-weight-bold">
        {{question.option1}}
        </div>
      </div>
      <div 
      v-bind:class= "{ noChoiced: choiced }"
      class="col-md-1"></div>
      <div 
        v-bind:class="[{ choiced: choiced && isBChoiced },{ noChoiced: choiced && !isBChoiced }]"
        @click="choiceOption(2)"
        class="col-md-5 mt-3 mt-md-0 border-double rounded options">
        <div class="h3 py-3 optionB_title pb-2 font-weight-bold text-center text-white ">B</div>
        <div class="h4 p-3 my-3 text-center font-weight-bold">
          {{question.option2}}
        </div>
      </div>
    </div>

    <div 
    v-if="choiced"
    class="result"
    >
    <!-- {{ question }} -->
    A:{{ question.option1_choiced_user.length }}
    B:{{ question.option2_choiced_user.length }}
      <div class="row mt-5">
        <div class="col-md-3">
        </div>
        <div class="col-md-6">
          <no-ssr>
            <chart :chart-data="datacollection" :options="options"></chart>
          </no-ssr>
        </div>
        <div class="col-md-3">
        </div>
      </div>
    </div>
    
  </b-container>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore';
import canvg from 'canvg';
import Chart from './Chart.js'
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
    Chart
  },
  data() {
    return {
      option1: '',
      option2: '',
      choiced: false,
      isAChoiced: false,
      isBChoiced: false,
      createLoadFlg: false,
      createdFlg: false,
      question: {},
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.loginUser = user;
      } else {
      }
    });
    var docRef = db.collection("questions").doc(this.$route.query.d);
    this.getQuestionByDocumentId(docRef)
  },
  methods: {
    choiceOption(option){
      if(option == 1){
        this.isAChoiced = true;
        this.isBChoiced = false;
      }
      else if(option == 2){
        this.isAChoiced = false;
        this.isBChoiced = true;
      }
      var docRef = db.collection("questions").doc(this.$route.query.d);
      
      // ドキュメント取得
      docRef.get().then(doc => {
        if (doc.exists) {  
          this.updateOptionChoicedUser(docRef,option);
        } else {
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
    updateOptionChoicedUser(docRef,option){
      // ドキュメント更新
      if(option==1){
        docRef.update({
            "option1_choiced_user": firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
            "option2_choiced_user": firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
        })
      }else if(option==2){
        docRef.update({
            "option1_choiced_user": firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
            "option2_choiced_user": firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
        })
      }
      this.choiced = true;
      this.getQuestionByDocumentId(docRef)
    },
    getQuestionByDocumentId(docRef){
      // ドキュメント取得
      docRef.get().then(doc => {
          if (doc.exists) {
            this.question = doc.data();
            this.fillData();
          } else {
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
    fillData () {
      var sumCt = this.question.option1_choiced_user.length + this.question.option2_choiced_user.length;
      var option1Rate = Math.floor(this.question.option1_choiced_user.length * (100/sumCt))
      var option2Rate = Math.floor(this.question.option2_choiced_user.length * (100/sumCt))
      this.datacollection = {
        labels: ['A('+ option1Rate + '%)', 'B('+ option2Rate + '%)'],
        datasets: [
          {
            data: [
              option1Rate, 
              option2Rate
            ],
            backgroundColor: [
              '#cdd6db',
              '#cdd6db',
            ],
          }
        ]
      }
      this.options = {
          responsive: true, 
          legend: {
            display: false
          },
          title: {
              display: true,
              text: this.question.question,
              fontSize: 18
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: false,
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                  fontSize: 18,
                  stepSize: 100           
                }
              }
            ]
          }
      }
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
.options:hover {
  transform: scale(1.1,1.1);
}
.optionA_title{
  background-color:silver;
  border-bottom:solid 2px dimgray;
}
.optionB_title{
  background-color: silver;
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

