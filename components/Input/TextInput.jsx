import "./TextInput.css";

export default {
    name: "textinput",
    data() {
        return {
            text: "",
            active: false
        }
    },
    props: {
        textIn: {
            type: String
        },
        placeholder: {
            type: String
        },
        valid: {
            type: Boolean
        }
    },
    watch: {
        textIn(newTextIn) {
            this.text = newTextIn;
        }
    },
    methods: {
        onInput(event) {
            event.preventDefault();
            this.text = event.target.value;
            this.$emit("changed", this.text);
        }
    },
    mounted() {
        this.text = this.textIn;
    },
    computed: {
        textBoxBorder() {
            return {
                "border": `2px solid ${(this.valid ? (this.active ? "var(--accent)" : "var(--light-gray)") : "var(--warning-red)")}`
            };
        }
    },
    render(h) {
        return (
            <div class="textInput">
                <input placeholder={this.placeholder} style={this.textBoxBorder} type="text" class="textInputInput" v-model={this.text} v-on:input={this.onInput} onFocus={() => this.active = true} onBlur={() => this.active = false}/>
            </div>
        );
    }
}
