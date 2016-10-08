import { connect } from 'react-redux';
import { InputHolder } from './InputHolder';
import { changeInputComponentValue } from './Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        inputs: state.inputs
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleInputValueChange: function(id, value) {
            dispatch(changeInputComponentValue(id, value));
        },
    }
}

export const InputHolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputHolder);

export default InputHolderContainer;
