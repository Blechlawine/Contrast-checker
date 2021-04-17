<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";

export default {
    name: 'converter',
    components: {
        MenuBar
    },
    data() {
        return {
            tabs: [
                { id: 0, title: "Contrast-checker", link: "/" },
                { id: 1, title: "Palette", link: "/palette" },
                { id: 2, title: "Converter", link: "/converter", active: true }
            ]
        }
    }
}
</script>
