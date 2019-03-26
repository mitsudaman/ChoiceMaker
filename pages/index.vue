<template>
  <b-container class="px-md-5 mt-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-paint-brush awesome-green"></i> 究極の選択メーカー
    </h1>
    <!-- <div class="text-center">
      <img src="~/assets/img/top_image.png" class="top"/>
    </div> -->

    <h2 class="text-center mt-4 h3">
        <i class="fas fa-newspaper awesome-blue"></i>お知らせ
    </h2>
    <div class="card mt-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 h5 text-center">
             <a href="/create?t=ブラック企業川柳">ブラック企業での悲しい体験や辛い経験を大募集！！！ </a>
          </div>
        </div>
      </div>
    </div>
    
    <h2 class="text-center mt-5 h3">
        <i class="fas fa-crown awesome-darkgoldenrod"></i>ランキング
    </h2>
    <div 
      v-for="row in questions"
      v-bind:key="row.id"
      class="card mt-3">
      <div class="card-body haiku-card">
        <div class="row no-gutters">
          <div class="col-9 col-md-10 pl-md-4 font-weight-bold h3">
            {{row.data.haiku1}}</div>
          <div class="col-3  no-gutters col-md-2 text-right">
            <a :href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&amp;hashtags=俳句メーカー,' + (row.data.tags).join(',') + '&amp;url=https://www.haiku-maker.site/m/' + row.documentId" target="_blank" rel="noopener" role="button" class="btn btn-block btn-tw p-1 p-md-2"><i class="fab fa-twitter"></i>シェア</a>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-2">
          </div>
          <div class="col-md-10 font-weight-bold h3">
            {{row.data.haiku2}}
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-0 col-md-4">
          </div>
          <div class="col-9 col-md-6 font-weight-bold h3">
            {{row.data.haiku3}}
          </div>
          <div class="col-3 col-md-2 pr-2 pt-3 text-right">
             <a :href="'/read/?d=' + row.documentId ">>>詳細</a>
          </div>
        </div>
        <div 
        v-if="row.data.tags"
        class="row no-gutters">
          <div class="col-9 pl-md-4">
            <a 
            v-if="row.data.tags[0]"
            :href="'/ranking/?t=' + row.data.tags[0]">#{{row.data.tags[0]}}</a>
            <a 
            v-if="row.data.tags[1]"
            :href="'/ranking/?t=' + row.data.tags[1]">#{{row.data.tags[1]}}</a>
            <a 
            v-if="row.data.tags[2]"
            :href="'/ranking/?t=' + row.data.tags[2]">#{{row.data.tags[2]}}</a>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-center mt-4 h3">
        <i class="fas fa-users awesome-yellow"></i>人気のタグ一覧
    </h2>
    <div class="card p-3 mt-3">
      <div class="tag-container">
        <a 
          class="tag-content"
          :href="'/ranking/?t=IT川柳'">
          IT川柳
        </a>
        <a class="tag-content"
          :href="'/ranking/?t=ブラック企業川柳'">
          ブラック企業川柳
        </a>
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
      return this.getRankQestions(true);
  },
  methods: {
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

