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
            this.handlePosition = pos;
            this.color[0] = scale(this.handlePosition, this.minX, this.maxX, 0, 360);
            this.$emit("hueChanged", this.color[0]);
        }
    },
    mounted() {
        this.maxX = this.$refs.slider.clientWidth - 4;
        this.setHandlePos(this.minX);
    },
    computed: {
        handleStyles() {
            return {
                "background-color": `hsl(${this.color[0]}, ${this.color[1]}%, ${this.color[2]}%)`,
                "margin-left": this.handlePosition + "px"
            };
        }
    },
    render(h) {
        return (
            <div v-on:mousedown={this.handleMouseDown} class="hueSlider" ref="slider">
                <div style={this.handleStyles} class="sliderHandle"></div>
            </div>
        )
    }
}
