export const state = () => ({
    hehe: 0,
    darkmode: false,
    appName: "Dyetools"
});

export const mutations = {
    increment(state) {
        state.hehe++;
    },
    toggleDarkMode() {
        this.darkmode = !this.darkmode;
    }
};
