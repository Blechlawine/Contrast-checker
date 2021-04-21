import SatValPicker from "./SatValPicker.jsx";
import HueSlider from "../Slider/HueSlider.jsx";

import "./ColorPicker.css";

export default {
    name: "ColorPicker",
    components: {
        SatValPicker,
        HueSlider
    },
    data() {
        return {
            hue: 0,
            saturation: 100,
            lightness: 50
        }
    },
    methods: {
        hueChanged(hue) {
            this.hue = hue;
            // console.log(this.hslColor);
        }
    },
    render(h) {
        return (
            <div class="colorPicker">
                <SatValPicker hue={this.hue}/>
                <HueSlider v-on:hueChanged={this.hueChanged}/>
            </div>
        );
    }
}
