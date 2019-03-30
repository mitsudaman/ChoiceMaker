<template>
  <b-container class="px-md-5 mt-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-paint-brush awesome-green"></i> 究極の選択メーカー
    </h1>
    <!-- <div class="text-center">
      <img src="~/assets/img/top_image.png" class="top"/>
    </div> -->
<!-- {{loginUser}}a -->
    <div class="text-right">
      <b-button 
        variant="outline-primary"
        @click="signIn">
        <i class="fas fa-sign-in-alt awesome-blue"></i>
      </b-button>
    </div>
    <div class="text-right">
      <b-button 
        variant="outline-primary"
        @click="signOut">
        <i class="fas fa-sign-in-alt awesome-blue"></i>
      </b-button>
    </div>
    <h2 class="text-center mt-5 h3">
        <i class="fas fa-crown awesome-darkgoldenrod"></i>ランキング
    </h2>
    <div 
      v-for="row in questions"
      v-bind:key="row.id"
      class="question">
    
      <a 
       :href="'/read?d=' + row.documentId" class="row rounded back-white mt-3 mx-1">
        <div class="board rounded col-12 col-md-6 px-0">
          <div class="board_inner text-center rounded no-gutters">
              <p class="h4 pt-1 font-weight-bold p-1">
                {{row.data.question}}
              </p>
          </div>
        </div>
        <div class="col-12 col-md-6 p-3">
          <div class="row px-md-1">
            <div class="col-12 text-primary font-weight-bold text-truncate">
              <span>A: {{row.data.option1}}</span>
            </div>
            <div class="col-12 text-primary font-weight-bold text-truncate">
              <span>B: {{row.data.option2}}</span>
            </div>
            <div class="col-12 text-secondary mt-4 text-truncate">
              <small>作:{{row.data.user_name}}さん</small>
            </div>
          </div>
        </div>





      </a>
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
      loginUser: null,
      option1: '',
      option2: '',
      choiced: false,
      isAChoiced: false,
      isBChoiced: false,
      createLoadFlg: false,
      createdFlg: false,
      questions: [],
      lastVisible: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.loginUser = user;
      } else {
      }
    });
      return this.getRankQestions(true);
  },
  methods: {
    signIn() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signOut(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      console.log("signOut")
      }).catch(function(error) {
        // An error happened.
      });
    },
    pageNext() {
      this.getRankQestions(false)
    },
    getRankQestions(firstFlg) {
      var dbCollection = db.collection("questions")
      // tag 有りの場合
      if(this.$route.query.t != null){
        dbCollection = dbCollection.where("tags","array-contains",this.$route.query.t)
      }

      dbCollection = dbCollection
        // .orderBy("read_count","desc")
        // .limit(10);

      // もっとみる 時
      if(!firstFlg){
        dbCollection = dbCollection.startAfter(this.lastVisible);
      }

      return dbCollection.get().then((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
              this.questions.push({
                  documentId: doc.id,
                  data: doc.data()
                })
          });
          // Get the last visible document
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      });
    }
  }
}
</script>

<style>
.question a {
  color: #000;
  transition: all .3s;
  text-decoration: none;
}
.question a:hover{
  color: #000;
  text-decoration: none;
  transform: scale(1.1,1.1);
}
.back-white{
  background-color: white;
}
.board {
  background-color:#ffd31a;
  height: 130px;
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
.board_inner {
  overflow: hidden;
  word-break: break-all;
}
.user_img {
  width: 30px;
  height: 30px;
}
.border_radius{
  border-radius: 100px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
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

