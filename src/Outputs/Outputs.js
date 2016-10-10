import { OutputMatrix1D, OutputMatrix2D } from './OutputMatrix';
import { OutputBox } from './OutputBox';

export const AllOutputs = [
    { component: "OutputMatrix1D", name: "Matrix1D", type: "int-1D", image: "bars" },
    { component: "OutputMatrix2D", name: "Matrix2D", type: "int-2D", image: "table" },
    { component: "OutputBox", name: "OutputBox", type: "int" },
    { component: "OutputBox", name: "OutputBox", type: "string" }
]

export const OutputStringToComponent = {
    OutputBox: OutputBox,
    OutputMatrix1D: OutputMatrix1D,
    OutputMatrix2D: OutputMatrix2D
}
