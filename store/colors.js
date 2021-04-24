import * as chroma from 'chroma-js';
import { scale } from "../assets/utils.js";
import { cie_to_rgb, rgb_to_cie } from "../assets/xyzrgb.js";

export const state = () => ({
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
        let chrome;
        console.log(payload, state);
        if(typeof payload.red || typeof payload.green || typeof payload.blue) {
            chrome = chroma({r: state.red, g: state.green, b: state.blue});
        } else if (typeof payload.hue || typeof payload.hslsaturation || typeof payload.lightness) {
            chrome = chroma(state.hue, state.hslsaturation, state.lightness, "hsl");
        } else if (typeof payload.hsvsaturation || typeof payload.value) {
            chrome = chroma(state.hue, state.hsvsaturation, state.value, "hsv");
        } else if (typeof payload.cyan || typeof payload.magenta || typeof payload.yellow || typeof payload.key) {
            chrome = chroma({c: state.cyan, m: state.magenta, y: state.yellow, l: state.key});
        } else if (typeof payload.labl || typeof payload.laba || typeof payload.labb) {
            chrome = chroma(state.labl, state.laba, state.labb, "lab");
        } else if (typeof payload.x || typeof payload.y || typeof payload.z) {
            let rgb = cie_to_rgb(state.x, state.y, state.z);
            // console.log("xyz");
            chrome = chroma({r: rgb[0], g: rgb[1], b: rgb[2]});
        }
        let xyz = rgb_to_cie(chrome.get("rgb.r"), chrome.get("rgb.g"), chrome.get("rgb.b"));
        // console.log(xyz);
        let hue = chrome.get("hsv.h"); // TODO: hier kommt immer das was in state steht raus, selbst wenn hue in payload übergeben wurde, warum? deshalb kann man den hue slider nicht verschieben, wenn andere Slider schon verschoben wurden
        // console.log(hue);
        let newState = {
            red: chrome.get("rgb.r"),
            green: chrome.get("rgb.g"),
            blue: chrome.get("rgb.b"),
            hue: isNaN(hue) ? state.hue : hue,
            hslsaturation: chrome.get("hsl.s"),
            lightness: chrome.get("hsl.l"),
            hsvsaturation: chrome.get("hsv.s"),
            value: chrome.get("hsv.v"),
            cyan: chrome.get("cmyk.c"),
            magenta: chrome.get("cmyk.m"),
            yellow: chrome.get("cmyk.y"),
            key: chrome.get("cmyk.k"),
            x: xyz[0],
            y: xyz[1],
            z: xyz[2],
            labl: chrome.get("lab.l"),
            laba: chrome.get("lab.a"),
            labb: chrome.get("lab.b"),
            hex: chrome.hex()
        };
        Object.assign(state, newState);
    }
};
