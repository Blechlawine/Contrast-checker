<template>
    <button class="imgButton" @click="onClick">
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
            }
        },
        methods: {
            onClick() {
                this.$emit("onClick");
            }
        }
    }
</script>
