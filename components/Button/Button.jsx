import "./button.css";

export default {
    name: "Button",
    props: {
        label: {
            type: String
        }
    },
    methods: {
        click(event) {
            this.$emit("onClick");
        }
    },
    render(h) {
        return (
            <button onClick={this.click}>{this.label}</button>
        );
    }
}
