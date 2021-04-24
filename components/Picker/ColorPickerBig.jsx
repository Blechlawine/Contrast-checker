import SatValPicker from "./SatValPicker.jsx";
import HueSlider from "../Slider/HueSlider.jsx";
import Dropdown from "../Input/Dropdown.jsx";
import CopyField from "../Input/CopyField.jsx";

import RGBSliderCollection from "../Slider/SliderCollections/RGBSliderCollection.jsx";
import HSLSliderCollection from "../Slider/SliderCollections/HSLSliderCollection.jsx";

import {scale} from "../../assets/utils.js";
import * as chroma from "chroma-js";

import "./ColorPicker.css";

export default {
    name: "ColorPickerBig",
    components: {
        SatValPicker,
        HueSlider,
        Dropdown,
        CopyField,
        RGBSliderCollection,
        HSLSliderCollection
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
            this.hue = Math.round(hue);
        },
        satValChanged(saturation, value) {
            this.saturation = saturation;
            this.value = value;
        },
        sliderModeChanged(modeIndex) {
            this.activeMode = modeIndex;
        },
        sliderChanged(value) {
            let chrome;
            if (value.red != undefined && value.green != undefined && value.blue != undefined) {
                chrome = chroma({r: value.red, g: value.green, b: value.blue});
            } else if (value.hue != undefined && value.saturation != undefined && value.lightness != undefined) {
                chrome = chroma({h: value.hue, s: value.saturation / 100, l: value.lightness / 100});
            }
            let hue = chrome.get("hsv.h");
            this.hue = (isNaN(hue) ? 0 : hue);
            this.saturation = chrome.get("hsv.s");
            this.value = chrome.get("hsv.v");
        }
    },
    computed: {
        copyValue() {
            if (this.sliderModes[this.activeMode].toLowerCase() === "rgb") {
                return chroma({h: this.hue, s: this.saturation, v: this.value}).css();
            } else if (this.sliderModes[this.activeMode].toLowerCase() === "hsl") {
                let hslSat = Math.round(chroma({h: this.hue, s: this.saturation, v: this.value}).get("hsl.s") * 100);
                let hslLig = Math.round(chroma({h: this.hue, s: this.saturation, v: this.value}).get("hsl.l") * 100);
                return `hsl(${Math.round(this.hue)}, ${hslSat}%, ${hslLig}%)`;
            } else {
                return chroma({h: this.hue, s: this.saturation, v: this.value}).hex().toUpperCase();
            }
        },
        getSliderCollection() {
            let chrome = chroma({h: this.hue, s: this.saturation, v: this.value});
            switch (this.sliderModes[this.activeMode].toLowerCase()) {
                case "rgb":
                    return (<RGBSliderCollection redIn={chrome.get("rgb.r")} greenIn={chrome.get("rgb.g")} blueIn={chrome.get("rgb.b")} style="width: 100%" v-on:onChanged={this.sliderChanged}/>);
                case "hsl":
                    return (<HSLSliderCollection hueIn={this.hue} saturationIn={chrome.get("hsl.s") * 100} lightnessIn={chrome.get("hsl.l") * 100} style="width: 100%" v-on:onChanged={this.sliderChanged}/>);
                default: return (<div>Hello</div>);
            }
        }
    },
    render(h) {
        return (
            <div class="colorPicker">
                <SatValPicker saturationIn={this.saturation} valueIn={this.value} hue={this.hue} saturation={this.saturation} value={this.value} v-on:satValChanged={this.satValChanged}/>
                <HueSlider handlePosition={this.hueSlider.handlePosition} hue={this.hue} v-on:hueChanged={this.hueChanged}/>
                <div class="horizontalDivider"></div>
                <div class="horizontalFlex">
                    <Dropdown values={this.sliderModes} v-on:onSelect={this.sliderModeChanged}/>
                    <CopyField value={this.copyValue}/>
                </div>
                <div class="horizontalDivider"></div>
                {this.getSliderCollection}
            </div>
        );
    }
}
