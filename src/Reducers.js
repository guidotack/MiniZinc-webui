import { SELECT_ARGUMENT, DESELECT_ARGUMENT, SELECT_MODEL, CHANGE_ARGUMENT_LINK,
    ADD_OUTPUT_COMPONENT, CHANGE_INPUT_COMPONENT_VALUE, ADD_RESULT, SET_RESULTS,
    SET_MODELS, SET_ARGUMENTS, SET_DATA, RESET_APPLICATION, RESTORE_STATE, SET_DEVELOPMENT_MODE,
    SET_OUTPUT_COMPONENT_PARAMETER, SET_INPUT_COMPONENT_PARAMETER, SET_LAYOUT } from './Actions';
import { combineReducers } from 'redux';

/* this was the old layout.
args:
    input: {}
    output: {}
devMode: bool
inputs: {}
models: []
mouseOverBar: bool
outputs: {}
result: []
selectedArgument: {}
selectedModel: ""
selectedOutputIndex: int
*/

function args(state = { input: {}, output: {} }, action) {
    switch (action.type) {
        case SET_ARGUMENTS:
            return action.args;
        default:
            return state;
    }
}

function dataFiles(state = [], action) {
    switch (action.type) {
        case SET_DATA:
            return action.dataFiles;
        default:
            return state;
    }
}

function models(state = [], action) {
    switch (action.type) {
        case SET_MODELS:
            return action.models;
        default:
            return state;
    }
}

function inputs(state = { }, action) {
    switch (action.type) {
        case CHANGE_ARGUMENT_LINK:
            if (!action.isOutput)
                return {
                    ...state,

                    [action.argName]: {
                        component: action.componentName,
                        type: action.argType,
                        value: action.defaultValue,
                        isOutput: action.isOutput,
                        parameters: {}
                    }
                }
            else
                return {
                    ...state,

                    [action.argName]: {
                        component: action.componentName,
                        type: action.argType,
                        value: action.defaultValue,
                        isOutput: action.isOutput,
                        output: action.outputName,
                        parameters: {}
                    }
                }
        case CHANGE_INPUT_COMPONENT_VALUE:
            return {
                ...state,

                [action.componentID]: {
                    ...state[action.componentID],

                    value: action.value
                }
            };
        case SET_INPUT_COMPONENT_PARAMETER:
            return {
                ...state,

                [action.componentName]: {
                    ...state[action.componentName],

                    parameters: {
                        ...state[action.componentName].parameters,

                        [action.parameterName]: action.parameter
                    }
                }
            }
        default:
            return state;
    }
}

function outputs(state = {}, action) {
    switch (action.type) {
        case ADD_OUTPUT_COMPONENT:
            return {
                ...state,

                [action.outputName]: {
                    name: action.outputName,
                    type: action.outputType,
                    component: action.componentName,
                    result: action.defaultValue,
                    parameters: {}
                    // TODO: value?
                }
            }
        case SET_OUTPUT_COMPONENT_PARAMETER:
            return {
                ...state,

                [action.componentName]: {
                    ...state[action.componentName],

                    parameters: {
                        ...state[action.componentName].parameters,

                        [action.parameterName]: action.parameter
                    }
                }
            }
        default:
            return state;
    }
}

function result(state = [], action) {
    switch (action.type) {
        case ADD_RESULT:
            return [
                ...state,

                action.result
            ];
        case SET_RESULTS:
            return action.results;
        default:
            return state;
    }
}

function appState(state = { developmentMode: true, selectedArgument: {}, selectedModel: "" }, action) {
    switch(action.type) {
        case SELECT_ARGUMENT:
            return {
                ...state,

                selectedArgument: {
                    argName: action.argName,
                    argType: action.argType
                }
            }
        case DESELECT_ARGUMENT:
            if (action.argName === state.selectedArgument.argName &&
                action.argType === state.selectedArgument.argType) {
                    return {
                        ...state,

                        selectedArgument: {

                        }
                    };
                }
            return state;
        case SELECT_MODEL:
            return {
                ...state,

                selectedModel: action.modelName
            }
        case SET_DEVELOPMENT_MODE:
            return {
                ...state,

                developmentMode: action.devMode
            }
        default:
            return state;
    }
}

function layout(state = [], action) {
    switch (action.type) {
        case SET_LAYOUT:
            return action.layout;
        default:
            return state;
    }
}

const appReducer = combineReducers({
    args,
    dataFiles,
    models,
    inputs,
    outputs,
    result,
    layout,
    appState
});

const minizincApp = function(state, action) {
    switch (action.type) {
        case RESET_APPLICATION:
            state = {
                ...state,

                args: undefined,
                dataFiles: undefined,
                inputs: undefined,
                result: undefined,
                outputs: undefined,
                appState: undefined,
                layout: undefined
            }
            break;
        case RESTORE_STATE:
            state = Object.assign({}, state,
                action.prevState
            );
            break;
        default:
            break;
    }

    return appReducer(state, action);
}

export default minizincApp;
