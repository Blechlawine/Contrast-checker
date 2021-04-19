<template>
  <div>
    <!--<input type="range" min="0" max="255" v-model="r" v-on:change="this.updateRGB"/>
    <input type="range" min="0" max="255" v-model="g" v-on:change="this.updateRGB"/>
    <input type="range" min="0" max="255" v-model="b" v-on:change="this.updateRGB"/>-->
    <p>{{this.r + " " + this.g + " " + this.b}}</p>
    <div id="slider"></div>
    <canvas id="gradient"></canvas>
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
    b: Number
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

</style>