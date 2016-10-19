import { InputRange, InputTextField, InputMatrix1D, InputMatrix2D, InputFile, InputSolve } from './Components';

export const AllInputs = [
    { component: "InputRange", name: "Slider", type: "int", image: "sliders", defaultValue: 1 },
    { component: "InputTextField", name: "Text Field", type: "int", image: "keyboard-o", defaultValue: 1 },
    { component: "InputTextField", name: "Text Field", type: "string", image: "keyboard-o", defaultValue: "" },
    { component: "InputMatrix1D", name: "Matrix", type: "int-1D", defaultValue: [], image: "bars" },
    { component: "InputMatrix2D", name: "Matrix", type: "int-2D", defaultValue: [], image: "table" },
    { component: "InputMatrix1D", name: "Matrix", type: "string-1D", defaultValue: [], image: "bars" },
    { component: "InputMatrix2D", name: "Matrix", type: "string-2D", defaultValue: [], image: "table" },
    { component: "InputFile", name: "File", type: "any", defaultValue: [], image: "file-text-o" },
    { component: "InputSolve", name: "Solve", type: "any", defaultValue: [], image: "play-circle-o" },

]

export const StringToInput = {
    InputRange: InputRange,
    InputTextField: InputTextField,
    InputMatrix1D: InputMatrix1D,
    InputMatrix2D: InputMatrix2D,
    InputFile: InputFile,
    InputSolve: InputSolve
}
