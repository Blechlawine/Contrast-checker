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
            hueData: 0
        };
    },
    props: {
        hue: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.hueData = this.hue;
    },
    methods: {
        onSlide(hue) {
            this.hueData = hue;
            this.$emit("hueChanged", this.hueData);
        }
    },
    computed: {
        handleBackground() {
            // console.log(chroma(this.$store.state.colors.chrome._rgb));
            // console.log(this.$store.getters["colors/chrome"]);
            return `hsl(${this.$store.state.colors.hue}, 100%, 50%)`;
        }
    },
    render(h) {
        return (
            <Slider min={0} max={360} background="linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)" handleBackground={this.handleBackground} v-on:onSlide={this.onSlide}/>
        )
    }
}
