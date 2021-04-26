export default {
    name: "Copicswatches",
    data() {
        return {
            swatches: []
        };
    },
    methods: {
        onSwatchClick(event, id) {

        },
        async getData() {
            
        },
    },
    computed: {
        firstSwatch() {
            return {
                "background-color": ``
            };
        },
        secondSwatch() {
            return {
                "background-color": ``
            };
        },
        thirdSwatch() {
            return {
                "background-color": ``
            };
        }
    },
    mounted() {
        this.getData();
    },
    render() {
        return (
            <div class="swatches">
                <div class="bigSwatches">
                    <div class="swatch" style={this.firstSwatch} onClick={(event) => this.onSwatchClick(event, 0)}></div>
                    <div class="swatch" style={this.secondSwatch} onClick={(event) => this.onSwatchClick(event, 1)}></div>
                    <div class="swatch" style={this.thirdSwatch} onClick={(event) => this.onSwatchClick(event, 2)}></div>
                </div>
                <div class="smolSwatches">
                    <p>
                        {this.swatches}
                    </p>
                </div>
            </div>
        );
    }
}
