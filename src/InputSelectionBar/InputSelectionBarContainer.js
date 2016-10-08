import { connect } from 'react-redux';
import { InputSelectionBar } from './InputSelectionBar';
import { setBarHover, changeArgumentLink } from '../Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        developmentMode: state.appState.developmentMode,
        filterType: state.appState.selectedArgument.argType,
        selectedArgument: state.appState.selectedArgument,
        outputs: state.outputs
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleBarState: function(event) {
            if (event.type === "mouseenter") {
                dispatch(setBarHover(true));
            }
            else if (event.type === "mouseleave") {
                dispatch(setBarHover(false));
            }
        },
        handleInputButtonClick: function(selectedArgument, componentName, defaultValue) {
            if (selectedArgument != null && selectedArgument.argName != null) {
                dispatch(changeArgumentLink(selectedArgument.argName, selectedArgument.argType,
                    componentName, defaultValue, false));
            }
        },
        // TODO: handleOutputButtonClick
    }
}

export const InputSelectionBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputSelectionBar);

export default InputSelectionBarContainer;
