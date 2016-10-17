import { connect } from 'react-redux';
import { InputHolder } from './InputHolder';
import { changeInputComponentValue, setInputComponentParameter, setOutputComponentParameter, handleLayoutChange, setSelectedResult } from './Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        inputs: state.inputs,
        outputs: state.outputs,
        result: state.result,
        selectedResult: state.selectedResult,
        inputArgs: Object.keys(state.args.input),
        outputArgs: Object.keys(state.args.output),
        dataFiles: state.dataFiles,
        selectedModel: state.appState.selectedModel,
        layout: state.layout
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleInputValueChange: function(id, value) {
            dispatch(changeInputComponentValue(id, value));
        },
        setInputComponentParameter: function(componentName, parameterName, parameter) {
            dispatch(setInputComponentParameter(componentName, parameterName, parameter));
        },
        setOutputComponentParameter: function(componentName, parameterName, parameter) {
            dispatch(setOutputComponentParameter(componentName, parameterName, parameter));
        },
        handleLayoutChange: function(layout) {
            dispatch(handleLayoutChange(layout));
        },
        setSelectedResult: function(result) {
            dispatch(setSelectedResult(result));
        }
    }
}

export const InputHolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputHolder);

export default InputHolderContainer;
