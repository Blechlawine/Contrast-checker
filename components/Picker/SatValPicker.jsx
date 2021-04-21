import "./SatValPicker.css";

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
            saturation: 100,
            lightness: 50
        }
    },
    computed: {
        gradientStyles() {
            return {
                "background": `linear-gradient(to top, black, rgba(255, 255, 255, 0)), linear-gradient(to right, hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0), hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 1)`
            };
        }
    },
    render(h) {
        return (
            <div class="satValPicker" style={this.gradientStyles}>

            </div>
        )
    }
}
