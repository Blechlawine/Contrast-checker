import "./Dropdown.css";

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
            valuesWidth: 0
        };
    },
    mounted() {
        this.valuesWidth = this.$refs.value.clientWidth;
    },
    computed: {
        value() {
            return this.values[0];
        },
        valuesWidthStyle() {
            return {
                "width": this.valuesWidth + "px"
            };
        }
    },
    render(h) {
        return (
            <div class="dropdown">
                <div class="dropdownValue" ref="value">
                    <p>{this.value}</p>
                    <span class="material-icons">expand_more</span>
                </div>
                <div class="dropdownValues" style={this.valuesWidthStyle}>
                    {this.values.map(v => (
                        <span>{v}</span>
                    ))}
                </div>
            </div>
        )
    }
}
