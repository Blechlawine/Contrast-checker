<template>
    <header>
        <div class="top">
            <p>{{ $store.state.appName }}</p>

            <div class="rightStuff">
                <ToggleSwitch></ToggleSwitch>
            </div>
        </div>
        <div class="bottom">
            <Tabs :tabs="tabs"></Tabs>
        </div>
        <div class="announcement" v-if="showAnnouncement">
            <p>
                <b>Announcement:</b>
                Thank you for using Dyetools. This domain is going to stop working some time in november, which is why
                we're moving to a new domain: <a href="https://dyetools.zmarc.de/">https://dyetools.zmarc.de/</a>. The
                new version of dyetools is already available over there, so see you there!
            </p>
            <ImgButton @onClick="closeAnnouncement()" icon="close"></ImgButton>
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
    components: {
        // Liste der Komponenten, die im template benutzt werden
        ImgButton,
        Tabs,
        ToggleSwitch,
    },
    props: {
        tabs: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        showAnnouncement: true,
    }),
    methods: {
        closeAnnouncement() {
            this.showAnnouncement = false;
        },
    },
};
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

.announcement {
    background-color: var(--accent);
    border-bottom: 2px solid var(--light-gray);
}

.announcement a {
    color: var(--background);
    text-decoration: underline;
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

@media all and (min-width: 600px) {
    header div.bottom {
        margin-top: -64px;
    }

    header {
        height: 64px;
    }
}
</style>
