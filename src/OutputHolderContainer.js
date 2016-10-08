import { connect } from 'react-redux';
import { OutputHolder } from './OutputHolder';
import { } from './Actions';

const mapStateToProps = function(state, ownProps) {
    return {
        outputs: state.outputs,
        result: state.result,
        selectedOutputIndex: state.result.length - 1
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {

    }
}

export const OutputHolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputHolder);

export default OutputHolderContainer;
