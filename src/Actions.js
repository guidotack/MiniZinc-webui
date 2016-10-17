export const SELECT_ARGUMENT = 'SELECT_ARGUMENT';
export const DESELECT_ARGUMENT = 'DESELECT_ARGUMENT';
export const SELECT_MODEL = 'SELECT_MODEL';
export const CHANGE_ARGUMENT_LINK = 'CHANGE_ARGUMENT_LINK';
export const ADD_OUTPUT_COMPONENT = 'ADD_OUTPUT_COMPONENT';
export const CHANGE_INPUT_COMPONENT_VALUE = 'CHANGE_INPUT_COMPONENT_VALUE';
export const ADD_RESULT = 'ADD_RESULT';
export const SET_RESULTS = 'SET_RESULTS';
export const SET_MODELS = 'SET_MODELS';
export const SET_ARGUMENTS = 'SET_ARGUMENTS';
export const SET_DATA = 'SET_DATA';
export const SET_DEVELOPMENT_MODE = 'SET_DEVELOPMENT_MODE';
export const RESET_APPLICATION = 'RESET_APPLICATION';
export const RESTORE_STATE = 'RESTORE_STATE';
export const SET_OUTPUT_COMPONENT_PARAMETER = 'SET_OUTPUT_COMPONENT_PARAMETER';
export const SET_INPUT_COMPONENT_PARAMETER = 'SET_INPUT_COMPONENT_PARAMETER';
export const SET_LAYOUT = 'SET_LAYOUT';
export const SET_SELECTED_RESULT = 'SET_SELECTED_RESULT';
export const SET_REQUEST_SID = 'SET_REQUEST_SID';
// handleOutputChange?
// selectTemplate?


export function selectArgument(argName, argType) {
    return { type: SELECT_ARGUMENT, argName, argType };
}

export function deselectArgument(argName, argType) {
    return { type: DESELECT_ARGUMENT, argName, argType };
}

export function selectModel(modelName) {
    return { type: SELECT_MODEL, modelName };
}

export function changeArgumentLink(argName, argType, componentName, defaultValue, isOutput, outputName) {
    return { type: CHANGE_ARGUMENT_LINK, argName, argType, componentName, defaultValue, isOutput, outputName };
}

export function changeInputComponentValue(componentID, value) {
    return { type: CHANGE_INPUT_COMPONENT_VALUE, componentID, value };
}

export function addOutputComponent(outputName, outputType, componentName, defaultValue) {
    return { type: ADD_OUTPUT_COMPONENT, outputName, outputType, componentName, defaultValue };
}

export function addResult(result) {
    return { type: ADD_RESULT, result };
}

export function setResults(results) {
    return { type: SET_RESULTS, results };
}

export function setModels(models) {
    return { type: SET_MODELS, models };
}

export function setArguments(args) {
    return { type: SET_ARGUMENTS, args };
}

export function setData(dataFiles) {
    return { type: SET_DATA, dataFiles };
}

export function setDevelopmentMode(devMode) {
    return { type: SET_DEVELOPMENT_MODE, devMode };
}

export function resetApplication() {
    return { type: RESET_APPLICATION };
}

export function restoreState(prevState) {
    return { type: RESTORE_STATE, prevState };
}

export function setOutputComponentParameter(componentName, parameterName, parameter) {
    return { type: SET_OUTPUT_COMPONENT_PARAMETER, componentName, parameterName, parameter };
}

export function setInputComponentParameter(componentName, parameterName, parameter) {
    return { type: SET_INPUT_COMPONENT_PARAMETER, componentName, parameterName, parameter };
}

export function handleLayoutChange(layout) {
    return { type: SET_LAYOUT, layout };
}

export function setSelectedResult(result) {
    return { type: SET_SELECTED_RESULT, result };
}

export function setRequestSID(request_sid) {
    return { type: SET_REQUEST_SID, request_sid };
}
