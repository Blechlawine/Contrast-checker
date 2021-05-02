<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>

        <h1 id="score">{{this.score}}</h1>

        <div class="colors">
            <div class="foregroundColor" :style="this.foregroundColorBackground">
                <input type="text" class="largeExampleInput" v-model="this.quoteForeground.groot" :style="this.backgroundColorText" id="backgroundLargeInput">
                <input type="text" class="smallExampleInput" v-model="this.quoteForeground.quote" :style="this.backgroundColorText" id="backgroundSmallInput">
            </div>
            <div class="backgroundColor" :style="this.backgroundColorBackground">
                <input type="text" class="largeExampleInput" v-model="this.quoteBackground.groot" :style="this.foregroundColorText" id="foregroundLargeInput">
                <input type="text" class="smallExampleInput" v-model="this.quoteBackground.quote" :style="this.foregroundColorText" id="foregroundSmallInput">
            </div>
        </div>
        <ColorPickerBig id="foregroundPicker" class="colorPickerBig" v-on:colorChanged="this.onForegroundColorChanged"/>
        <ColorPickerBig id="backgroundPicker" class="colorPickerBig" v-on:colorChanged="this.onBackgroundColorChanged"/>
    </div>
</template>

<script>
import MenuBar from "../components/Menubar/Menubar.vue";
import ColorPickerBig from "../components/Picker/ColorPickerBig.jsx";

import * as chroma from "chroma-js";

export default {
    name: 'index',
    components: {
        MenuBar,
        ColorPickerBig
    },
    data() {
        return {
            tabs: [
                { id: 0, title: "Contrast-checker", link: "/", active: true },
                { id: 1, title: "Palette", link: "/palette" },
                { id: 2, title: "Converter", link: "/converter" }
            ],
            colorsDropdown: [
                "RGB",
                "HSL",
                "CMYK",
                "LAB",
                "XYZ",
                "Copic",
                "RAL",
                "HKS",
                "Name",
                "HEX",
                "Picker"
            ],
            foregroundHue: 0,
            foregroundSat: 1,
            foregroundVal: 1,
            backgroundHue: 0,
            backgroundSat: 1,
            backgroundVal: 1,
            quoteForeground: {},
            quoteBackground: {},
            scoreValue: 210201201
        }
    },
    methods: {
        onForegroundColorChanged({hue, sat, val}) {
            this.foregroundSat = sat;
            this.foregroundHue = hue;
            this.foregroundVal = val;
        },
        onBackgroundColorChanged({hue, sat, val}) {
            this.backgroundSat = sat;
            this.backgroundHue = hue;
            this.backgroundVal = val;
        },
        async getQuotes() {
            let data = await fetch("/api/quotes");
            this.quoteForeground = await data.json();
            let data2 = await fetch("/api/quotes");
            this.quoteBackground = await data2.json();
            // console.log(this.quoteForeground);
        },
    },
    mounted() {
        this.getQuotes();
    },
    computed: {
        foregroundColorText() {
            let chrome = chroma({h: this.foregroundHue, s: this.foregroundSat, v: this.foregroundVal})
            return {
                "color": `${chrome.css()}`
            };
        },
        backgroundColorText() {
            let chrome = chroma({h: this.backgroundHue, s: this.backgroundSat, v: this.backgroundVal})
            return {
                "color": `${chrome.css()}`
            };
        },
        foregroundColorBackground() {
            let chrome = chroma({h: this.foregroundHue, s: this.foregroundSat, v: this.foregroundVal})
            return {
                "background-color": `${chrome.css()}`
            };
        },
        backgroundColorBackground() {
            let chrome = chroma({h: this.backgroundHue, s: this.backgroundSat, v: this.backgroundVal})
            return {
                "background-color": `${chrome.css()}`
            };
        },
        score() {
            let rgb1 = chroma({h: this.backgroundHue, s: this.backgroundSat, v: this.backgroundVal});
            let rgb2 = chroma({h: this.foregroundHue, s: this.foregroundSat, v: this.foregroundVal});

            const c1 = {
                r: rgb1.get("rgb.r") / 255,
                g: rgb1.get("rgb.g") / 255,
                b: rgb1.get("rgb.b") / 255
            }
            const c2 = {
                r: rgb2.get("rgb.r") / 255,
                g: rgb2.get("rgb.g") / 255,
                b: rgb2.get("rgb.b") / 255
            }

            let c1final = {
                r: null,
                g: null,
                b: null
            }

            let c2final = {
                r: null,
                g: null,
                b: null
            }

            for(const [key, value] of Object.entries(c1)) {
                if (value <= 0.03928) {
                    c1final[key] = value / 12.92;
                } else  {
                    c1final[key] = Math.pow(((value + 0.055) / 1.055), 2.4);
                }
            }

            for(const [key, value] of Object.entries(c2)) {
                if (value <= 0.03928) {
                    c2final[key] = value / 12.92;
                } else  {
                    c2final[key] = Math.pow(((value + 0.055) / 1.055), 2.4);
                }
            }

            let l1 = 0.2126 * c1final.r + 0.7152 * c1final.g + 0.0722 * c1final.b;
            let l2 = 0.2126 * c2final.r + 0.7152 * c2final.g + 0.0722 * c2final.b;

            if(l1 > l2) {
                let temp = l1;
                l1 = l2;
                l2 = temp;
            }
            return ((l2 + 0.05) / (l1 + 0.05));
        }
    }
}
</script>

<style>

.colors {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-left: 50%;
    transform: translateX(-50%);

    height: 33vh;
    width: 50vw;
}

.foregroundColor {
    border-radius: 12px 0 0 12px;
}

.backgroundColor {
    border-radius: 0 12px 12px 0;
}

.foregroundColor, .backgroundColor {
    padding: 24px;

    height: 100%;
    width: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-gap: 24px;
}

input[type=text] {
    border: none;
    outline: none;

    background: transparent;
}

.largeExampleInput {
    font-size: 24px;
}

#foregroundPicker {
    margin-left: 25vw;
}
#backgroundPicker {
    right: 25vw;
}

.colorPickerBig {
    position: absolute;
}

#score {
    text-align: center;
    margin-top: 60px;
    font-size: 60px;
}

</style>
