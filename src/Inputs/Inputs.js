import { InputRange, InputTextField, InputMatrix1D } from './Components';

export const AllInputs = [
    { component: "InputRange", name: "Slider", type: "int", image: "sliders", defaultValue: 1 },
    { component: "InputTextField", name: "Text Field", type: "int", image: "keyboard-o", defaultValue: 1 },
    { component: "InputTextField", name: "Text Field", type: "string", image: "keyboard-o", defaultValue: "" },
    { component: "InputMatrix1D", name: "Matrix", type: "int-1D", defaultValue: [] }

]

export const StringToInput = {
    InputRange: InputRange,
    InputTextField: InputTextField,
    InputMatrix1D: InputMatrix1D
}
