import style from "./NumberInput.css?module";

export default {
    name: "numberinput",
    data() {
        return {
            numberData: 0
        }
    },
    props: {
        number: {
            type: Number,
            required: true
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
    watch: {
        number: function (newNuber, oldNuber) {
            this.numberData = newNuber;
        }
    },
    methods: {
        addNumber() {
            this.changeNumber(this.number + this.step);
        },
        subNumber() {
            this.changeNumber(this.number - this.step);
        },
        onInput(event) {
            this.changeNumber(event.target.value);
        },
        changeNumber(number) {
            this.numberData = Math.max(Math.min(number, this.max), this.min);
            this.$emit("onNumberChanged", this.numberData);
        }
    },
    mounted() {
        this.numberData = this.number;
    },
    render(h) {
        return (<div class={style.numberInput}>
            <input type="number" v-model={this.numberData} min={this.min} max={this.max} step={this.step} onInput={this.onInput}/>
            <div class={style.numberInputButtons}>
                <div class={style.numberInputButton + " minus"} onClick={this.subNumber}>
                    <span class="material-icons smol">remove</span>
                </div>
                <div class={style.divider}></div>
                <div class={style.numberInputButton + " plus"} onClick={this.addNumber}>
                    <span class="material-icons smol">add</span>
                </div>
            </div>
        </div>);
    }
}
