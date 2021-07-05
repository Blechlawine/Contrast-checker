import style from "./ToggleSwitch.css?module";

export default {
    name: "toggleswitch",
    props: {

    },
    data() {
        return {
            checked: this.$store.darkmode,
            root: null
        }
    },
    methods: {
        toggleDarkMode() {
            this.$store.commit("toggleDarkMode");
            this.checked = this.$store.darkmode;
            if (this.$store.darkmode) {
                this.root.style.setProperty("--background", "#171717");
                this.root.style.setProperty("--light-gray", "#242424");
                this.root.style.setProperty("--middle-gray", "#303030");
                this.root.style.setProperty("--shadow", "rgba(0, 0, 0, 0.28)");
                this.root.style.setProperty("--textColorDark", "var(--text-white)");
                this.root.style.setProperty("--textColorLight", "var(--text-dark)");
            } else {
                this.root.style.setProperty("--background", "");
                this.root.style.setProperty("--light-gray", "");
                this.root.style.setProperty("--middle-gray", "");
                this.root.style.setProperty("--textColorDark", "");
                this.root.style.setProperty("--textColorLight", "");
                this.root.style.setProperty("--shadow", "");

            }
        }
    },
    mounted() {
        this.root = document.documentElement;
    },
    computed: {
        thumbStyle() {
            return {
                "background-color": (this.checked ? "var(--accent)" : "var(--middle-gray)"),
                "transform": `translateX(${this.checked ? "22px" : "0px"})`
            }
        },
        backStyle() {
            return {
                "background-color": (this.checked ? "var(--light-accent)" : "var(--light-gray)")
            }
        }
    },
    render(h) {
        return (
            <label class={style.switch} style={this.backStyle}>
                <div class={style.switchThumb} style={this.thumbStyle}>
                    <span class="material-icons">{this.$store.darkmode ? "dark_mode" : "light_mode"}</span>
                    <input class={style.checkBox} type="checkbox" ref="checkBox" onClick={this.toggleDarkMode}/>
                </div>
            </label>
        );
    }
}
