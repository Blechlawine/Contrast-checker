import SatValPicker from "./SatValPicker.jsx";
import HueSlider from "../Slider/HueSlider.jsx";
import Dropdown from "../Input/Dropdown.jsx";
import CopyField from "../Input/CopyField.jsx";

import {scale} from "../../assets/utils.js";
import * as chroma from "chroma-js";

import "./ColorPicker.css";

export default {
    name: "ColorPickerBig",
    components: {
        SatValPicker,
        HueSlider,
        Dropdown,
        CopyField
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
            this.hue = Math.floor(hue);
        },
        satValChanged(saturation, value) {
            this.saturation = saturation;
            this.value = value;
        },
        sliderModeChanged(modeIndex) {
            this.activeMode = modeIndex;
        }
    },
    computed: {
        copyValue() {
            if (this.sliderModes[this.activeMode].toLowerCase() === "rgb") {
                return chroma({h: this.hue, s: this.saturation, v: this.value}).css();
            } else if (this.sliderModes[this.activeMode].toLowerCase() === "hsl") {
                let hslSat = Math.floor(chroma({h: this.hue, s: this.saturation, v: this.value}).get("hsl.s") * 100);
                let hslLig = Math.floor(chroma({h: this.hue, s: this.saturation, v: this.value}).get("hsl.l") * 100);
                return `hsl(${this.hue}, ${hslSat}%, ${hslLig}%)`;
            } else {
                return chroma({h: this.hue, s: this.saturation, v: this.value}).hex().toUpperCase();
            }
        }
    },
    render(h) {
        return (
            <div class="colorPicker">
                <SatValPicker handlePosX={this.satValPicker.handlePosX} handlePosY={this.satValPicker.handlePosY} hue={this.hue} saturation={this.saturation} value={this.value} v-on:satValChanged={this.satValChanged}/>
                <HueSlider handlePosition={this.hueSlider.handlePosition} hue={this.hue} v-on:hueChanged={this.hueChanged}/>
                <div class="horizontalFlex">
                    <Dropdown values={this.sliderModes} v-on:onSelect={this.sliderModeChanged}/>
                    <CopyField value={this.copyValue}/>
                </div>
            </div>
        );
    }
}
