import Slider from "./Slider.jsx";
import NumberInput from "../Input/NumberInput.jsx";

export default {
    name: "sliderpart",
    components: {
        Slider,
        NumberInput
    },
    props: {
        label: {
            type: String,
            required: true
        },
        valueIn: {
            type: Number,
            required: true
        },
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        sliderBackground: {
            type: String,
            required: false,
            default: "#FFFFFF"
        },
        handleBackground: {
            type: String,
            required: false,
            default: "#FFFFFF"
        },
        background: {
            type: String,
            required: false,
            default: ""
        }
    },
    watch: {
        valueIn(newValueIn) {
            this.value = newValueIn;
        }
    },
    data() {
        return {
            value: 0
        };
    },
    methods: {
        slide(value) {
            this.value = value;
            this.$emit("change", this.value);
        },
        slideEnd(value) {
            this.$emit("onChangeEnd");
        }
    },
    computed: {
        backgroundStyle() {
            return {
                "background": `${this.background}`
            };
        }
    },
    render(h) {
        return (
            <div class="sliderpartpart" style={this.backgroundStyle}>
                <div class="horizontalFlex">
                    <p>{this.label}</p>
                    <NumberInput number={this.value} min={this.min} max={this.max} v-on:onNumberChanged={this.slide}/>
                </div>
                <Slider valueIn={this.value} min={this.min} max={this.max} background={this.sliderBackground} handleBackground={this.handleBackground} v-on:onSlide={this.slide} v-on:onChangeEnd={this.slideEnd}/>
            </div>
        );
    }
}
