<template>
  <div>
    <GradientPickerField/>
    <HueSlider/>
  </div>
</template>

<script>

//Store to exchange data

import GradientPickerField from "../Picker/GradientPickerField";
import HueSlider from "../Slider/HueSlider";

export default {
  name: "UpperPicker",
  components: {
    GradientPickerField,
    HueSlider
  }
}
</script>

<style scoped>

</style>