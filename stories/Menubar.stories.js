import Menubar from "../components/Menubar/Menubar";

export default {
    component: Menubar,
    title: 'Components/Menubar'
};

export const Primary = (args, {argTypes}) => ({
    components: { Menubar },
    props: Object.keys(argTypes),
    template: '<MenuBar v-bind="$props"/>',
});
