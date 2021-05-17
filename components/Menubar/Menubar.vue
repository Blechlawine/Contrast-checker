<template>
    <header>
        <p>{{appName}}</p>
        <Tabs :tabs="tabs"></Tabs>

        <ImgButton large icon="more_vert" />
    </header>
</template>

<script>
    // import "./menuBar.css";
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

<style module>
header {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid var(--light-gray);
    top: 0;
    position: sticky;

    z-index: 20;
    background-color: var(--background);

    padding: 8px 8px 8px 16px;
}
</style>
