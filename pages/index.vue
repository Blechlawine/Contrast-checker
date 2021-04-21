<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
        <!-- <HueSlider/>
        <SatValPicker/> -->
        <ColorPicker/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPicker from "../components/Picker/ColorPicker.jsx";
// import HueSlider from "../components/Slider/HueSlider.jsx";
// import SatValPicker from "../components/Picker/SatValPicker.jsx";

export default {
    name: 'index',
    components: {
        MenuBar,
        ColorPicker
        // HueSlider,
        // SatValPicker
    },
    data() {
        return {
            tabs: [
                { id: 0, title: "Contrast-checker", link: "/", active: true },
                { id: 1, title: "Palette", link: "/palette" },
                { id: 2, title: "Converter", link: "/converter" }
            ]
        }
    }
}
</script>

<style>
</style>
