<template>
    <header>
        <p>{{appName}}</p>
        <Tabs :tabs="tabs"></Tabs>

        <div class="rightStuff">
            <ToggleSwitch></ToggleSwitch>
            <ImgButton large icon="more_vert" />
        </div>
    </header>
</template>

<script>
    // import "./menuBar.css";
    import ImgButton from "../Button/ImgButton.vue";
    import Tabs from "./Tabs.jsx";
    import ToggleSwitch from "../Switch/ToggleSwitch.jsx";

    export default {
        name: "menubar",
        components: { // Liste der Komponenten, die im template benutzt werden
            ImgButton,
            Tabs,
            ToggleSwitch
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

<style>
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

.rightStuff {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-gap: 12px;
}
</style>
