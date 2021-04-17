import Gradientpicker from "../components/Picker/Gradientpicker";

export default {
    title: 'Components/ColorPicker'
};

export const gradient = () => ({
    components: { Gradientpicker },
    template: '<Gradientpicker/>',
});