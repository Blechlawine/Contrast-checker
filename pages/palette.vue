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
                <div v-for="color in this.colors" class="paletteColor"
                     :style="`background-color: ${color.hex}; color: ${textColor(color.hex)}`">
                    <div class="addColorLeft">
                        <span v-if="color.id == 0" style="transform: translateX(50%)" v-on:click="addColor(color.id)"
                              class="material-icons">add</span>
                    </div>
                    <div class="colorInfo">
                        <p class="colorLabel">
                            {{ getDisplayText(color.hex) }}
                        </p>
                        <span class="material-icons copyIcon" v-on:click="copyColor(color.hex)">content_copy</span>
                        <span :class="pinClasses(color.locked)" :style="`opacity: ${color.locked ? '1' : '0.6'}`"
                              v-on:click="pinColor(color)">push_pin</span>
                        <span class="material-icons" v-on:click="deleteColor(color)">delete</span>
                    </div>
                    <div class="addColorRight">
                        <span
                            :style="((color.id != colors.length - 1) ? 'transform: translateX(calc(50%))' : 'transform: translateX(-50%)')"
                            class="material-icons" v-on:click="addColor(color.id + 1)">add</span>
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
                {id: 0, title: "Contrast-checker", link: "/"},
                {id: 1, title: "Palette", link: "/palette", active: true},
                {id: 2, title: "Converter", link: "/converter"}
            ],
            harmonyValues: [
                "Auto",
                "Analogous",
                "Monochromatic",
                "Complementary",
                "Split-complementary",
                "Triadic",
                "Tetradic",
                "Square",
                "Cool",
                "Warm",
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
                    hex: "#FFFFFF",
                    locked: false
                },
                {
                    id: 1,
                    hex: "#FFFFFF",
                    locked: false
                },
                {
                    id: 2,
                    hex: "#FFFFFF",
                    locked: false
                },
                {
                    id: 3,
                    hex: "#FFFFFF",
                    locked: false
                },
                {
                    id: 4,
                    hex: "#FFFFFF",
                    locked: false
                }
            ],
            harmony: "auto",
            selectedDisplayType: "HEX"
        }
    },
    methods: {
        getDisplayText(hexIn) {
            switch (this.selectedDisplayType.toLowerCase()) {
                case "hsl":
                    let hue = Math.round(chroma(hexIn).get("hsl.h"));
                    let sat = Math.round(chroma(hexIn).get("hsl.s") * 100);
                    let lig = Math.round(chroma(hexIn).get("hsl.l") * 100);
                    return `hsl(${isNaN(hue) ? 0 : hue}, ${sat}%, ${lig}%)`
                    break;
                case "rgb":
                    return chroma(hexIn).css();
                    break;
                case "hex":
                    return hexIn;
                    break;
            }
        },
        changeHarmony(valueIndex) {
            this.harmony = this.harmonyValues[valueIndex].toLowerCase();
            this.generateColorsForSelectedHarmony();
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
        getLockedColors() {
            let lockedColors = [];
            for (let k = 0; k < this.colors.length; k++) {
                if (this.colors[k].locked) lockedColors.push(this.colors[k]);
            }
            return lockedColors;
        },
        getUnlockedColors() {
            let unlocked = [];
            for (let k = 0; k < this.colors.length; k++) {
                if (!this.colors[k].locked) unlocked.push(this.colors[k]);
            }
            return unlocked;
        },
        generateAnalogousColors(startIndex, startColor) {
            // TODO: überarbeiten
            let startHue = startColor.get("hsl.h");
            let angles = [[startHue, startHue + 20, startHue + 40], [startHue, startHue - 20, startHue - 40]];
            let angleArray = angles[Math.round(Math.random())];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateMonochromaticColors(startIndex, startColor) {
            let startHue = startColor.get("hsl.h");
            let angleArray = [startHue];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateComplementaryColors(startIndex, startColor) {
            let startHue = startColor.get("hsl.h")
            let angles = [[startHue, startHue + 180], [startHue, startHue - 180]];
            let angleArray = angles[Math.round(Math.random())];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateSplitComplementaryColors(startIndex, startColor) {
            let startHue = startColor.get("hsl.h");
            let angles = [[startHue, startHue + 171, startHue + 99], [startHue, startHue - 171, startHue - 99]];
            let angleArray = angles[Math.round(Math.random())];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateTriadicColors(startIndex, startColor) {
            let startHue = startColor.get("hsl.h");
            let angles = [[startHue, startHue + 120, startHue + 240], [startHue, startHue - 120, startHue - 240]];
            let angleArray = angles[Math.round(Math.random())];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateRandomColors(startIndex, startColor) {
            for (let k = startIndex; k < this.colors.length; k++) {
                let color = this.colors[k];
                if (!color.locked) {
                    color.hex = chroma.random().hex();
                }
            }
        },
        generateSquareColors(startIndex, startColor) {
            let startHue = startColor.get("hsl.h");
            let angles = [[startHue, startHue + 90, startHue + 180, startHue + 270], [startHue, startHue - 90, startHue - 180, startHue - 270]];
            let angleArray = angles[Math.round(Math.random())];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateTetradicColors(startIndex, startColor) {
            let startHue = startColor.get("hsl.h");
            let angles = [[startHue, 60 + startHue, 180 + startHue, 240 + startHue], [startHue, startHue - 60, startHue - 180, startHue - 240]];
            let angleArray = angles[Math.round(Math.random())];
            this.generateColorsWithFixedHueOffset(startColor, angleArray);
        },
        generateColorsWithFixedHueOffset(startColor, hues) {
            let unlocked = this.getUnlockedColors();
            for (let i = 0; i < unlocked.length; i++) {
                let color = unlocked[i];
                if (!color.locked) {
                    let hue = startColor.get("hsl.h");
                    if (i < hues.length) {
                        hue = (hues[i]) % 360;
                    } else {
                        hue = (hues[Math.round(Math.random() * hues.length - 1)]) % 360;
                    }
                    let sat = (Math.random());
                    let lig = (Math.random());
                    color.hex = chroma(hue, sat, lig, "hsl").hex();
                }
            }
        },
        generateWarmColors(startIndex, startColor) {
            if (this.getLockedColors().length == 0) {
                startIndex = 0;
            }
            for (let k = startIndex; k < this.colors.length; k++) {
                let color = this.colors[k];
                if (!color.locked) {
                    let hue = (Math.random() * 110 + 310) % 360;
                    let sat = (Math.random());
                    let lig = (Math.random());
                    color.hex = chroma(hue, sat, lig, "hsl").hex();
                }
            }
        },
        generateCoolColors(startIndex, startColor) {
            if (this.getLockedColors().length == 0) {
                startIndex = 0;
            }
            for (let k = startIndex; k < this.colors.length; k++) {
                let color = this.colors[k];
                if (!color.locked) {
                    let hue = (Math.random() * 250 + 60) % 360;
                    let sat = (Math.random());
                    let lig = (Math.random());
                    color.hex = chroma(hue, sat, lig, "hsl").hex();
                }
            }
        },
        generateColorsForSelectedHarmony() {
            // https://www.luminous-landscape.com/color-harmonies-4-cool-warm-split-tetradic-and-square/
            let startColor = null;
            let locked = this.getLockedColors();
            let startIndex = 0;
            if (locked.length == 0) {
                startColor = chroma.random();
                this.colors[0].hex = startColor.hex();
                startIndex = 1;
            } else {
                let randIndex = Math.round(Math.random() * (locked.length - 1));
                startColor = chroma(locked[randIndex].hex);
            }
            switch (this.harmony) {
                case "auto":
                    let prob = Math.random() * 10;
                    if (prob < 1) {
                        this.generateRandomColors(startIndex, startColor);
                    } else if (prob < 2) {
                        this.generateAnalogousColors(startIndex, startColor);
                    } else if (prob < 3) {
                        this.generateTriadicColors(startIndex, startColor);
                    } else if (prob < 4) {
                        this.generateTetradicColors(startIndex, startColor);
                    } else if (prob < 5) {
                        this.generateComplementaryColors(startIndex, startColor);
                    } else if (prob < 6) {
                        this.generateSplitComplementaryColors(startIndex, startColor);
                    } else if (prob < 7) {
                        this.generateSquareColors(startIndex, startColor);
                    } else if (prob < 8) {
                        this.generateWarmColors(startIndex, startColor);
                    } else if (prob < 9) {
                        this.generateCoolColors(startIndex, startColor);
                    } else {
                        this.generateMonochromaticColors(startIndex, startColor);
                    }
                    break;
                case "random":
                    this.generateRandomColors(startIndex, startColor);
                    break;
                case "analogous":
                    this.generateAnalogousColors(startIndex, startColor);
                    break;
                case "triadic":
                    this.generateTriadicColors(startIndex, startColor);
                    break;
                case "tetradic":
                    this.generateTetradicColors(startIndex, startColor);
                    break;
                case "complementary":
                    this.generateComplementaryColors(startIndex, startColor);
                    break;
                case "split-complementary":
                    this.generateSplitComplementaryColors(startIndex, startColor);
                    break;
                case "square":
                    this.generateSquareColors(startIndex, startColor);
                    break;
                case "warm":
                    this.generateWarmColors(startIndex, startColor);
                    break;
                case "cool":
                    this.generateCoolColors(startIndex, startColor);
                    break;
                case "monochromatic":
                    this.generateMonochromaticColors(startIndex, startColor);
                    break;
                default:
                    break;
            }

            this.updateRoute();
        },
        pinClasses(locked) {
            if (locked) {
                return "material-icons pinIcon";
            } else {
                return "material-icons-outlined pinIcon";
            }
        },
        addColor(index) {
            if (this.colors.length < 10) {
                this.colors.splice(index, 0, {id: index, hex: chroma.random().hex(), locked: false});
                this.updateColorIndizes();
                this.updateRoute();
            }
        },
        deleteColor(color) {
            if (this.colors.length > 1) {
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
        },
        updateRoute() {
            let queryString = "";

            this.colors.map((color) => {
                queryString += color.hex.substring(1);
                if (color.id !== this.colors.length - 1) {
                    queryString += "-";
                }
            });
            this.$router.push({path: this.$route.path, query: {colors: queryString}});
        }
    },
    created() {
        // This is run on the server
        if(this.$route.query.colors == null) {
            this.generateColorsForSelectedHarmony();
        } else {
            let [...colorsIn] = this.$route.query.colors.split("-");
            this.colors = [];
            for (let i = 0; i < colorsIn.length; i++) {
                this.colors.push({
                    id: i,
                    hex: "#" + colorsIn[i].toUpperCase(),
                    locked: false
                });
            }
        }
    },
    mounted() {
        document.addEventListener("keypress", (event) => {
            if (event.code == "Space") {
                this.generateColorsForSelectedHarmony();
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
