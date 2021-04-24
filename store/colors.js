import * as chroma from 'chroma-js';
import { scale } from "../assets/utils.js";
import { cie_to_rgb, rgb_to_cie } from "../assets/xyzrgb.js";

export const state = () => ({
    chrome: 0,
    red: 0,
    green: 0,
    blue: 0,
    hue: 0,
    hslsaturation: 0,
    lightness: 0,
    hsvsaturation: 0,
    value: 0,
    cyan: 0,
    magenta: 0,
    yellow: 0,
    key: 0,
    x: 0,
    y: 0,
    z: 0,
    labl: 0,
    laba: 0,
    labb: 0,
    hex: "",
});

export const mutations = {
    set(state, payload) {
        Object.assign(state, payload);
        if (typeof payload.hue) {
            state.hue = payload.hue;
        }
        console.log(payload, state);
        if(typeof payload.red || typeof payload.green || typeof payload.blue) {
            state.chrome = chroma({r: state.red, g: state.green, b: state.blue});
        } else if (typeof payload.hue || typeof payload.hslsaturation || typeof payload.lightness) {
            state.chrome = chroma(state.hue, state.hslsaturation, state.lightness, "hsl");
        } else if (typeof payload.hsvsaturation || typeof payload.value) {
            state.chrome = chroma(state.hue, state.hsvsaturation, state.value, "hsv");
        } else if (typeof payload.cyan || typeof payload.magenta || typeof payload.yellow || typeof payload.key) {
            state.chrome = chroma({c: state.cyan, m: state.magenta, y: state.yellow, l: state.key});
        } else if (typeof payload.labl || typeof payload.laba || typeof payload.labb) {
            state.chrome = chroma(state.labl, state.laba, state.labb, "lab");
        } else if (typeof payload.x || typeof payload.y || typeof payload.z) {
            let rgb = cie_to_rgb(state.x, state.y, state.z);
            // console.log("xyz");
            state.chrome = chroma({r: rgb[0], g: rgb[1], b: rgb[2]});
        }
        let xyz = rgb_to_cie(state.chrome.get("rgb.r"), state.chrome.get("rgb.g"), state.chrome.get("rgb.b"));
        // console.log(xyz);
        let hue = state.chrome.get("hsv.h"); // TODO: hier kommt immer das was in state steht raus, selbst wenn hue in payload übergeben wurde, warum? deshalb kann man den hue slider nicht verschieben, wenn andere Slider schon verschoben wurden
        // console.log(hue);
        let newState = {
            red: state.chrome.get("rgb.r"),
            green: state.chrome.get("rgb.g"),
            blue: state.chrome.get("rgb.b"),
            hue: isNaN(hue) ? state.hue : hue,
            hslsaturation: state.chrome.get("hsl.s"),
            lightness: state.chrome.get("hsl.l"),
            hsvsaturation: state.chrome.get("hsv.s"),
            value: state.chrome.get("hsv.v"),
            cyan: state.chrome.get("cmyk.c"),
            magenta: state.chrome.get("cmyk.m"),
            yellow: state.chrome.get("cmyk.y"),
            key: state.chrome.get("cmyk.k"),
            x: xyz[0],
            y: xyz[1],
            z: xyz[2],
            labl: state.chrome.get("lab.l"),
            laba: state.chrome.get("lab.a"),
            labb: state.chrome.get("lab.b"),
            hex: state.chrome.hex()
        };
        Object.assign(state, newState);
    }
};
