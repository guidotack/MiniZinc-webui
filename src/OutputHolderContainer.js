import { connect } from 'react-redux';
import { OutputHolder } from './OutputHolder';
import { setOutputComponentParameter } from './Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        inputs: state.inputs,
        outputs: state.outputs,
        result: state.result,
        inputArgs: Object.keys(state.args.input),
        outputArgs: Object.keys(state.args.output),
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        setOutputComponentParameter: function(componentName, parameterName, parameter) {
            dispatch(setOutputComponentParameter(componentName, parameterName, parameter));
        }
    }
}

export const OutputHolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputHolder);

export default OutputHolderContainer;
