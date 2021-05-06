<template>
    <div id="app">
        <div class="palette">
            <MenuBar appName="Untitled Vue App" :tabs="tabs"/>
            <div class="settingsBar">
                <Dropdown :values="this.harmonyValues" v-on:onSelect="this.changeHarmony"/>
                <Dropdown :values="this.displayTypes" v-on:onSelect="this.changeDisplayType"/>
                <ImgButton icon="share" v-on:onClick="this.share"/>
            </div>
            <div class="paletteColors">
                <div v-for="color in this.colors" class="paletteColor" :style="`background-color: ${color.hex}; color: ${textColor(color.hex)}`">
                    <div class="addColorLeft">
                        <span v-if="color.id == 0" style="transform: translateX(50%)" v-on:click="addColor(color.id)" class="material-icons">add</span>
                    </div>
                    <div class="colorInfo">
                        <p class="colorLabel">
                            {{color.hex}}
                        </p>
                        <span class="material-icons copyIcon" v-on:click="copyColor(color.hex)">content_copy</span>
                        <span :class="pinClasses(color.locked)" :style="`opacity: ${color.locked ? '1' : '0.6'}`" v-on:click="pinColor(color)">push_pin</span>
                        <span class="material-icons" v-on:click="deleteColor(color)">delete</span>
                    </div>
                    <div class="addColorRight">
                        <span :style="((color.id != colors.length - 1) ? 'transform: translateX(calc(50%))' : 'transform: translateX(-50%)')" class="material-icons" v-on:click="addColor(color.id + 1)">add</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import Dropdown from "../components/Input/Dropdown.jsx";
import ImgButton from "../components/Button/ImgButton.vue"

import {copyString} from "../assets/utils.js";
import * as chroma from "chroma-js";

export default {
    name: 'palette',
    components: {
        MenuBar,
        Dropdown,
        ImgButton
    },
    data() {
        return {
            tabs: [
                { id: 0, title: "Contrast-checker", link: "/" },
                { id: 1, title: "Palette", link: "/palette", active: true },
                { id: 2, title: "Converter", link: "/converter" }
            ],
            harmonyValues: [
                "Auto",
                "Analogous",
                "Complementary",
                "Triadic",
                "Tetradic",
                "Square",
                "Random"
            ],
            displayTypes: [
                "HEX",
                "RGB",
                "HSL"
            ],
            colors: [
                {
                    id: 0,
                    hex: "#E35141",
                    locked: false
                },
                {
                    id: 1,
                    hex: "#4caf50",
                    locked: false
                },
                {
                    id: 2,
                    hex: "#ffeb3b",
                    locked: false
                },
                {
                    id: 3,
                    hex: "#03a9f4",
                    locked: false
                },
                {
                    id: 4,
                    hex: "#03a9f4",
                    locked: false
                }
            ],
            harmony: "Auto",
            selectedDisplayType: "HEX"
        }
    },
    methods: {
        changeHarmony(valueIndex) {
            this.harmony = this.harmonyValues[valueIndex];
        },
        changeDisplayType(valueIndex) {
            this.selectedDisplayType = this.displayTypes[valueIndex];
        },
        share() {
            console.log("Shared");
        },
        textColor(hex) {
            return chroma(hex).luminance() < 0.5 ? 'var(--text-white)' : 'var(--text-dark)';
        },
        copyColor(hex) {
            copyString(hex);
        },
        pinColor(color) {
            this.colors[color.id].locked = !this.colors[color.id].locked;
        },
        generateRandomColors() {
            for (let k = 0; k < this.colors.length; k++) {
                let color = this.colors[k];
                if (!color.locked) {
                    color.hex = chroma.random().hex();
                }
            }
        },
        pinClasses(locked) {
            if(locked) {
                return "material-icons pinIcon";
            } else {
                return "material-icons-outlined pinIcon";
            }
        },
        addColor(index) {
            if (this.colors.length < 10) {
                this.colors.splice(index, 0, {id: index, hex: chroma.random().hex(), locked: false});
                this.updateColorIndizes();
            }
        },
        deleteColor(color) {
            if(this.colors.length > 1) {
                this.colors = this.colors.filter((col, index, arr) => {
                    return col.id != color.id;
                });
                this.updateColorIndizes();
            }
        },
        updateColorIndizes() {
            for (let k = 0; k < this.colors.length; k++) {
                this.colors[k].id = k;
            }
        }
    },
    mounted() {
        this.generateRandomColors();
        document.addEventListener("keypress", (event) => {
            if (event.code == "Space") {
                this.generateRandomColors();
            }
        });
    }
}
</script>

<style>
.palette .settingsBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 6px;
    grid-gap: 12px;

    border-bottom: var(--light-gray) solid 2px;
}

.palette .paletteColors {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100vw;
    /* 60px menubar, 54px settingsbar, 4px borders between */
    height: calc(100vh - 60px - 54px - 4px);
}

.palette .paletteColor {
    width: 100%;
    height: 100%;
    text-align: center;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    /* padding: 24px; */
}

.palette .colorInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 24px;
}

.palette .paletteColor * {
    color: inherit;
}

.palette .paletteColor span {
    font-size: 28px;
}

.palette .colorLabel {
    font-size: 24px;
}

.palette .copyIcon, .palette .pinIcon {
    cursor: pointer;
}

.palette .addColorRight span, .palette .addColorLeft span {
    background-color: var(--background);
    border-radius: 50%;
    color: var(--text-dark)
}

.palette .addColorRight {
    width: 28px;
    height: 28px;
    float: right;
}

.palette .addColorLeft {
    width: 28px;
    height: 28px;
    float: left;
}

</style>
