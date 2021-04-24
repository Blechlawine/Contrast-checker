import "./SatValPicker.css";

import { scale } from "../../assets/utils.js";

export default {
    name: "satValPicker",
    props: {
        hue: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            saturation: 0,
            value: 1,
            // handlePosX: 0,
            // handlePosY: 0,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            distanceMouseMovedX: 0,
            distanceMouseMovedY: 0,
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0
        }
    },
    methods: {
        handleMouseDown(event) {
            document.addEventListener("mousemove", this.handleMouseMove);
            document.addEventListener("mouseup", this.handleMouseUp);
            this.mouseDownPosX = event.clientX;
            this.mouseDownPosY = event.clientY;
            let relativeX = (this.mouseDownPosX - this.$refs.field.getBoundingClientRect().left);
            let relativeY = (this.mouseDownPosY - this.$refs.field.getBoundingClientRect().top);
            this.setHandlePos(Math.max(Math.min(relativeX, this.maxX), this.minX), Math.max(Math.min(relativeY, this.maxY), this.minY));
        },
        handleMouseMove(event) {
            this.distanceMouseMovedX = event.clientX - this.mouseDownPosX;
            this.distanceMouseMovedY = event.clientY - this.mouseDownPosY;
            let relativeX = (this.mouseDownPosX - this.$refs.field.getBoundingClientRect().left) + this.distanceMouseMovedX;
            let relativeY = (this.mouseDownPosY - this.$refs.field.getBoundingClientRect().top) + this.distanceMouseMovedY;
            this.setHandlePos(Math.max(Math.min(relativeX, this.maxX), this.minX), Math.max(Math.min(relativeY, this.maxY), this.minY));
        },
        handleMouseUp(event) {
            document.removeEventListener("mousemove", this.handleMouseMove);
            document.removeEventListener("mouseup", this.handleMouseUp);
        },
        setHandlePos(x, y) {
            // this.handlePosX = x;
            // this.handlePosY = y;
            let sat = scale(x, this.minX, this.maxX, 0, 1);
            let val = scale(y, this.maxY, this.minY, 0, 1);
            this.$store.commit("colors/set", {hsvsaturation: sat, value: val});
            // this.$emit("satValChanged", this.saturation, this.lightness);
        }
    },
    mounted() {
        this.maxX = this.$refs.field.clientWidth - 4;
        this.maxY = this.$refs.field.clientHeight - 4;
    },
    computed: {
        gradientStyles() {
            return {
                "background": `linear-gradient(to top, black, rgba(255, 255, 255, 0)), linear-gradient(to right, hsla(${this.$store.state.colors.hue}, 0%, 100%, 1), hsla(${this.$store.state.colors.hue}, 100%, 50%, 1))`
            };
        },
        handleStyles() {
            return {
                "background-color": `rgb(${this.$store.state.colors.red}, ${this.$store.state.colors.green}, ${this.$store.state.colors.blue})`,
                "margin-left": this.handlePosX + "px",
                "margin-top": this.handlePosY + "px"
            };
        },
        handlePosX() {
            return scale(this.$store.state.colors.hsvsaturation, 0, 1, this.minX, this.maxX);
        },
        handlePosY() {
            return scale(this.$store.state.colors.value, 0, 1, this.maxY, this.minY);
        }
    },
    render(h) {
        return (
            <div v-on:mousedown={this.handleMouseDown} class="satValPicker" style={this.gradientStyles} ref="field">
                <div class="satValHandle" style={this.handleStyles}></div>
            </div>
        )
    }
}
