import { SELECT_ARGUMENT, SELECT_MODEL, SET_BAR_HOVER, CHANGE_ARGUMENT_LINK,
    ADD_OUTPUT_COMPONENT, CHANGE_INPUT_COMPONENT_VALUE, ADD_RESULT,
    SET_MODELS, SET_ARGUMENTS } from './Actions';
import { combineReducers } from 'redux';

/*
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

function args(state = {}, action) {
    switch (action.type) {
        case SET_ARGUMENTS:
            return action.args;
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

function inputs(state = {}, action) {
    switch (action.type) {
        case CHANGE_ARGUMENT_LINK:
            return {
                ...state,

                [action.argName]: {
                    component: action.componentName,
                    type: action.argType,
                    defaultValue: action.defaultValue,
                    isOutput: action.isOutput
                }
            }
        case CHANGE_INPUT_COMPONENT_VALUE:
            return state.map(function(input) {
                if (input === action.argName) {
                    return Object.assign({}, input, {
                        value: action.value
                    });
                }

                return input;
            });
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
                    type: action.outputType,
                    component: action.componentName,
                    result: action.defaultValue
                    // TODO: value?
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
        default:
            return state;
    }
}

function appState(state = { developmentMode: true }, action) {
    switch(action.type) {
        case SELECT_ARGUMENT:
            return {
                ...state,

                selectedArgument: {
                    argName: action.argName,
                    argType: action.argType
                }
            }
        case SELECT_MODEL:
            return {
                ...state,

                selectedModel: action.modelName
            }
        case SET_BAR_HOVER:
            return {
                ...state,

                mouseOverBar: action.status
            }
        default:
            return state;
    }
}

const minizincApp = combineReducers({
    args,
    models,
    inputs,
    outputs,
    result,
    appState
});

export default minizincApp;
