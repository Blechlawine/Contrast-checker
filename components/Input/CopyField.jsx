import style from "./CopyField.css?module";
import { copyString } from "../../assets/utils.js";


export default {
    name: "CopyField",
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        copyToClipboard() {
            copyString(this.value);
        }
    },
    computed: {
        inputWidth() {
            return {
                "width": this.value.length + "ch"
            };
        }
    },
    render(h) {
        return (
            <div class={style.copyField}>
                <p>{this.value}</p>
                <div class={style.copyBtn} onClick={this.copyToClipboard}>
                    <span class="material-icons middle">content_copy</span>
                </div>
            </div>
        );
    }
}
