import Menubar from '../components/Menubar/Menubar.vue';

export default {
    title: "Components/Menubar",
    component: Menubar
}

const Template = (args, {argTypes}) => ({
    components: { Menubar },
    props: Object.keys(argTypes),
    template: '<menubar v-bind="$props"/>'
});

export const Menu = Template.bind({});

Menu.args = {
    appName: "Contrast-checker",
    tabs: [
        { id: 0, title: "Contrast-checker", active: true },
        { id: 1, title: "Palette" },
        { id: 2, title: "Converter" }
    ]
};
