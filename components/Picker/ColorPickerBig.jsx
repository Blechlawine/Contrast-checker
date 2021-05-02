import SatValPicker from "./SatValPicker.jsx";
import HueSlider from "../Slider/HueSlider.jsx";
import Dropdown from "../Input/Dropdown.jsx";
import CopyField from "../Input/CopyField.jsx";

import RGBSliderCollection from "../Slider/SliderCollections/RGBSliderCollection.jsx";
import HSLSliderCollection from "../Slider/SliderCollections/HSLSliderCollection.jsx";
import LABSliderCollection from "../Slider/SliderCollections/LABSliderCollection";
import CMYKSliderCollection from "../Slider/SliderCollections/CMYKSliderCollection";
import Swatches from "./Swatches/Swatches.jsx";

import TextInput from "../Input/TextInput.jsx";

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
        HSLSliderCollection,
        TextInput
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
                "Copic",
                "RAL",
                "HKS",
                "Name",
                "HEX",
                "Pantone"
            ],
            activeMode: 0,
            hexBoxValid: true
        }
    },
    methods: {
        hueChanged(hue) {
            this.hue = Math.round(hue);
            this.$emit("colorChanged", {hue: this.hue, sat: this.saturation, val: this.value});
        },
        satValChanged(saturation, value) {
            this.saturation = saturation;
            this.value = value;
            this.$emit("colorChanged", {hue: this.hue, sat: this.saturation, val: this.value});
        },
        sliderModeChanged(modeIndex) {
            this.activeMode = modeIndex;
        },
        sliderChanged(value) {
            let chrome;
            if (value.red != undefined && value.green != undefined && value.blue != undefined) {
                chrome = chroma({r: value.red, g: value.green, b: value.blue});
            } else if (value.hue != undefined && value.saturation != undefined && value.lightness != undefined) {
                console.log(value.hue, value.saturation, value.lightness)
                chrome = chroma({h: value.hue, s: value.saturation / 100, l: value.lightness / 100});
            } else if (value.c != undefined && value.m != undefined && value.y != undefined && value.k != undefined) {
                chrome = chroma(value.c / 100, value.m / 100, value.y / 100, value.k / 100, 'cmyk')
            } else if (value.l != undefined && value.a != undefined && value.b != undefined) {
                chrome = chroma(value.l, value.a, value.b, 'lab');
            }
            let hue = chrome.get("hsv.h");
            this.hue = (isNaN(hue) ? 0 : hue);
            this.saturation = chrome.get("hsv.s");
            this.value = chrome.get("hsv.v");
            this.$emit("colorChanged", {hue: this.hue, sat: this.saturation, val: this.value});
        },
        textIn(value) {
            this.hexBoxValid = this.checkHEX(value);
            if (this.hexBoxValid) {
                let text = value.replace("#", "").replace("0x", "").replace("0X", "");
                let chrome = chroma(text);
                let hue = chrome.get("hsv.h");
                this.hue = (isNaN(hue) ? 0 : hue);
                this.saturation = chrome.get("hsv.s");
                this.value = chrome.get("hsv.v");
                this.$emit("colorChanged", {hue: this.hue, sat: this.saturation, val: this.value});
            }
        },
        checkHEX(hexValue) {
            if(hexValue.startsWith("#")) {
                hexValue = hexValue.substring(1);
            }
            // fängt mit 0x oder 0X oder # an
            // hat entweder 6 oder 3 hex character (0-9, a-f, oder A-F)
            // ^ davor kommt nichts, $ danach kommt nichts
            if (!(/^(0[xX]|#|)([a-fA-F0-9]{6})$/.test(hexValue))) {
                return false;
            }
            return true;
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
                case "cmyk":
                    return (<CMYKSliderCollection cyanIn={chrome.get("cmyk.c") * 100} magentaIn={chrome.get("cmyk.m") * 100} yellowIn={chrome.get("cmyk.y") * 100} keyIn={chrome.get("cmyk.k") * 100} style="width: 100%" v-on:onChanged={this.sliderChanged}/>)
                case "lab":
                    return (<LABSliderCollection lIn={chrome.get("lab.l")} aIn={chrome.get("lab.a")} bIn={chrome.get("lab.b")} style="width: 100%" v-on:onChanged={this.sliderChanged}/>);
                case "hex":
                    return (<TextInput valid={this.hexBoxValid} placeholder="#000000" textIn={chrome.hex().toUpperCase()} v-on:changed={this.textIn}/>)
                case "copic":
                    return (<Swatches hexIn={chrome.hex()} typ="copic" v-on:changed={this.textIn}/>);
                case "ral":
                    return (<Swatches hexIn={chrome.hex()} typ="ral" v-on:changed={this.textIn}/>);
                case "hks":
                    return (<Swatches hexIn={chrome.hex()} typ="hks" v-on:changed={this.textIn}/>);
                case "name":
                    return (<Swatches hexIn={chrome.hex()} typ="name" v-on:changed={this.textIn}/>);
                case "pantone":
                    return (<Swatches hexIn={chrome.hex()} typ="pantone" v-on:changed={this.textIn}/>);
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
