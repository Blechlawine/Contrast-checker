import "./CopyField.css";
import { copyString } from "../../assets/utils.js";


export default {
    name: "CopyField",
    props: {
        typ: {
            type: String,
            default: "hex",
            validator: (value) => {
                return ["hex", "rgb", "hsl"].indexOf(value) !== -1;
            }
        }
    },
    data() {
        return {
            hex: undefined
        }
    },
    methods: {
        copyToClipboard() {
            let stuff = "#" + this.$refs.hexInput.value;
            copyString(stuff);
        },
        checkHexString(input) {
            let validChars = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            if (input instanceof KeyboardEvent) {
                let inputString = input.key;
                if (!validChars.includes(inputString)) {
                    input.preventDefault();
                }
            } else if (input instanceof ClipboardEvent && input.type === "paste") {
                let inputString = input.target.value;
                let paste = (input.clipboardData || window.clipboardData).getData('text');
                console.log(paste);
                if (paste.startsWith("#")) {
                    paste = paste.substring(1);
                }
                input.preventDefault();
                this.$refs.hexInput.value = paste;
            }
            console.log(input);
        }
    },
    computed: {
        inputWidth() {
            let width = "";
            switch (this.typ.toLowerCase()) {
                case "hex":
                    width = "6ch";
                    break;
                default:
                    width = "18ch";
                    break;
            }
            return {
                "width": width
            };
        }
    },
    render(h) {
        return (
            <div class="copyField">
                <p>
                    {this.typ === "hex" ? "#" : ""}
                    <input class="hexInput" style={this.inputWidth} type="text" v-model={this.hex} onKeypress={this.checkHexString} onPaste={this.checkHexString} placeholder="000000" ref="hexInput"/>
                </p>
                <div class="copyBtn" onClick={this.copyToClipboard}><span class="material-icons middle">content_copy</span></div>
                {this.validHex === false ? <p>No hex value</p> : null}
            </div>
        );
    }
}
