<template>
    <header>
        <div class="top">
            <p>{{$store.state.appName}}</p>

            <div class="rightStuff">
                <ToggleSwitch></ToggleSwitch>
            </div>
        </div>
        <div class="bottom">
            <Tabs :tabs="tabs"></Tabs>
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
    height: 128px;
    border-bottom: 2px solid var(--light-gray);
    top: 0;
    position: sticky;

    z-index: 20;
    background-color: var(--background);

}

header > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 8px 8px 8px 16px;
}

header .top {
    height: 64px;
}

header .bottom {
    justify-content: center;
}

.rightStuff {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-gap: 12px;
}

@media all and (min-width: 750px) {
    header div.bottom {
        margin-top: -64px;
    }

    header {
        height: 64px;
    }
}
</style>
