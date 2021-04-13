<template>
    <svg viewBox="0 0 24 24" width="24px" height="24px" v-html="svgContent">
    </svg>
</template>

<script>
    export default {
        name: "icon",
        props: {
            iconType: {
                type: String,
                required: true,
                validator: function(value) {
                    return ["more"].indexOf(value) !== -1;
                }
            }
        },
        computed: {
            svgContent() {
                if(this.iconType == "more") {
                    return '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>';
                } else {
                    return "wrong iconType";
                }
            }
        }
    }
</script>
