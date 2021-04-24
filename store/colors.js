import * as chroma from 'chroma-js';
import { scale } from "../assets/utils.js";
import { cie_to_rgb, rgb_to_cie } from "../assets/xyzrgb.js";

export const state = () => ({
    chrome: chroma("red"),
    hue: 0
});

export const getters = {
    chrome(state) {
        return chroma(state.chrome._rgb);
    }
};

export const mutations = {
    set(state, payload) {
        state.chrome = payload;
        let testHue = chroma(state.chrome._rgb).get("hsv.h");
        state.hue = (isNaN(testHue) ? state.hue : testHue);
    }
};
