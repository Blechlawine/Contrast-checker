<template>
  <div>
    <div id="slider"></div>
    <canvas id="gradient"></canvas>
    <div id="selectedColor"></div>
  </div>
</template>

<script>

import Picker from './Picker.js';

export default {
  name: "Gradientpicker",
  methods: {
    printRGB: function () {
      console.log(this.r + " " + this.g + " " + this.b);
    }
  },
  data: () => {
    return {
      r: 255,
      g: 0,
      b: 0
    }
  },
  mounted() {
    this.$nextTick(function () {
      let picker = new Picker(document.getElementById("gradient"), 200, 200, this.r, this.g, this.b);
      picker.draw();
    });
  }
}
</script>

<style scoped>

#selectedColor {
  width: 100px;
  height: 100px;
}

</style>