<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
        <!-- <HueSlider/>
        <SatValPicker/> -->
        <ColorPickerBig/>
        <!-- <ColorPicker/>
        <NumberInput :number="5"/>
        <Dropdown :values="this.colorsDropdown" />
        <CopyField typ="hex"/>
        <Sliderpart :sliders="['rgb.r', 'rgb.g', 'rgb.b']"/> -->
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPickerBig from "../components/Picker/ColorPickerBig.jsx";
// import NumberInput from "../components/Input/NumberInput.jsx";
// import Dropdown from "../components/Input/Dropdown.jsx";
// import CopyField from "../components/Input/CopyField.jsx";
// import Sliderpart from "../components/Picker/Sliderpart.jsx";

export default {
    name: 'index',
    components: {
        MenuBar,
        // CopyField,
        // ColorPicker,
        // NumberInput,
        // Dropdown,
        // Sliderpart,
        ColorPickerBig
    },
    data() {
        return {
            tabs: [
                { id: 0, title: "Contrast-checker", link: "/", active: true },
                { id: 1, title: "Palette", link: "/palette" },
                { id: 2, title: "Converter", link: "/converter" }
            ],
            colorsDropdown: [
                "RGB",
                "HSL",
                "CMYK",
                "LAB",
                "XYZ",
                "Copic",
                "RAL",
                "HKS",
                "Name",
                "HEX",
                "Picker"
            ]
        }
    }
}
</script>

<style>
</style>
