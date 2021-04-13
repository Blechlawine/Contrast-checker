<template>
    <button class="imgButton" @click="onClick">
        <Icon :iconType="icon"/>
    </button>
</template>

<script>
    import "./button.css";
    import Icon from "../Icon.vue";

    export default {
        name: "imgbutton",
        components: {
            Icon
        },
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
