<template>
<div id="app">
    <MenuBar appName="Untitled Vue App" :tabs="tabs" />
    <ColorPickerBig :hueIn="this.hue" :satIn="this.saturation" :valIn="this.value" v-on:colorChanged="this.updateColor" />
    <Slider :min="0" :max="10" :background="this.background" :valueIn="this.factor" :handleBackground="this.background" v-on:onSlide="this.sliidee" />
    <div style="display: flex; flex-direction: row">
        <div :style="this.regular">regular</div>
        <div :style="this.desaturate">desaturated</div>
        <div :style="this.saturated">saturated</div>
        <div :style="this.darken">darkened</div>
        <div :style="this.brighten">brightened</div>
        <div :style="this.grayscale">grayscale</div>
    </div>

</div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPickerBig from "../components/Picker/ColorPickerBig";
import Slider from "../components/Slider/Slider";

import * as chroma from 'chroma-js';
import Sliderpart from "../components/Picker/Sliderpart";

export default {
    name: 'converter',
    components: {
        Slider,
        ColorPickerBig,
        MenuBar
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
            factor: 2
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
        },
        sliidee(value) {
            this.factor = value;
        }
    },
    computed: {
        desaturate() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return {
                //"background": chrome.css(),
                "background": chrome.desaturate(this.factor).css(),
                "width": 100 + "px",
                "height": 100 + "px"
            }
        },
        saturated() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return {
                //"background": chrome.css(),
                "background": chrome.saturate(this.factor).css(),
                "width": 100 + "px",
                "height": 100 + "px"
            }
        },
        regular() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return {
                //"background": chrome.css(),
                "background": chrome.css(),
                "width": 100 + "px",
                "height": 100 + "px"
            }
        },
        darken() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return {
                //"background": chrome.css(),
                "background": chrome.darken(this.factor).css(),
                "width": 100 + "px",
                "height": 100 + "px"
            }
        },
        brighten() {
            let chrome = chroma({
                h: this.hue,
                s: this.saturation,
                v: this.value
            });
            return {
                //"background": chrome.css(),
                "background": chrome.brighten(this.factor).css(),
                "width": 100 + "px",
                "height": 100 + "px"
            }
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
        background() {
            return `hsl(${this.hue}, ${this.saturation}, ${this.value})`
        }
    }
}
</script>
