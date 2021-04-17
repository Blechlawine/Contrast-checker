import "./HueSlider.css";
import { scale } from "../../assets/utils.js";

export default {
    name: "hueslider",
    data() {
        return {
            color: [ 0, 100, 50 ],
            handlePosition: 0,
            mouseDownPosX: 0,
            distanceMouseMoved: 0,
            minX: 0,
            maxX: 0
        };
    },
    props: {

    },
    methods: {
        sliderClick(event) {
            this.setHandlePos(event.clientX - 12);
        },
        handleMouseDown(event) {
            document.addEventListener("mousemove", this.handleMouseMove);
            document.addEventListener("mouseup", this.handleMouseUp);
            this.mouseDownPosX = event.clientX;
        },
        handleMouseMove(event) {
            this.distanceMouseMoved = event.clientX - this.mouseDownPosX;
            this.setHandlePos(Math.max(Math.min(this.mouseDownPosX + this.distanceMouseMoved - 12, this.maxX), this.minX)); // 12 ist die hälfte der Breite des handles
        },
        handleMouseUp(event) {
            document.removeEventListener("mousemove", this.handleMouseMove);
            document.removeEventListener("mouseup", this.handleMouseUp);
        },
        setHandlePos(pos) {
            this.handlePosition = pos;
            this.color[0] = scale(this.handlePosition, this.minX, this.maxX, 0, 360);
        }
    },
    mounted() {
        this.maxX = this.$refs.slider.clientWidth - 6;
        this.minX = this.$refs.slider.getBoundingClientRect().left - 12;
        this.setHandlePos(this.minX);
    },
    computed: {
        handleStyles() {
            return {
                "background-color": "hsl(" + this.color[0] + ", " + this.color[1] + "%, " + this.color[2] + "%)",
                "margin-left": this.handlePosition + "px"
            };
        }
    },
    render(h) {
        return (
            <div class="hueSlider" v-on:click={this.sliderClick} ref="slider">
                <div v-on:mousedown={this.handleMouseDown} style={this.handleStyles} class="sliderHandle"></div>
            </div>
        )
    }
}
