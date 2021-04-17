<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";

export default {
    name: 'index',
    components: {
        MenuBar
    },
    data() {
        return {
            tabs: [
                { id: 0, title: "Contrast-checker", active: true },
                { id: 1, title: "Palette" },
                { id: 2, title: "Converter" }
            ]
        }
    }
}
</script>

<style>
</style>
