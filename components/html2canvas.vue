<template>
  <div>
    <!-- SOURCE -->
    <div ref="printMe">
      <h1>Print me!</h1>
    </div>
    <button @click="print">aaaaa</button>
    <!-- OUTPUT -->
    <img :src="output">
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      output: null
    }
  },
  methods: {
    print() {
      html2canvas(document.body).then(function(canvas) {
        document.body.appendChild(canvas);
      });
      // const el = this.$refs.printMe;
      // // add option type to get the image version
      // // if not provided the promise will return 
      // // the canvas.
      // const options = {
      //   type: 'dataURL'
      // }
      // this.output =  this.$html2canvas(el, options);
    }
  }
}
</script> 