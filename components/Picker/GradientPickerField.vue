<template>
  <div>
    <input type="range" min="0" max="255" v-model="r" v-on:change="this.updateRGB"/>
    <div id="slider"></div>
    <canvas id="gradient"></canvas>
    <div id="selectedColor"></div>
  </div>
</template>

<script>

import GradientField from "./GradientField";

export default {
  name: "GradientPickerField",
  methods: {
    printRGB: function () {
      console.log(this.r + " " + this.g + " " + this.b);
    },
    updateRGB: function () {
      this.picker.updateRGB(this.r, this.g, this.b);
    }
  },
  data: () => {
    return {
      r: 188,
      g: 155,
      b: 27,
      picker: undefined
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.picker = new GradientField(document.getElementById("gradient"), 200, 200, this.r, this.g, this.b);
      this.picker.draw();
      console.log("mounted");
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