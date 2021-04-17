<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
        <HueSlider/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import HueSlider from "../components/Slider/HueSlider.jsx";

export default {
    name: 'index',
    components: {
        MenuBar,
        HueSlider
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
