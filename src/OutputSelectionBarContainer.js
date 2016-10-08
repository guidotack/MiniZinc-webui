import { connect } from 'react-redux';
import { OutputSelectionBar } from './OutputSelectionBar';
import { addOutputComponent } from './Actions';


const mapStateToProps = function(state, ownProps) {
    return {
        developmentMode: state.appState.developmentMode
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    var count = 0;

    return {
        handleOutputButtonClick: function(component, defValue, type) {
            count += 1;

            dispatch(addOutputComponent("Result " + count.toString(), type, component, defValue));
        }
    }
}

export const OutputSelectionBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputSelectionBar);

export default OutputSelectionBarContainer;
