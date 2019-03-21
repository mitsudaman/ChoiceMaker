<template>
  <b-container class="px-md-5 mt-5">
    <b-row align-h="end">
      <b-col cols="4 text-right">
        <i class="fas fa-thumbs-up awesome-yellow"></i> 0いいね</b-col>
    </b-row>
    <div class="row mb-2">
      <div class="col-md-12">
        <div class="row no-gutters  rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col d-flex flex-column position-static">
            <div>
              <svg ref="svgArea" viewBox="0 0 200 100">
                <rect x="2.5" y="2.5" width="90" height="95" fill="#fff" stroke="#12b886" stroke-width="5"></rect>
                <rect x="107.5" y="2.5" width="90" height="95" fill="#fff" stroke="#cccccc" stroke-width="5"></rect>
                <!-- <rect x="0" y="0" width="100" height="100" fill="#fff" stroke="#12b886" stroke-width="15"></rect> -->
                <text 
                x="25%" 
                y="50%" 
                writing-mode="tb"
                glyph-orientation-vertical="0"
                font-size="8px"
                text-anchor="middle">{{option1}}</text>
                <text 
                x="75%" 
                y="50%" 
                writing-mode="tb"
                glyph-orientation-vertical="0"
                font-size="8px"
                text-anchor="middle">{{option2}}</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-6">
        <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-success">Design</strong>
            <h3 class="mb-0">Post title</h3>
            <div class="mb-1 text-muted">Nov 11</div>
            <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="stretched-link">Continue reading</a>
          </div>
        </div>
      </div> -->
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">回答1</label>
            <input  
              v-model="option1"
              class="form-control">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">回答2</label>
            <input  
              v-model="option2"
              class="form-control">
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
      createLoadFlg: false,
      createdFlg: false
    };
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
    }
  }
}
</script>

<style>

</style>

