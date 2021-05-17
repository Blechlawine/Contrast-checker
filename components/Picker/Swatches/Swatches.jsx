import style from "./Swatches.css?module";

import * as chroma from "chroma-js";

export default {
    name: "swatches",
    props: {
        hexIn: {
            type: String
        },
        typ: {
            type: String
        },
        triggerSort: {
            type: Number
        }
    },
    data() {
        return {
            swatches: [],
            firstColor: "",
            secondColor: "",
            thirdColor: "",
            firstName: "",
            secondName: "",
            thirdName: "",
            upperCase: true
        };
    },
    watch: {
        triggerSort(newTriggerSort) {
            this.sortSwatches();
        },
        hexIn(newHexIn) {
        },
        typ(newTypIn) {
            this.getData();
            if (this.typ == "name") {
                this.upperCase = false;
            }
        }
    },
    methods: {
        sortSwatches() {
            this.swatches.sort((a, b) => {
                let aDist = chroma.distance(a.hex, this.hexIn);
                let bDist = chroma.distance(b.hex, this.hexIn);

                return aDist - bDist;
            });
            this.firstColor = this.swatches[0].hex;
            this.secondColor = this.swatches[1].hex;
            this.thirdColor = this.swatches[2].hex;
            if (this.upperCase) {
                this.firstName = this.swatches[0].name.toUpperCase();
                this.secondName = this.swatches[1].name.toUpperCase();
                this.thirdName = this.swatches[2].name.toUpperCase();
            } else {
                this.firstName = this.swatches[0].name;
                this.secondName = this.swatches[1].name;
                this.thirdName = this.swatches[2].name;
            }
        },
        onSwatchClick(event, color) {
            this.$emit("changed", color);
        },
        async getData() {
            let data = await fetch("/api/colors/" + this.typ);
            this.swatches = await data.json();
            this.sortSwatches();
        },
    },
    computed: {
        firstSwatch() {
            return {
                "background-color": `#${this.firstColor}`
            };
        },
        secondSwatch() {
            return {
                "background-color": `#${this.secondColor}`
            };
        },
        thirdSwatch() {
            return {
                "background-color": `#${this.thirdColor}`
            };
        },
        swatchElements() {
            return (
                <div class={style.smolSwatches}>
                    {this.swatches.slice(3).map(swatchData => (
                        <div class={style.smolSwatch} style={`background-color: #${swatchData.hex}`} onClick={(event) => this.onSwatchClick(event, swatchData.hex)}>
                            <div class={style.swatchLabel}>{this.upperCase ? swatchData.name.toUpperCase() : swatchData.name}</div>
                        </div>
                    ))}
                </div>
            );
        }
    },
    mounted() {
        this.getData();
        if (this.typ == "name") {
            this.upperCase = false;
        }
    },
    render() {
        return (
            <div class={style.swatches}>
                <div class={style.bigSwatches}>
                    <div class={style.swatch} style={this.firstSwatch} onClick={(event) => this.onSwatchClick(event, this.firstColor)}>
                        <div class={style.bigSwatchLabel}>{this.firstName}</div>
                    </div>
                    <div class={style.swatch} style={this.secondSwatch} onClick={(event) => this.onSwatchClick(event, this.secondColor)}>
                        <div class={style.bigSwatchLabel}>{this.secondName}</div>
                    </div>
                    <div class={style.swatch} style={this.thirdSwatch} onClick={(event) => this.onSwatchClick(event, this.thirdColor)}>
                        <div class={style.bigSwatchLabel}>{this.thirdName}</div>
                    </div>
                </div>
                {this.swatchElements}
            </div>
        );
    }
}
