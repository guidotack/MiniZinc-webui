import { InputRange, InputTextField } from './Components';

export const AllInputs = [
    { component: "InputRange", name: "Slider", type: "int", image: "sliders", defaultValue: 1 },
    { component: "InputTextField", name: "Text Field", type: "int", image: "keyboard-o", defaultValue: 1 }
]

export const StringToInput = {
    InputRange: InputRange,
    InputTextField: InputTextField
}
