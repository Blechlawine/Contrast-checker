<template>
    <div id="app">
        <MenuBar appName="Untitled Vue App" :tabs="tabs"/>

        <div class="horizontalFlex">
            <div class="column">
                <ColorPickerBig :hueIn="0" :satIn="0" :valIn="0" id="foregroundPicker" class="colorPickerBig" v-on:colorChanged="this.onForegroundColorChanged"/>
            </div>
            <div class="column">
                <h1 id="score">{{this.score.toString().substring(0, 4)}}</h1>

                <div id="checks">
                    <div class="checkmarkDiv">
                        <p>AA</p>
                        <span class="material-icons" :style="this.aaColor">{{this.AApass ? "done" : "close"}}</span>
                    </div>
                    <div class="checkmarkDiv">
                        <p>AAA</p>
                        <span class="material-icons" :style="this.aaaColor">{{this.AAApass ? "done" : "close"}}</span>
                    </div>
                    <div class="checkmarkDiv">
                        <p>AA Large</p>
                        <span class="material-icons" :style="this.aaLargeColor">{{this.AALargePass ? "done" : "close"}}</span>
                    </div>
                    <div class="checkmarkDiv">
                        <p>AAA Large</p>
                        <span class="material-icons" :style="this.aaaLargeColor">{{this.AAALargePass ? "done" : "close"}}</span>
                    </div>
                </div>

                <div class="colors">
                    <div class="foregroundColor" :style="this.foregroundColorBackground">
                        <input type="text" class="largeExampleInput" :value="this.quoteForeground.groot" :style="this.backgroundColorText" id="backgroundLargeInput">
                        <textarea type="text" class="smallExampleInput" :value="this.quoteForeground.quote" :style="this.backgroundColorText" id="backgroundSmallInput"></textarea>
                    </div>
                    <div class="backgroundColor" :style="this.backgroundColorBackground">
                        <input type="text" class="largeExampleInput" :value="this.quoteBackground.groot" :style="this.foregroundColorText" id="foregroundLargeInput">
                        <textarea type="text" class="smallExampleInput" :value="this.quoteBackground.quote" :style="this.foregroundColorText" id="foregroundSmallInput"></textarea>
                    </div>
                </div>
            </div>
            <div class="column">
                <ColorPickerBig :hueIn="0" :satIn="0" :valIn="1" id="backgroundPicker" class="colorPickerBig" v-on:colorChanged="this.onBackgroundColorChanged"/>
            </div>
        </div>
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
            foregroundSat: 0,
            foregroundVal: 0,
            backgroundHue: 0,
            backgroundSat: 0,
            backgroundVal: 1,
            quoteForeground: {},
            quoteBackground: {},
            scoreValue: 210201201,
            AApass: false,
            AAApass: false,
            AALargePass: false,
            AAALargePass: false,
            COLORPass: false,
            DIFFPass: false
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
        aaColor() {
            return {
                "color": this.AApass ? "#4CAF50" : "#E35141"
            }
        },
        aaaColor() {
            return {
                "color": this.AAApass ? "#4CAF50" : "#E35141"
            }
        },
        aaLargeColor() {
            return {
                "color": this.AALargePass ? "#4CAF50" : "#E35141"
            }
        },
        aaaLargeColor() {
            return {
                "color": this.AAALargePass ? "#4CAF50" : "#E35141"
            }
        },
        colorsColor() {
            return {
                "color": this.COLORPass ? "#4CAF50" : "#E35141"
            }
        },
        diffColor() {
            return {
                "color": this.DIFFPass ? "#4CAF50" : "#E35141"
            }
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

            if(l1 < l2) {
                let temp = l1;
                l1 = l2;
                l2 = temp;
            }

            let passed = ((l1 + 0.05) / (l2 + 0.05));

            this.AApass = passed > 4.5;
            this.AALargePass = passed > 3;
            this.AAApass = passed > 7;
            this.AAALargePass = passed > 4.5;

            return passed;
        }
    }
}
</script>

<style scoped>

.colors {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

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

input[type=text], textarea {
    border: none;
    outline: none;
    resize: none;

    text-align: center;

    background: transparent;
}

textarea {
    width: 60%;
    height: 50%;
    overflow-x: hidden;
}

.largeExampleInput {
    font-size: 24px;
}

#foregroundPicker {
    margin-left: 2vw;
}
#backgroundPicker {
    margin-right: 2vw;
}

.colorPickerBig {
    /* position: absolute; */
    margin-top: 200px;
}

#score {
    text-align: center;
    margin-top: 60px;
    font-size: 120px;
    font-weight: 400;
}

#checks {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.checkmarkDiv {
    width: 10ch;
    text-align: center;
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
}

.checkmarkDiv .material-icons {
    font-size: 48px;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-gap: 40px;
}

</style>
