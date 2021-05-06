import Slider from "./Slider.jsx";
import { scale } from "../../assets/utils.js";
import * as chroma from "chroma-js";

export default {
    name: "hueslider",
    components: {
        Slider
    },
    data() {
        return {
        };
    },
    props: {
        hue: {
            type: Number,
            default: 0
        },
        handlePosition: {
            type: Number,
            required: true
        }
    },
    methods: {
        onSlide(val) {
            this.$emit("hueChanged", val);
        },
        slideEnd(value) {
            this.$emit("onChangeEnd", value);
        }
    },
    computed: {
        handleBackground() {
            return `hsl(${this.hue}, 100%, 50%)`;
        }
    },
    render(h) {
        return (
            <Slider min={0} max={360} valueIn={this.hue} background="linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)" handleBackground={this.handleBackground} v-on:onSlide={this.onSlide} v-on:onChangeEnd={this.slideEnd}/>
        )
    }
}
