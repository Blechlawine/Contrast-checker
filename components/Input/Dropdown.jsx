import style from "./Dropdown.css?module";

export default {
    name: "dropdown",
    props: {
        values: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            valueIndex: 0,
            width: 0,
            open: false
        };
    },
    mounted() {
        let length = 0;
        this.values.map((v) => {
            if(v.length > length) length = v.length;
        });
        this.width = length;
    },
    methods: {
        onValueClick(event) {
            let val = event.currentTarget.innerHTML;
            this.valueIndex = this.values.indexOf(val);
            this.open = false;
            this.$emit("onSelect", this.valueIndex);
        },
        toggleDropdown() {
            this.open = !this.open;
        }
    },
    computed: {
        valueStyle() {
            return {
                "border": `2px solid ${this.open ? "var(--accent)" : "var(--light-gray)"}`
            };
        },
        widthStyle() {
            return {
                "width": `calc(${this.width}ch + 24px + 10px + 24px)`
            };
        },
        value() {
            return this.values[this.valueIndex];
        },
        valuesOpen() {
            return {
                "opacity": this.open ? 1 : 0,
                "pointerEvents": this.open ? "auto" : "none"
            };
        },
        hackyCloseButtonStyles() {
            return {
                "display": this.open ? "block" : "none",
                "pointerEvents": this.open ? "auto" : "none"
            };
        }
    },
    render(h) {
        return (
            <div class={style.dropdown}>
                <div class={style.hackyCloseButton} style={this.hackyCloseButtonStyles} onClick={() => {this.open = false}}></div>
                <div onClick={this.toggleDropdown} class={style.dropdownValue} ref="value" style={[this.widthStyle, this.valueStyle]}>
                    <p>{this.value}</p>
                    <span class="material-icons">{this.open ? "expand_less" : "expand_more"}</span>
                </div>
                <div class={style.dropdownValues} style={[this.widthStyle, this.valuesOpen]}>
                    {this.values.map(v => (
                        <span onClick={this.onValueClick}>{v}</span>
                    ))}
                </div>
            </div>
        )
    }
}
