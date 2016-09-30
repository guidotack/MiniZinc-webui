import { InputRange, InputTextField } from './Components';

export const AllInputs = [
    { component: "InputRange", name: "Slider", type: "int-1D", image: "sliders", defaultValue: 1 },
    { component: "InputTextField", name: "Text Field", type: "int-1D", image: "keyboard-o", defaultValue: 1 }
]

export const StringToInput = {
    InputRange: InputRange,
    InputTextField: InputTextField
}
