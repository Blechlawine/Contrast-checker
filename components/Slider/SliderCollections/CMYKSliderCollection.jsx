import Slider from "../../Slider/Slider.jsx";
import NumberInput from "../../Input/NumberInput.jsx";

import * as chroma from "chroma-js"

export default {
    name: "rgbSliderCollection",
    components: {
        Slider,
        NumberInput
    },
    props: {
        cyanIn: {
            type: Number
        },
        magentaIn: {
            type: Number
        },
        yellowIn: {
            type: Number
        },
        keyIn: {
            type: Number
        }
    },
    data() {
        return {
            cyan: 0,
            magenta: 0,
            yellow: 0,
            key: 0
        };
    },
    watch: {
        cyanIn(newCyanIn) {
            this.cyan = newCyanIn;
        },
        magentaIn(newMagentaIn) {
            this.magenta = newMagentaIn;
        },
        yellowIn(newYellowIn) {
            this.yellow = newYellowIn;
        },
        keyIn(newKeyIn) {
            this.key = newKeyIn;
        }
    },
    methods: {
        sliideeCyan(value) {
            this.cyan = value;
            this.slide();
        },
        sliideeMagenta(value) {
            this.magenta = value;
            this.slide();
        },
        sliideeYellow(value) {
            this.yellow = value;
            this.slide();
        },
        sliideeKey(value) {
            this.key = value;
            this.slide();
        },
        slide() {
            this.$emit("onChanged", { c: this.cyan, m: this.magenta, y: this.yellow, k: this.key});
        }
    },
    computed: {
        handleBackground() {
            let chromeHandle = chroma(this.cyan / 100, this.magenta / 100, this.yellow / 100, this.key / 100, 'cmyk');
            return `rgb(${chromeHandle.get("rgb.r")}, ${chromeHandle.get("rgb.g")}, ${chromeHandle.get("rgb.b")})`;
        },
        cyanBackground() {
            let atZero = chroma(0 , this.magenta / 100, this.yellow / 100, this.key / 100, 'cmyk');
            let atHundred = chroma(1, this.magenta / 100, this.yellow / 100, this.key / 100, 'cmyk');
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgb(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        magentaBackground() {
            let atZero = chroma(this.cyan / 100 , 0, this.yellow / 100, this.key / 100, 'cmyk');
            let atHundred = chroma(this.cyan, 1, this.yellow / 100, this.key / 100, 'cmyk');
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgb(${atHundred.get("rgb.r")}, ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        yellowBackground() {
            let atZero = chroma(this.cyan , this.magenta / 100, 0, this.key / 100, 'cmyk');
            let atHundred = chroma(this.cyan, this.magenta / 100, 1, this.key / 100, 'cmyk');
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgb(${atHundred.get("rgb.r")}, ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        keyBackground() {
            let atZero = chroma(this.cyan , this.magenta / 100, this.yellow / 100, 0, 'cmyk');
            let atHundred = chroma(this.cyan, this.magenta / 100, this.yellow / 100, 1, 'cmyk');
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgb(${atHundred.get("rgb.r")}, ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        }
    },
    render(h) {
        return (
            <div class="sliderpart">
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Cyan</p>
                        <NumberInput number={Math.round(this.cyan)} v-on:onNumberChanged={this.sliideeCyan}/>
                    </div>
                    <Slider min={0} max={100} background={this.cyanBackground} valueIn={this.cyan} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeCyan}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Magenta</p>
                        <NumberInput number={Math.round(this.magenta)} v-on:onNumberChanged={this.sliideeMagenta}/>
                    </div>
                    <Slider min={0} max={100} background={this.magentaBackground} valueIn={this.magenta} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeMagenta}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Yellow</p>
                        <NumberInput number={Math.round(this.yellow)} v-on:onNumberChanged={this.sliideeYellow}/>
                    </div>
                    <Slider min={0} max={100} background={this.yellowBackground} valueIn={this.yellow} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeYellow}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Key</p>
                        <NumberInput number={Math.round(this.key)} v-on:onNumberChanged={this.sliideeKey}/>
                    </div>
                    <Slider min={0} max={100} background={this.keyBackground} valueIn={this.key} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeKey}/>
                </div>
            </div>
        );
    }
}
