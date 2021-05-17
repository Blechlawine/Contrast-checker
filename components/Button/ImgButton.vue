<template>
    <button class="imgButton" :style="this.size" @click="onClick">
        <span class="material-icons">{{icon}}</span>
    </button>
</template>

<script>
    import "./button.css";

    export default {
        name: "imgbutton",
        props: {
            icon: {
                type: String,
                required: true
            },
            large: {
                type: Boolean
            }
        },
        methods: {
            onClick() {
                this.$emit("onClick");
            }
        },
        computed: {
            size() {
                return {
                    "width": this.large ? "48px" : "40px",
                    "height": this.large ? "48px" : "40px"
                }
            }
        }
    }
</script>

<style>
.imgButton {
    cursor: pointer;
}
</style>
