import "./NumberInput.css";

export default {
    name: "numberinput",
    data() {
        return {
            numberData: 0
        }
    },
    props: {
        number: {
            type: Number
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 255
        },
        step: {
            type: Number,
            default: 1
        }
    },
    methods: {
        addNumber() {
            this.changeNumber(this.numberData + this.step);
        },
        subNumber() {
            this.changeNumber(this.numberData - this.step);
        },
        onInput(event) {
            this.changeNumber(event.target.value);
        },
        changeNumber(number) {
            this.numberData = Math.max(Math.min(number, this.max), this.min);
            this.$emit("numberChanged", this.numberData);
        }
    },
    render(h) {
        return (<div class="numberInput">
            <input type="number" v-model={this.numberData} min={this.min} max={this.max} step={this.step} onInput={this.onInput}/>
            <div class="numberInputButtons">
                <div class="numberInputButton minus" onClick={this.subNumber}>
                    <span class="material-icons smol">remove</span>
                </div>
                <div class="divider"></div>
                <div class="numberInputButton plus" onClick={this.addNumber}>
                    <span class="material-icons smol">add</span>
                </div>
            </div>
        </div>);
    }
}
