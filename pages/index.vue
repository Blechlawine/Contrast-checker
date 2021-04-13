<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
    </div>
</template>

<script>
import MenuBar from "../components/MenuBar/Menubar.vue";

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
:root {
    --text-dark: #2E2E2E;
    --text-white: #FFFFFF;
    --light-gray: #E9E9E9;
    --accent: #00BCD4;
    --gray: #BBBBBB;
    --shadow: rgba(97, 97, 97, 0.18);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: "Roboto", sans-serif;
    color: var(--text-dark);
}
</style>
