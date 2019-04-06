<template>
  <b-container class="px-md-5 mt-5">
    <div class="card">
      <div class="card-body">
        <!-- <h2>ログイン</h2> -->
        ボタンをクリックするとTwitterログイン画面に移動します<br>
        <span class="font-weight-bold">※ログイン後数秒お待ちください</span>(トップページへリダイレクトされます)
        <div 
        class="mt-3">
          <b-button 
            class="btn btn-block btn-tw p-2" 
            @click="signIn">
            <span class="h3">
              <i class="fab fa-twitter"></i>ログイン
            </span>
          </b-button>
        </div>  
      </div>
    </div> 
    <div class="card mt-4">
      <div class="card-body">
        究極の選択メーカーは質問を作成した方の情報を識別するためにTwitterアカウントの連携を必要としています。
        <ul>
          <li>連携許可をログイン以外の目的で使用することはありません。</li>
          <li>あなたのアカウントからツイートすることはありません。</li>
          <li>DMなどを勝手に送信することはありません。</li>
        </ul>
        
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
        this.$router.push("/")
      } else {
      }
    });
  },
  methods: {
    signIn() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
  }
}
</script>

<style>
</style>

