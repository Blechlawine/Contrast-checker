import Slider from "../../Slider/Slider.jsx";
import NumberInput from "../../Input/NumberInput.jsx";
import * as chroma from "chroma-js";

export default {
    name: "hslSliderCollection",
    components: {
        Slider,
        NumberInput
    },
    props: {
        lIn: {
            type: Number
        },
        aIn: {
            type: Number
        },
        bIn: {
            type: Number
        }
    },
    data() {
        return {
            l: 0,
            a: 0,
            b: 0
        };
    },
    watch: {
        lIn(newLIn) {
            this.l = newLIn;
        },
        aIn(newAIn) {
            this.a = newAIn;
        },
        bIn(newBIn) {
            this.b = newBIn;
        }
    },
    methods: {
        sliideeL(value) {
            this.l = value;
            this.slide();
        },
        sliideeA(value) {
            this.a = value;
            this.slide();
        },
        sliideeB(value) {
            this.b = value;
            this.slide();
        },
        slide() {
            this.$emit("onChanged", { l: this.l, a: this.a, b: this.b });
        }
    },
    computed: {
        handleBackground() {
            let chromeHandle = chroma(this.l, this.a, this.b, 'lab');
            return `rgb(${chromeHandle.get("rgb.r")}, ${chromeHandle.get("rgb.g")}, ${chromeHandle.get("rgb.b")})`
        },
        lBackground() {
            let atZero = chroma(0, this.a, this.b, 'lab')
            let atHundred = chroma(100, this.a, this.b, 'lab')
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgba(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        aBackground() {
            let atZero = chroma(this.l, 0, this.b, 'lab')
            let atHundred = chroma(this.l, 100, this.b, 'lab')
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgba(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        bBackground() {
            let atZero = chroma(this.l, this.a, 0, 'lab')
            let atHundred = chroma(this.l, this.a, 100, 'lab')
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgba(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        }
    },
    render(h) {
        return (
            <div class="sliderpart">
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>L*</p>
                        <NumberInput number={Math.round(this.l)} v-on:onNumberChanged={this.sliideeL}/>
                    </div>
                    <Slider min={0} max={100} background={this.lBackground} valueIn={this.l} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeL}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>a*</p>
                        <NumberInput number={Math.round(this.a)} v-on:onNumberChanged={this.sliideeA}/>
                    </div>
                    <Slider min={-128} max={127} background={this.aBackground} valueIn={this.a} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeA}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>b*</p>
                        <NumberInput number={Math.round(this.b)} v-on:onNumberChanged={this.sliideeB}/>
                    </div>
                    <Slider min={-128} max={127} background={this.bBackground} valueIn={this.b} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeB}/>
                </div>
            </div>
        );
    }
}
