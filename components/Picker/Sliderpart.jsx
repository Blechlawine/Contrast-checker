import Slider from "../Slider/Slider.jsx";
import NumberInput from "../Input/NumberInput.jsx";

export default {
    name: "sliderpart",
    components: {
        Slider,
        NumberInput
    },
    props: {
        sliders: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            sliderAmount: 3
        };
    },
    methods: {
        // sliidee(index, value) {
        //     let payload = JSON.parse(`{ "${index}": ${value} }`);
        //     this.$store.commit("colors/set", payload);
        // }
    },
    computed: {
        createSliders() {
            let sliderComponents = [];
            this.sliders.map((slider) => {
                sliderComponents.push(
                    <div class="sliderpartpart">
                        <NumberInput number={5}/>
                        <Slider valueRef={slider} min={0} max={255} background={slider} initialValue={0} handleBackground={slider}/>
                    </div>
                );
            });
            return sliderComponents;
        },
        values(index) {

        }
    },
    render(h) {
        return (
            <div class="sliderpart">
                {this.createSliders}
            </div>
        );
    }
}
