<template>
  <b-container class="px-md-5 mt-5">
    <!-- <h1 class="text-center mt-3 h2">
        <i class="fas fa-hand-point-up awesome-yellow"></i> 
        チョイスする
    </h1> -->
    <div class="mb-4 text-right">
      <div>
        <button 
          v-if="!likedFlg"
          class="btn like-btn"
          @click="addLikeUsr()">
            <i class="fa fa-fw fa-thumbs-up"></i> 
        </button>
        <button 
          v-if="likedFlg"
          class="btn like-btn"
          @click="delLikeUsr()">
            <i class="fa fa-fw fa-check"></i> 
        </button>
        <span class="font-weight-bold like-count">{{likeSum}}</span>
      </div>
    </div>
    <div class="content-area py-4">
    <div class="row quest-board rounded mb-4 no-gutters">
      <div class="col-2 col-md-1">
        <p class="h3 p-1 pl-3 mt-2">
          <i class="fas fa-hand-point-left awesome-white animationBtn"></i>
        </p>
      </div>
      <div class="col-8 col-md-10 option">
        <p class="h3 pt-1 mt-2 text-center font-weight-bold">
          {{question.question}}
        </p>
      </div>
      <div class="col-2 col-md-1 text-right">
        <p class="h3 p-1 mr-3 mt-2">
          <i class="fas fa-hand-point-right awesome-white animationBtn"></i>
        </p>
      </div>
    </div>
    <div class="row mb-2 no-gutters justify-content-md-center">
      <div 
      v-bind:class="[{ choiced: choiced && isAChoiced },{ noChoiced: choiced && !isAChoiced }]"
      class="col-md-5 mt-md-0">
        <div class="h1 py-2 pb-2 optionA_title font-weight-bold text-center">A</div>
        <div
          @click="choiceOption(1)"
          class="border-double rounded options">
          <div 
          class="h4 p-3 my-3 text-center font-weight-bold">
          {{question.option1}}
          </div>
        </div>
      </div>
      <div 
      v-bind:class= "{ noChoiced: choiced }"
      class="col-md-1"></div>
      <div 
          v-bind:class="[{ choiced: choiced && isBChoiced },{ noChoiced: choiced && !isBChoiced }]"
          class="col-md-5 mt-md-0">
        <div class="h1 py-2 pb-2 optionB_title font-weight-bold text-center">B</div>
        <div
          @click="choiceOption(2)"
          class="border-double rounded options">
          <div 
          class="h4 p-3 my-3 text-center font-weight-bold">
          {{question.option2}}
          </div>
        </div>
      </div>
    </div>

    <div 
    v-if="choiced"
    class="result mt-5"
    >
      <h2 class="text-center">集計結果 ({{optionSum}}票)</h2>      
      <div class="row mb-2 no-gutters justify-content-md-center">
        <div class="col-md-5 mt-md-0">
          <div class="h1 py-2 pb-2 optionA_title font-weight-bold text-center">A</div>
          <div class="border-double rounded options">
            <div 
            class="h4 p-3 my-3 text-center font-weight-bold">
            {{question.option1}}
            </div>
          </div>
          <div class="h1 py-2 pb-2 optionA_title font-weight-bold text-center">{{option1Rate}}%</div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5 mt-md-0">
          <div class="h1 py-2 pb-2 optionB_title font-weight-bold text-center">B</div>
          <div class="border-double rounded options">
            <div 
            class="h4 p-3 my-3 text-center font-weight-bold">
            {{question.option2}}
            </div>
          </div>
          <div class="h1 py-2 pb-2 optionB_title font-weight-bold text-center">{{option2Rate}}%</div>
        </div>
      </div>
      <div class="mt-4">
        <a 
          class="btn btn-block btn-tw p-2" 
          v-bind:href="'https://twitter.com/share?text=究極の選択メーカー。究極の選択を促し周りの人に刺激を与えましょう。&hashtags=究極の選択メーカー&url=https://www.choice-maker.site/m/'+ this.$route.query.d"
          target="_blank" rel="noopener"
          role="button">
          <i class="fab fa-twitter"></i>問いかける</a>
      </div>
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
var db = firebase.firestore();
export default {
  components: {
  },
  data() {
    return {
      likeSum: 0,
      likedFlg: false,
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
        this.$router.push('login')
      }
    });
    var docRef = db.collection("questions").doc(this.$route.query.d);
    this.getQuestionByDocumentId(docRef)
  },
  computed: {
    option1Rate(){
      return Math.floor(this.question.option1_choiced_user.length/(this.question.option1_choiced_user.length + this.question.option2_choiced_user.length)*100)
    },
    option2Rate(){
      return Math.floor(this.question.option2_choiced_user.length/(this.question.option1_choiced_user.length + this.question.option2_choiced_user.length)*100)
    },
    optionSum(){
      return this.question.option1_choiced_user.length + this.question.option2_choiced_user.length
    },
    // isLiked(){
    //   if(this.question.like_users){
    //     return this.question.like_users.includes(this.loginUser.uid)
    //   }
    //   return false
    // },
  },
  methods: {
    addLikeUsr(){
      var docRef = db.collection("questions").doc(this.$route.query.d);
      docRef.update({
            "like_users": firebase.firestore.FieldValue.arrayUnion(this.loginUser.uid),
        })
      this.likeSum ++ 
      this.likedFlg = true
    },
    delLikeUsr(){
      var docRef = db.collection("questions").doc(this.$route.query.d);
      docRef.update({
            "like_users": firebase.firestore.FieldValue.arrayRemove(this.loginUser.uid),
        })
      this.likeSum --
      this.likedFlg = false
    },
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
            this.likeSum = this.question.like_users.length
            this.likedFlg = this.question.like_users.includes(this.loginUser.uid)
          } else {
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    },
  }
}
</script>

<style>
.like-btn{
  font-size: 20px;
  color: #55c500;
  background-color: #fff;
  border: 2px solid #55c500;
  border-radius: 90%;
  outline: none;
}
.like-count{
  color: #55c500;
}
.content-area{
  background-color:white;
  border: 1px solid #a7a7aa;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 8px 16px;
}
.quest-board {
    background-color:#ffd31a;
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
  color: red;
  /* background-color:silver; */
  /* border-bottom:solid 2px dimgray; */
}
.optionB_title{
  color: blue;
  /* background-color: silver; */
  /* border-bottom:solid 2px dimgray; */
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

