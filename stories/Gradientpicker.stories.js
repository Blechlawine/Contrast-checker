import GradientPickerField from "../components/Picker/GradientPickerField";
import UpperPicker from "../components/PickerUpperPart/UpperPicker";

export default {
    title: "Components/Picker",
}

export const Upper = () => ({
    components: { UpperPicker },
    template: '<UpperPicker/>',
});
