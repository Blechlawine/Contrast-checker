import "./Swatches.css";

import * as chroma from "chroma-js";

export default {
    name: "ralswatches",
    props: {
        hexIn: {
            type: String
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
            thirdName: ""
        };
    },
    watch: {
        hexIn(newHexIn) {
            this.sortSwatches();
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
            this.firstName = this.swatches[0].name.toUpperCase();
            this.secondName = this.swatches[1].name.toUpperCase();
            this.thirdName = this.swatches[2].name.toUpperCase();
        },
        onSwatchClick(event, id) {

        },
        async getData() {
            let data = await fetch("/api/ral");
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
                <div class="smolSwatches">
                    {this.swatches.slice(3).map(swatchData => (
                        <div class="smolSwatch" style={`background-color: #${swatchData.hex}`}>
                            <div class="swatchLabel">{swatchData.name.toUpperCase()}</div>
                        </div>
                    ))}
                </div>
            );
        }
    },
    mounted() {
        this.getData();
    },
    render() {
        return (
            <div class="swatches">
                <div class="bigSwatches">
                    <div class="swatch" style={this.firstSwatch} onClick={(event) => this.onSwatchClick(event, 0)}>
                        <div class="bigSwatchLabel">{this.firstName}</div>
                    </div>
                    <div class="swatch" style={this.secondSwatch} onClick={(event) => this.onSwatchClick(event, 1)}>
                        <div class="bigSwatchLabel">{this.secondName}</div>
                    </div>
                    <div class="swatch" style={this.thirdSwatch} onClick={(event) => this.onSwatchClick(event, 2)}>
                        <div class="bigSwatchLabel">{this.thirdName}</div>
                    </div>
                </div>
                {this.swatchElements}
            </div>
        );
    }
}
