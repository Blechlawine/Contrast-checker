<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
        <!-- <HueSlider/>
        <SatValPicker/> -->
        <ColorPicker/>
        <NumberInput :number="5"/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPicker from "../components/Picker/ColorPicker.jsx";
import NumberInput from "../components/Input/NumberInput.jsx";

export default {
    name: 'index',
    components: {
        MenuBar,
        ColorPicker,
        NumberInput
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
