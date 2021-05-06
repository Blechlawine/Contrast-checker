<template>
    <header>
        <p>{{appName}}</p>
        <Tabs :tabs="tabs"></Tabs>

        <ImgButton large icon="more_vert" />
    </header>
</template>

<script>
    import "./menuBar.css";
    import ImgButton from "../Button/ImgButton.vue";
    import Tabs from "./Tabs.jsx";

    export default {
        name: "menubar",
        components: { // Liste der Komponenten, die im template benutzt werden
            ImgButton,
            Tabs
        },
        props: {
            appName: {
                type: String,
                required: true
            },
            tabs: {
                type: Array,
                required: true
            }
        }
    }
</script>
