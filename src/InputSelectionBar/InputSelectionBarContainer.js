import { connect } from 'react-redux';
import { InputSelectionBar } from './InputSelectionBar';
import { changeArgumentLink } from '../Actions';

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
        handleInputButtonClick: function(selectedArgument, componentName, defaultValue) {
            if (selectedArgument != null && selectedArgument.argName != null) {
                dispatch(changeArgumentLink(selectedArgument.argName, selectedArgument.argType,
                    componentName, defaultValue, false));
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
