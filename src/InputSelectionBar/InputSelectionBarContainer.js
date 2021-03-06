import { connect } from 'react-redux';
import { InputSelectionBar } from './InputSelectionBar';
import { changeArgumentLink, deselectArgument } from '../Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        developmentMode: state.appState.developmentMode,
        filterType: state.appState.selectedArgument.argType,
        selectedArgument: state.appState.selectedArgument,
        selectedConnectedComponent: (state.inputs[state.appState.selectedArgument.argName] && state.inputs[state.appState.selectedArgument.argName].component) ? state.inputs[state.appState.selectedArgument.argName].component : "",
        outputs: state.outputs
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleInputButtonClick: function(selectedArgument, componentName, defaultValue, inputName) {
            if (componentName === "InputFile" || componentName === "InputSolve" || (selectedArgument != null && selectedArgument.argName != null) ) {
                var argName = !('argName' in selectedArgument) ? componentName : selectedArgument.argName;
                var argType = !('argType' in selectedArgument) ? "any" : selectedArgument.argType;
                dispatch(changeArgumentLink(argName, argType,
                    componentName, defaultValue, false, inputName));
                dispatch(deselectArgument(argName, argType));
            }
        },
        handleOutputButtonClick: function(selectedArgument, componentName, defaultValue, outputName) {
            if (selectedArgument != null && selectedArgument.argName != null) {
                dispatch(changeArgumentLink(selectedArgument.argName, selectedArgument.argType,
                    componentName, defaultValue, true, outputName));
            }
        },
    }
}

export const InputSelectionBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputSelectionBar);

export default InputSelectionBarContainer;
