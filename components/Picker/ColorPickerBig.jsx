import SatValPicker from "./SatValPicker.jsx";
import HueSlider from "../Slider/HueSlider.jsx";
import Dropdown from "../Input/Dropdown.jsx";

import {scale} from "../../assets/utils.js";

import "./ColorPicker.css";

export default {
    name: "ColorPickerBig",
    components: {
        SatValPicker,
        HueSlider,
        Dropdown
    },
    data() {
        return {
            hueSlider: {
                handlePosition: 0
            },
            satValPicker: {
                handlePosX: 0,
                handlePosY: 0
            },
            hue: 0,
            saturation: 1,
            value: 1,
            sliderModes: [
                "RGB",
                "HSL",
                "CMYK",
                "LAB",
                "XYZ",
                "Copic",
                "RAL",
                "HKS",
                "Name",
                "HEX",
                "Picker"
            ],
            activeMode: 0
        }
    },
    methods: {
        hueChanged(hue) {
            this.hue = hue;
        },
        satValChanged(saturation, value) {
            this.saturation = saturation;
            this.value = value;
        },
        sliderModeChanged(modeIndex) {
            this.activeMode = modeIndex;
        }
    },
    render(h) {
        return (
            <div class="colorPicker">
                <SatValPicker handlePosX={this.satValPicker.handlePosX} handlePosY={this.satValPicker.handlePosY} hue={this.hue} saturation={this.saturation} value={this.value} v-on:satValChanged={this.satValChanged}/>
                <HueSlider handlePosition={this.hueSlider.handlePosition} hue={this.hue} v-on:hueChanged={this.hueChanged}/>
                <Dropdown values={this.sliderModes} v-on:onSelect={this.sliderModeChanged}/>
            </div>
        );
    }
}
