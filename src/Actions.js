export const SELECT_ARGUMENT = 'SELECT_ARGUMENT';
export const SELECT_MODEL = 'SELECT_MODEL';
export const SET_BAR_HOVER = 'SET_BAR_HOVER';
export const CHANGE_ARGUMENT_LINK = 'CHANGE_ARGUMENT_LINK';
export const ADD_OUTPUT_COMPONENT = 'ADD_OUTPUT_COMPONENT';
export const CHANGE_INPUT_COMPONENT_VALUE = 'CHANGE_INPUT_COMPONENT_VALUE';
export const ADD_RESULT = 'ADD_RESULT';
export const SET_MODELS = 'SET_MODELS';
export const SET_ARGUMENTS = 'SET_ARGUMENTS';
// handleOutputChange?
// selectTemplate?


export function selectArgument(argName, argType) {
    return { type: SELECT_ARGUMENT, argName, argType };
}

export function selectModel(modelName) {
    return { type: SELECT_MODEL, modelName };
}

export function setBarHover(status) {
    return { type: SET_BAR_HOVER, status };
}

export function changeArgumentLink(argName, argType, componentName, defaultValue, isOutput) {
    return { type: CHANGE_ARGUMENT_LINK, componentName, defaultValue, isOutput };
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

export function setModels(models) {
    return { type: SET_MODELS, models };
}

export function setArguments(args) {
    return { type: SET_ARGUMENTS, args };
}
