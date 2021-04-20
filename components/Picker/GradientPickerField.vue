<template>
  <div>
    <!--<input type="range" min="0" max="255" v-model="r" v-on:change="this.updateRGB"/>
    <input type="range" min="0" max="255" v-model="g" v-on:change="this.updateRGB"/>
    <input type="range" min="0" max="255" v-model="b" v-on:change="this.updateRGB"/>-->
    <p>{{this.r + " " + this.g + " " + this.b}}</p>
    <div id="slider"></div>
    <canvas id="gradient"></canvas>
    <!--<div id="test" style="width: 100px; height: 100px"></div>-->
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
      picker: undefined
    }
  },
  props: {
    r: Number,
    g: Number,
    b: Number,
    w: Number
  },
  mounted() {
    this.$nextTick(function () {
      this.picker = new GradientField(document.getElementById("gradient"), this.w, 200, this.r, this.g, this.b);
      setInterval(() => this.picker.draw(), 1);
      this.picker.onChange((color) => {
        /*let test = document.getElementById("test");
        let rgbString = 'rgb(' + color.r + ", " + color.g + ", " + color.b + ")";
        test.style.backgroundColor = rgbString
        console.log(rgbString);*/
        this.$emit('finRGBemit', color)
      })
      console.log("mounted");
    });
  }
}

</script>

<style scoped>

</style>