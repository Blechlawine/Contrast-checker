import "./HexField.css";

export default {
    name: "hexField",
    data() {
        return {
            hex: undefined,
            validHex: false
        }
    },
    methods: {
        copyToClipboard() {
            let c = document.getElementById("hexInput");
            c.select();
            c.setSelectionRange(0, 9999);
            document.execCommand("copy");
        },
        checkHexString(input) {
            let inputString = input.target.value;
            let valid = inputString.match(/^[0-9a-f]{6}$/gi)

            valid ? this.validHex = true : null;
        }
    },
    render(h) {
        return (
            <div>
                <p>#<input id="hexfield" type="text" v-model={this.hex} id="hexInput" onInput={this.checkHexString}
                           placeholder="000000"/></p>
                <button onClick={this.copyToClipboard}>Copy</button>
                {this.validHex === false ? <p>No hex value</p> : null}
            </div>
        );
    }
}