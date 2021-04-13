import Menubar from "../components/Menubar/Menubar";

export default {
    component: Menubar,
    title: 'Components/Menubar'
};

export const Primary = () => ({
    components: { Menubar },
    template: '<Menubar/>',
});