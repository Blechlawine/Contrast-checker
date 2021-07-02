<template>
    <div :class="this.classes">
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'toast',
    props: {
        message: {
            type: String,
            required: true,
        },
        time: {
            type: Number,
            default: 1200,
        },
    },
    data() {
        return {
            shown: false,
        };
    },
    methods: {
        show() {
            this.shown = true;
            setTimeout(() => {
                this.shown = false;
            }, this.time);
        }
    },
    computed: {
        classes() {
            return {
                "toast": true,
                "show": this.shown,
            }
        }
    }
}
</script>

<style scoped>

.toast {
    margin-left: 50%;
    position: absolute;
    padding: 12px 50px;
    z-index: 1000;
    background: var(--background);
    box-shadow: var(--shadow4px);
    border-radius: 6px;
    transform: translate(-50%, -100px);
    transition: transform 200ms;
    pointer-events: none;
}

.toast.show {
    transform: translate(-50%, 8px);
}

</style>
