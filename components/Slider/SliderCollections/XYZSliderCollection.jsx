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
        xIn: {
            type: Number
        },
        yIn: {
            type: Number
        },
        zIn: {
            type: Number
        }
    },
    data() {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    },
    watch: {
        xIn(newXIn) {
            this.x = newXIn;
        },
        yIn(newYIn) {
            this.y = newYIn;
        },
        zIn(newZIn) {
            this.z = newZIn;
        }
    },
    methods: {
        sliideeX(value) {
            this.x = value;
            this.slide();
        },
        sliideeY(value) {
            this.y = value;
            this.slide();
        },
        sliideeZ(value) {
            this.z = value;
            this.slide();
        },
        slide() {
            this.$emit("onChanged", { x: this.x, y: this.y, z: this.z});
        }
    },
    computed: {
        handleBackground() {
            return "white"
        },
        lBackground() {
            let atZero = chroma(0, this.a, this.b, 'lab')
            let atHundred = chroma(100, this.a, this.b, 'lab')
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgba(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        aBackground() {
            let atZero = chroma(this.l, -128, this.b, 'lab')
            let atHundred = chroma(this.l, 127, this.b, 'lab')
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgba(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        },
        bBackground() {
            let atZero = chroma(this.l, this.a, -128, 'lab')
            let atHundred = chroma(this.l, this.a, 127, 'lab')
            return `linear-gradient(to right, rgb(${atZero.get("rgb.r")}, ${atZero.get("rgb.g")}, ${atZero.get("rgb.b")}), rgba(${atHundred.get("rgb.r")},  ${atHundred.get("rgb.g")}, ${atHundred.get("rgb.b")}))`;
        }
    },
    render(h) {
        return (
            <div class="sliderpart">
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>x</p>
                        <NumberInput number={Math.round(this.x)} v-on:onNumberChanged={this.sliideeX}/>
                    </div>
                    <Slider min={0} max={100} background={this.handleBackground} valueIn={this.x} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeX}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>y</p>
                        <NumberInput number={Math.round(this.y)} v-on:onNumberChanged={this.sliideeY}/>
                    </div>
                    <Slider min={-128} max={127} background={this.handleBackground} valueIn={this.y} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeY}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>z</p>
                        <NumberInput number={Math.round(this.z)} v-on:onNumberChanged={this.sliideeZ}/>
                    </div>
                    <Slider min={-128} max={127} background={this.handleBackground} valueIn={this.z} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeZ}/>
                </div>
            </div>
        );
    }
}
