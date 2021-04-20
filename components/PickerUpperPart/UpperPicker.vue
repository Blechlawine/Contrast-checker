<template>
  <div>
    <div id="container">
      <GradientPickerField :r="rgb.r" :g="rgb.g" :b="rgb.b" :w="this.width" :key="componentKey" style="padding-top: 1vh" @finRGBemit="updateFinRGB"/>
      <div id="flexwrapper">
        <HueSlider @hslemit="this.updateRGB" id="slider"/>
      </div>
    </div>
    <div :style="styleTest" style="height: 100px; width: 100px"></div>
  </div>
</template>

<script>

//Store to exchange data

import GradientPickerField from "../Picker/GradientPickerField";
import HueSlider from "../Slider/HueSlider";
import * as chroma from 'chroma-js'

export default {
  name: "UpperPicker",
  components: {
    GradientPickerField,
    HueSlider
  },
  computed: {
    styleTest() {
      return 'background: rgb(' + this.finRGB.r + ", " + this.finRGB.g + ", " + this.finRGB.g + ")";
    }
  },
  data: function () {
    return {
      rgb: {
        r: 255,
        g: 0,
        b: 0
      },
      finRGB: {
        r: 255,
        g: 0,
        b: 0
      },
      componentKey: 0,
      width: 500
    }
  },
  methods: {
    updateRGB: function (hsl) {
      let hslString = 'hsl(' + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)"
      let newRGB = chroma(hslString).rgb();
      this.$set(this.rgb, 'r', newRGB[0]);
      this.$set(this.rgb, 'g', newRGB[1]);
      this.$set(this.rgb, 'b', newRGB[2]);
      this.componentKey += 1;
    },
    updateFinRGB: function (rgb) {
      this.$set(this.finRGB, 'r', rgb.r)
      this.$set(this.finRGB, 'g', rgb.g)
      this.$set(this.finRGB, 'b', rgb.b)
      console.log(this.finRGB.r + " " + this.finRGB.g + " " + this.finRGB.b);
    }
  }
}
</script>

<style scoped>

#container {
  width: 500px;
  height: 1000px;
  background-color: #2E2E2E;
  border-radius: 20px;
}

#flexwrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

#slider {
  width: 90%;
}

</style>