import { OutputMatrix1D,OutputMatrix2D } from './OutputMatrix';
import { OutputScatterPlot } from './OutputScatterPlot';

export const AllOutputs = [
    { component: "OutputMatrix1D", name: "Matrix1D", type: "int-1D", image: "bars" },
    { component: "OutputMatrix2D", name: "Matrix2D", type: "int-2D", image: "table" },
    { component: "OutputScatterPlot", name: "Scatter Plot", type: "int-2D", image: "dot-circle-o" },
]

export const OutputStringToComponent = {
    OutputMatrix1D: OutputMatrix1D,
    OutputMatrix2D: OutputMatrix2D,
    OutputScatterPlot: OutputScatterPlot
}
