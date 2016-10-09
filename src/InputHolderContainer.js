import { connect } from 'react-redux';
import { InputHolder } from './InputHolder';
import { changeInputComponentValue, setInputComponentParameter } from './Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        inputs: state.inputs,
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleInputValueChange: function(id, value) {
            dispatch(changeInputComponentValue(id, value));
        },
        setInputComponentParameter: function(componentName, parameterName, parameter) {
            dispatch(setInputComponentParameter(componentName, parameterName, parameter));
        }
    }
}

export const InputHolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputHolder);

export default InputHolderContainer;
