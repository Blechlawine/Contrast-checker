export const state = () => ({
    hehe: 0,
    darkmode: false
});

export const mutations = {
    increment(state) {
        state.hehe++;
    },
    toggleDarkMode() {
        this.darkmode = !this.darkmode;
    }
};
