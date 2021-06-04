import "./button.css"

export default {
    name: "Button",
    props: {
        label: {
            type: String
        },
        variant: {
            type: String,
            default: "secondary",
            validator: (value) => {
                return ["secondary", "primary"].includes(value);
            }
        }
    },
    methods: {
        click(event) {
            this.$emit("onClick");
        }
    },
    computed: {
        buttonClasses() {
            return {
                "button": true,
                "primary": this.variant == "primary",
                "secondary": this.variant == "secondary"
            }
        }
    },
    render(h) {
        return (
            <button class={this.buttonClasses} onClick={this.click}>{this.label}</button>
        );
    }
}
