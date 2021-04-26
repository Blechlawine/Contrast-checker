<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
        <ColorPickerBig/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPickerBig from "../components/Picker/ColorPickerBig.jsx";


export default {
    name: 'index',
    components: {
        MenuBar,
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
