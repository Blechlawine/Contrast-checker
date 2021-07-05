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
            showToast: false
        };
    },
    methods: {
        copyToClipboard() {
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 1200);
            copyString(this.value);
        }
    },
    computed: {
        inputWidth() {
            return {
                "width": this.value.length + "ch"
            };
        },
        miniToastStyle() {
            return {
                opacity: (this.showToast ? 1 : 0)
            };
        }
    },
    render(h) {
        return (
            <div class={style.copyField}>
                <div class={style.miniToast} style={this.miniToastStyle}>copied!</div>
                <p>{this.value}</p>
                <div class={style.copyBtn} onClick={this.copyToClipboard}>
                    <span class="material-icons middle">content_copy</span>
                </div>
            </div>
        );
    }
}
