import Slider from "../../Slider/Slider.jsx";
import NumberInput from "../../Input/NumberInput.jsx";

export default {
    name: "hslSliderCollection",
    components: {
        Slider,
        NumberInput
    },
    props: {
        hueIn: {
            type: Number
        },
        saturationIn: {
            type: Number
        },
        lightnessIn: {
            type: Number
        }
    },
    data() {
        return {
            hue: 0,
            saturation: 0,
            lightness: 0
        };
    },
    watch: {
        hueIn(newHueIn) {
            this.hue = newHueIn;
        },
        saturationIn(newSaturationIn) {
            this.saturation = newSaturationIn;
        },
        lightnessIn(newLightnessIn) {
            this.lightness = newLightnessIn;
        }
    },
    methods: {
        sliideeHue(value) {
            this.hue = value;
            this.slide();
        },
        sliideeSaturation(value) {
            this.saturation = value;
            this.slide();
        },
        sliideeLightness(value) {
            this.lightness = value;
            this.slide();
        },
        slide() {
            this.$emit("onChanged", { hue: this.hue, saturation: this.saturation, lightness: this.lightness });
        }
    },
    computed: {
        handleBackground() {
            return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        },
        hueBackground() {
            return `linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`;
        },
        saturationBackground() {
            return `linear-gradient(to right, hsl(${Math.round(this.hue)}, 0%, ${Math.round(this.lightness)}%), hsl(${Math.round(this.hue)}, 100%, ${Math.round(this.lightness)}%))`;
        },
        lightnessBackground() {
            return `linear-gradient(to right, hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, 0%), hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, 50%), hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, 100%))`;
        }
    },
    mounted() {
        this.hue = this.hueIn;
        this.saturation = this.saturationIn;
        this.lightness = this.lightnessIn;
    },
    render(h) {
        return (
            <div class="sliderpart">
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Hue</p>
                        <NumberInput number={Math.round(this.hue)} v-on:onNumberChanged={this.sliideeHue}/>
                    </div>
                    <Slider min={0} max={360} background={this.hueBackground} valueIn={this.hue} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeHue}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Saturation</p>
                        <NumberInput number={Math.round(this.saturation)} v-on:onNumberChanged={this.sliideeSaturation}/>
                    </div>
                    <Slider min={0} max={100} background={this.saturationBackground} valueIn={this.saturation} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeSaturation}/>
                </div>
                <div class="sliderpartpart">
                    <div class="horizontalFlex">
                        <p>Lightness</p>
                        <NumberInput number={Math.round(this.lightness)} v-on:onNumberChanged={this.sliideeLightness}/>
                    </div>
                    <Slider min={0} max={100} background={this.lightnessBackground} valueIn={this.lightness} handleBackground={this.handleBackground} v-on:onSlide={this.sliideeLightness}/>
                </div>
            </div>
        );
    }
}
