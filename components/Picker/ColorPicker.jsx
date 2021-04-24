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
            value: 50
        }
    },
    methods: {
        hueChanged(hue) {
            this.hue = hue;
        },
        satValChanged(saturation, value) {
            this.saturation = saturation;
            this.value = value;
        }
    },
    render(h) {
        return (
            <div class="colorPicker">
                <SatValPicker hue={this.hue} v-on:satValChanged={this.satValChanged}/>
                <HueSlider v-on:hueChanged={this.hueChanged}/>
            </div>
        );
    }
}
