import { OutputMatrix } from './Components';

export const AllOutputs = [
    { component: "OutputMatrix", name: "Slider", type: "int-1D", image: "sliders", defaultValue: 1 },
]

export const OutputStringToInput = {
    OutputMatrix: OutputMatrix,
}
