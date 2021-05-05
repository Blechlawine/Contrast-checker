<template>
<div id="app">
    <MenuBar appName="Untitled Vue App" :tabs="tabs" />

    <div class="content">
        <div class="column">
            <ColorPickerBig :hueIn="0" :satIn="0.8" :valIn="0.8" v-on:colorChanged="this.updateColor"/>
        </div>
        <div class="column">
            <h2>Color</h2>
            <div id="color" :style="this.colorStyle">{{this.colorName}}</div>
            <h2>Adjustments</h2>
            <Sliderpart label="Lighten" :min="0" :max="100" :valueIn="0" :background="this.lighten" v-on:change="this.lightenFactorChange"/>
            <Sliderpart label="Darken" :min="0" :max="100" :valueIn="0" :background="this.darken" v-on:change="this.darkenFactorChange"/>
            <Sliderpart label="Saturate" :min="0" :max="100" :valueIn="0" :background="this.saturate" v-on:change="this.saturationFactorChange"/>
            <Sliderpart label="Desaturate" :min="0" :max="100" :valueIn="0" :background="this.desaturate" v-on:change="this.desaturationFactorChange"/>
        </div>
        <div class="column">
            <h2>Converted</h2>
            <CopyField :value="this.hexText"/>
            <CopyField :value="this.rgbText"/>
            <CopyField :value="this.hslText"/>
            <CopyField :value="this.cmykText"/>
            <CopyField :value="this.labText"/>
        </div>
    </div>
</div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPickerBig from "../components/Picker/ColorPickerBig";
import CopyField from "../components/Input/CopyField.jsx";
import Sliderpart from "../components/Slider/Sliderpart.jsx";

import * as chroma from 'chroma-js';
import {scale} from "../assets/utils.js";

export default {
    name: 'converter',
    components: {
        Sliderpart,
        ColorPickerBig,
        MenuBar,
        CopyField
    },
    data() {
        return {
            tabs: [{
                    id: 0,
                    title: "Contrast-checker",
                    link: "/"
                },
                {
                    id: 1,
                    title: "Palette",
                    link: "/palette"
                },
                {
                    id: 2,
                    title: "Converter",
                    link: "/converter",
                    active: true
                }
            ],
            hue: 100,
            saturation: 100,
            value: 50,
            hex: "",
            names: [],
            desaturationFactor: 0,
            saturationFactor: 0,
            darkenFactor: 0,
            lightenFactor: 0,
            colorName: ""
        }
    },
    methods: {
        updateColor({ hue, sat, val }) {
            this.hue = hue;
            this.saturation = sat;
            this.value = val;
            this.hex = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            }).hex();
        },
        updateColorName() {
            if (this.names.length != 0) {
                this.sortNames();
                this.colorName = this.names[0].name;
            }
        },
        sliidee(value) {
            this.factor = value;
        },
        sortNames() {
            this.names.sort((a, b) => {
                let aDist = chroma.distance(a.hex, this.hex);
                let bDist = chroma.distance(b.hex, this.hex);
                return aDist - bDist;
            });
        },
        async getData() {
            let data = await fetch("/api/colors/name");
            this.names = await data.json();
            this.sortNames();
            this.colorName = this.names[0].name;
        },
        lightenFactorChange(value) {
            this.lightenFactor = value;
        },
        darkenFactorChange(value) {
            this.darkenFactor = value;
        },
        saturationFactorChange(value) {
            this.saturationFactor = value
        },
        desaturationFactorChange(value) {
            this.desaturationFactor = value;
        }
    },
    mounted() {
        this.getData();
    },
    computed: {
        desaturate() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation - scale(this.desaturationFactor, 0, 100, 0, this.saturation),
                v: this.value
            });
            return chrome.css();
        },
        saturate() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation + scale(this.saturationFactor, 0, 100, 0, 1 - this.saturation),
                v: this.value
            });
            return chrome.css();
        },
        darken() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value - scale(this.darkenFactor, 0, 100, 0, this.value)
            });
            return chrome.css();
        },
        lighten() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let hslh = Math.round(chrome.get("hsl.h"));
            let hsls = Math.round(chrome.get("hsl.s") * 100);
            let hsll = Math.round(chrome.get("hsl.l") * 100);
            return `hsl(${hslh}, ${hsls}%, ${hsll + scale(this.lightenFactor, 0, 100, 0, 100 - hsll)}%)`;
        },
        grayscale() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let rColor = chrome.get("rgb.r");
            let gColor = chrome.get("rgb.g");
            let bColor = chrome.get("rgb.b");

            let gray = (rColor + gColor + bColor) / 3;

            return {
                "background": 'rgb(' + gray + ", " + gray + ", " + gray + ")",
                "width": 100 + "px",
                "height": 100 + "px"
            }

        },
        hexText() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return chrome.hex();
        },
        rgbText() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return chrome.css();
        },
        cmykText() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let cmykc = Math.round(chrome.get("cmyk.c") * 100);
            let cmykm = Math.round(chrome.get("cmyk.m") * 100);
            let cmyky = Math.round(chrome.get("cmyk.y") * 100);
            let cmykk = Math.round(chrome.get("cmyk.k") * 100);
            return `cmyk(${cmykc}, ${cmykm}, ${cmyky}, ${cmykk})`
        },
        hslText() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let hslh = Math.round(chrome.get("hsl.h"));
            let hsls = Math.round(chrome.get("hsl.s") * 100);
            let hsll = Math.round(chrome.get("hsl.l") * 100);
            return `hsl(${hslh}, ${hsls}, ${hsll})`
        },
        labText() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let labl = Math.round(chrome.get("lab.l"));
            let laba = Math.round(chrome.get("lab.a"));
            let labb = Math.round(chrome.get("lab.b"));
            return `lab(${labl}, ${laba}, ${labb})`
        },
        colorStyle() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return {
                "background": `${chrome.css()}`
            };
        }
    }
}
</script>
<style>
.content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    grid-gap: 24px;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    grid-gap: 8px;

    min-width: 24ch;
}

#color {
    border-radius: 12px;

    width: 25vw;
    height: 25vh;
}

#color > * {
    margin-left: 50%;
    margin-top: 50%;
    transform: translate(-50%, -50%);
}

.column > .copyField {
    width: 100%;
}

.column > .copyField > p {
    flex-grow: 1000;
}

.sliderpartpart {
    border-radius: 12px;
    width: 100%;
    padding: 8px;
}

</style>
