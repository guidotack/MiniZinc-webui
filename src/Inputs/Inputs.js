import { InputRange,TextField } from './Components';

export const AllInputs = [
    { component: "InputRange", name: "Slider", type: "int", image: "sliders", defaultValue: 1 },
    { component: "TextField", name: "Text Input", type: "int", image: "keyboard-o", defaultValue: 1 }
]

export const StringToInput = {
    InputRange: InputRange,
    TextField: TextField
}
