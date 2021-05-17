<template>
<div id="app">
    <MenuBar appName="Untitled Vue App" :tabs="tabs" />
    <div class="content">
        <div class="column">
            <ColorPickerBig :hueIn="this.hue" :satIn="this.saturation" :valIn="this.value" v-on:colorChanged="this.updateColor" v-on:onChangeEnd="this.updateColorName" />
        </div>
        <div class="column">
            <h2>Color</h2>
            <div id="color" :style="this.colorStyle">
                <p class="centeredText" :style="this.optimalTextColor">{{this.colorName}}</p>
            </div>
            <h2>Adjustments</h2>
            <div class="sliderpartParent" :style="this.lightenStyle">
                <Sliderpart label="Lighten" :min="0" :max="100" :valueIn="50" :background="this.lighten" v-on:change="this.lightenFactorChange" :handleBackground="this.lighten" :sliderBackground="this.lightenSliderBackground" />
                <div class="horizontalFlex">
                    <CopyField :value="this.hexCopylighten" />
                    <Button label="Apply" v-on:onClick="this.lightenClicked" />
                </div>
            </div>
            <div class="sliderpartParent" :style="this.darkenStyle">
                <Sliderpart label="Darken" :min="0" :max="100" :valueIn="50" :background="this.darken" v-on:change="this.darkenFactorChange" :handleBackground="this.darken" :sliderBackground="this.darkenSliderBackground" />
                <div class="horizontalFlex">
                    <CopyField :value="this.hexCopyDarken" />
                    <Button label="Apply" v-on:onClick="this.darkenClicked" />
                </div>
            </div>
            <div class="sliderpartParent" :style="this.saturateStyle">
                <Sliderpart label="Saturate" :min="0" :max="100" :valueIn="50" :background="this.saturate" v-on:change="this.saturationFactorChange" :handleBackground="this.saturate" :sliderBackground="this.saturateSliderBackground" />
                <div class="horizontalFlex">
                    <CopyField :value="this.hexCopySaturation" />
                    <Button label="Apply" v-on:onClick="this.saturationClicked" />
                </div>
            </div>
            <div class="sliderpartParent" :style="this.desaturateStyle">
                <Sliderpart label="Desaturate" :min="0" :max="100" :valueIn="50" :background="this.desaturate" v-on:change="this.desaturationFactorChange" :handleBackground="this.desaturate" :sliderBackground="this.desaturateSliderBackground" />
                <div class="horizontalFlex">
                    <CopyField :value="this.hexCopyDesaturation"/>
                    <Button label="Apply" v-on:onClick="this.desaturationClicked" />
                </div>
            </div>
        </div>
        <div class="column">
            <h2>Converted</h2>
            <CopyField :value="this.hexText" />
            <CopyField :value="this.rgbText" />
            <CopyField :value="this.hslText" />
            <CopyField :value="this.cmykText" />
            <CopyField :value="this.labText" />
        </div>
    </div>
</div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPickerBig from "../components/Picker/ColorPickerBig";
import CopyField from "../components/Input/CopyField.jsx";
import Sliderpart from "../components/Slider/Sliderpart.jsx";
import Button from "../components/Button/Button.jsx";

import * as chroma from 'chroma-js';
import {
    scale
} from "../assets/utils.js";

export default {
    name: 'converter',
    components: {
        Sliderpart,
        ColorPickerBig,
        MenuBar,
        CopyField,
        Button
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
            hue: 0,
            saturation: 1,
            value: 1,
            hex: "",
            names: [],
            desaturationFactor: 0,
            saturationFactor: 0,
            darkenFactor: 0,
            lightenFactor: 0,
            colorName: "",
            brightText: false
        }
    },
    methods: {
        updateColor({
            hue,
            sat,
            val
        }) {
            this.hue = hue;
            this.saturation = sat;
            this.value = val;
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            this.hex = chrome.hex();
            this.brightText = chrome.luminance() < 0.5;
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
            this.updateColorName();
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
        },
        lightenClicked() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });

            let chrome2 = chrome.set("hsl.l", chrome.get("hsl.l") + scale(this.lightenFactor, 0, 100, 0, 1 - chrome.get("hsl.l")));

            this.updateColor({
                hue: chrome2.get("hsv.h") || 0,
                sat: chrome2.get("hsv.s"),
                val: chrome2.get("hsv.v")
            });
            this.updateColorName();
        },
        darkenClicked() {
            this.updateColor({
                hue: this.hue,
                sat: this.saturation,
                val: this.value - scale(this.darkenFactor, 0, 100, 0, this.value)
            });
            this.updateColorName();
        },
        saturationClicked() {
            this.updateColor({
                hue: this.hue,
                sat: this.saturation + scale(this.saturationFactor, 0, 100, 0, 1 - this.saturation),
                val: this.value
            });
            this.updateColorName();
        },
        desaturationClicked() {
            this.updateColor({
                hue: this.hue,
                sat: this.saturation - scale(this.desaturationFactor, 0, 100, 0, this.saturation),
                val: this.value
            });
            this.updateColorName();
        }
    },
    mounted() {
        this.getData();
    },
    computed: {
        optimalTextColor() {
            return {
                "color": (this.brightText ? "var(--text-white)" : "var(--text-dark)")
            };
        },
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
            let hslh = Math.round(chrome.get("hsl.h")) || 0;
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
            };
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
            let hslh = Math.round(chrome.get("hsl.h")) || 0;
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
        },
        lightenSliderBackground() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let lightColor = `hsl(${chrome.get("hsl.h") || 0}, ${chrome.get("hsl.s")}%, 100%)`;
            return `linear-gradient(to right, ${chrome.css()}, ${lightColor})`
        },
        darkenSliderBackground() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let darkColor = chrome.set("hsv.v", 0).css();
            return `linear-gradient(to right, ${chrome.css()}, ${darkColor})`
        },
        saturateSliderBackground() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let saturated = chrome.set("hsv.s", 1).css();
            return `linear-gradient(to right, ${chrome.css()}, ${saturated})`
        },
        desaturateSliderBackground() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            let desaturated = chrome.set("hsv.s", 0).css();
            return `linear-gradient(to right, ${chrome.css()}, ${desaturated})`
        },
        lightenStyle() {
            return {
                "background-color": this.lighten
            };
        },
        darkenStyle() {
            return {
                "background-color": this.darken
            };
        },
        saturateStyle() {
            return {
                "background-color": this.saturate
            };
        },
        desaturateStyle() {
            return {
                "background-color": this.desaturate
            };
        },
        hexCopylighten() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });

            let chrome2 = chrome.set("hsl.l", chrome.get("hsl.l") + scale(this.lightenFactor, 0, 100, 0, 1 - chrome.get("hsl.l")));

            return chrome2.hex();
        },
        hexCopyDarken() {
            return chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value - scale(this.darkenFactor, 0, 100, 0, this.value)
            }).hex();
        },
        hexCopySaturation() {
            return chroma({
                h: this.hue,
                s: this.saturation + scale(this.saturationFactor, 0, 100, 0, 1 - this.saturation),
                v: this.value
            }).hex();
        },
        hexCopyDesaturation() {
            return chroma({
                h: this.hue,
                s: this.saturation - scale(this.desaturationFactor, 0, 100, 0, this.value),
                v: this.value
            }).hex();
        }
    }
}
</script>
<style scoped>
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
    display: flex;
    align-items: center;
    justify-content: center;
}

#color>p {
    font-size: 50px;
    font-weight: normal;
}

.column>.copyField {
    width: 100%;
}

.column>.copyField>p {
    flex-grow: 1000;
}

.sliderpartpart {
    border-radius: 12px;
    width: 100%;
    padding: 8px;
}

.sliderpartParent {
    display: flex;
    flex-direction: column;
    width: 100%;
    grid-gap: 4px;
    border-radius: 12px;
    padding: 6px;
}
</style>
