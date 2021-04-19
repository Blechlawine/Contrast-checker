<template>
  <div>
    <GradientPickerField :r="rgb.r" :g="rgb.g" :b="rgb.b" :key="componentKey"/>
    <HueSlider @hslemit="this.updateRGB"/>
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
  data: function () {
    return {
      rgb: {
        r: 255,
        g: 0,
        b: 0
      },
      componentKey: 0
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
    }
  }
}
</script>

<style scoped>
</style>