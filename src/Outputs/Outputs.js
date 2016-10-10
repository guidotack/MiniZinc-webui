import { OutputMatrix1D,OutputMatrix2D } from './OutputMatrix';
import { OutputGanttChart } from './OutputGanttChart';

export const AllOutputs = [
    { component: "OutputMatrix1D", name: "Matrix1D", type: "int-1D", image: "bars" },
    { component: "OutputMatrix2D", name: "Matrix2D", type: "int-2D", image: "table" },
    { component: "OutputGanttChart", name: "GanttChart", type: "int-2D", image: "calendar" },
]

export const OutputStringToComponent = {
    OutputMatrix1D: OutputMatrix1D,
    OutputMatrix2D: OutputMatrix2D,
    OutputGanttChart: OutputGanttChart
}
