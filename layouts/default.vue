<template>
  <div>
    <header>
      <div>
        <b-navbar toggleable="sm" type="light" variant="light"  class="px-md-5 bg-white text-center">
          <b-navbar-brand href="/">
            <i class="fas fa-hand-point-up awesome-darkgoldenrod"></i>チョイス!
          </b-navbar-brand>

          <b-navbar-toggle target="nav_collapse" />

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class=" text-right">
              <b-nav-item href="/" class="mx-md-1">
                <i class="fas fa-star awesome-blue"></i> トップ
              </b-nav-item>
              <b-nav-item href="#" class="mx-md-1">
                <i class="fas fa-trophy awesome-orange"></i> コンテスト(準備中)
              </b-nav-item>
              <b-nav-item href="/ranking" class="mx-md-1">
                <i class="fas fa-crown awesome-darkgoldenrod"></i> ランキング
              </b-nav-item>
              <b-nav-item href="/create" class="mx-md-1">
                <i class="fas fa-pencil-alt awesome-green"></i> 選択をつくる
              </b-nav-item>
              <b-nav-item v-if="!loginFlg" href="/login" class="mx-md-1">
                <span class="login-link p-1"><i class="fas fa-sign-in-alt awesome-blue"></i> ログイン</span>
              </b-nav-item>
              <b-nav-item v-if="loginFlg" @click="signOut" class="mx-md-1">
                <span class="login-link p-1"><i class="fas fa-sign-in-alt awesome-blue"></i> ログアウト</span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
    <nuxt/>
    <footer class="text-center mt-5 mt-lg-4 px-5">
      <div>
        <ul class="footer">
          <li><a href="/">トップ</a> ｜</li>
          <li><a href="/term">利用規約</a> ｜</li>
          <li><a 
          href="https://twitter.com/mitudama" 
          target="_blank" rel="noopener">運営</a> ｜</li>
        </ul>
      </div>
      <div>
        開発・運営
        <img 
          src="~/assets/img/mitsudama.png" 
          width="30"
          height="30"
          class="pb-1 border-4"
          alt="mitsudama">
        <a 
          href="https://twitter.com/mitudama" 
          target="_blank" rel="noopener">@mitudama</a> Copyright ©2019 All rights reserved.
      </div>
    </footer>
  </div>
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
      loginFlg: false
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
  methods: {
    signOut(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      console.log("signOut")
      }).catch(function(error) {
        // An error happened.
      });
    },
  }
}
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  /* background-color:grey !important; */
  background-color:#f8f9fa !important;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  max-width: 800px;
}
.login-link{
  border: 1px solid transparent;
  color: #007bff;
  border-color: #007bff;
  border-radius: 0.25rem;
}

.btn-haiku-create {
  color: white;
  background-color: green
}
.btn-tw {
  color: white;
  background-color: #00aced;
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
}
ul.footer li {
display: inline;
text-align: center;
}

.bg-white {
  background-color: white;
}

.awesome-green {color: green}
.awesome-red {color: red}
.awesome-blue {color: deepskyblue}
.awesome-yellow {color:gold}
.awesome-orange {color:orange}
.awesome-darkgoldenrod {color:darkgoldenrod}
.awesome-black {color: black}
.awesome-white {color: white}
</style>

