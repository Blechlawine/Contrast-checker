import Slider from "../../Slider/Slider.jsx";
import NumberInput from "../../Input/NumberInput.jsx";

export default {
    name: "rgbSliderCollection",
    components: {
        Slider,
        NumberInput
    },
    props: {
        redIn: {
            type: Number
        },
        greenIn: {
            type: Number
        },
        blueIn: {
            type: Number
        }
    },
    data() {
        return {
            red: 0,
            green: 0,
            blue: 0
        };
    },
    watch: {
        redIn(newRedIn) {
            this.red = newRedIn;
        },
        greenIn(newGreenIn) {
            this.green = newGreenIn;
        },
        blueIn(newBlueIn) {
            this.blue = newBlueIn;
        }
    },
    methods: {
        sliideeRed(value) {
            this.red = value;
            this.slide();
        },
        sliideeGreen(value) {
            this.green = value;
            this.slide();
        },
        sliideeBlue(value) {
            this.blue = value;
            this.slide();
        },
        slide() {
            this.$emit("onChanged", { red: this.red, green: this.green, blue: this.blue });
        }
    },
    computed: {
        handleBackground() {
            return `rgb(${this.red}, ${this.green}, ${this.blue})`;
        },
        redBackground() {
            return `linear-gradient(to right, rgb(0, ${this.green}, ${this.blue}), rgba(255,  ${this.green}, ${this.blue}))`;
        },
        greenBackground() {
            return `linear-gradient(to right, rgb(${this.red}, 0, ${this.blue}), rgba(${this.red}, 255, ${this.blue}))`;
        },
        blueBackground() {
            return `linear-gradient(to right, rgb(${this.red}, ${this.green}, 0), rgba(${this.red}, ${this.green}, 255))`;
        }
    },
    mounted() {
        this.red = this.redIn;
        this.green = this.greenIn;
        this.blue = this.blueIn;
    },
    render(h) {
        return (
            <div class="sliderpart">
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Red</p>
                        <NumberInput number={Math.round(this.red)} v-on:onNumberChanged={this.sliideeRed}/>
                    </div>
                    <Slider min={0} max={255} background={this.redBackground} valueIn={this.red} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeRed}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Green</p>
                        <NumberInput number={Math.round(this.green)} v-on:onNumberChanged={this.sliideeGreen}/>
                    </div>
                    <Slider min={0} max={255} background={this.greenBackground} valueIn={this.green} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeGreen}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Blue</p>
                        <NumberInput number={Math.round(this.blue)} v-on:onNumberChanged={this.sliideeBlue}/>
                    </div>
                    <Slider min={0} max={255} background={this.blueBackground} valueIn={this.blue} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeBlue}/>
                </div>
            </div>
        );
    }
}
