import "./Slider.css";
import { scale } from "../../assets/utils.js";
import * as chroma from "chroma-js";

export default {
    name: "slider",
    data() {
        return {
            value: 0,
            // handlePosition: 0,
            mouseDownPosX: 0,
            distanceMouseMoved: 0,
            minX: 0,
            maxX: 0
        };
    },
    props: {
        valueIn: {
            type: Number
        },
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        background: {
            type: String,
            required: true
        },
        handleBackground: {
            type: String,
            required: true
        }
    },
    methods: {
        handleMouseDown(event) {
            document.addEventListener("mousemove", this.handleMouseMove);
            document.addEventListener("mouseup", this.handleMouseUp);
            this.mouseDownPosX = event.clientX;
            let relativeX = (this.mouseDownPosX - this.$refs.slider.getBoundingClientRect().left);
            this.setHandlePos(Math.max(Math.min(relativeX, this.maxX), this.minX));
        },
        handleMouseMove(event) {
            this.distanceMouseMoved = event.clientX - this.mouseDownPosX;
            let relativeX = (this.mouseDownPosX - this.$refs.slider.getBoundingClientRect().left) + this.distanceMouseMoved;
            this.setHandlePos(Math.max(Math.min(relativeX, this.maxX), this.minX));
        },
        handleMouseUp(event) {
            document.removeEventListener("mousemove", this.handleMouseMove);
            document.removeEventListener("mouseup", this.handleMouseUp);
        },
        setHandlePos(pos) {
            // this.handlePosition = pos;
            this.value = scale(pos, this.minX, this.maxX, this.min, this.max);
            this.$emit("onSlide", this.value);
        }
    },
    mounted() {
        this.maxX = this.$refs.slider.clientWidth - 4;
        this.setHandlePos(this.minX);
    },
    computed: {
        handleStyles() {
            return {
                "background-color": this.handleBackground,
                "margin-left": this.handlePosition + "px"
            };
        },
        sliderBackground() {
            return {
                "background": this.background
            };
        },
        handlePosition() {
            return scale(this.valueIn, this.min, this.max, this.minX, this.maxX);
        }
    },
    render(h) {
        return (
            <div v-on:mousedown={this.handleMouseDown} class="slider" ref="slider" style={this.sliderBackground}>
                <div style={this.handleStyles} class="sliderHandle"></div>
            </div>
        )
    }
}
