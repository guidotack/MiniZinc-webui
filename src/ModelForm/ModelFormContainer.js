import { connect } from 'react-redux';
import { ModelForm } from './ModelForm';
import { selectArgument, selectModel, setArguments, resetApplication, setResults } from '../Actions';
import { GetURL, GetTypeDimensionString, API_ARGUMENTS } from '../Utils';

const mapStateToProps = function(state, ownProps) {
    return {
        args: state.args,
        models: state.models,
        inputs: state.inputs,
        developmentMode: state.appState.developmentMode,
        selectedModel: state.appState.selectedModel,
        selectedArgument: state.appState.selectedArgument,
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleModelChange: function(model) {
            dispatch(resetApplication());
            dispatch(selectModel(model));

            GetURL(API_ARGUMENTS + model, function(http) {
                var args = JSON.parse(http.responseText);

                var inKeys = Object.keys(args.input);
                for (let i = 0; i < inKeys.length; i++) {
                    args.input[inKeys[i]].type = GetTypeDimensionString(args.input[inKeys[i]]);
                }

                var outKeys = Object.keys(args.output);
                for (let i = 0; i < outKeys.length; i++) {
                    args.output[outKeys[i]].type = GetTypeDimensionString(args.output[outKeys[i]]);
                }

                dispatch(setArguments(args));
            });
        },
        handleArgumentClick: function(argName, argType) {
            dispatch(selectArgument(argName, argType));
        },
        handleArgumentDeselect: function() {
            dispatch(selectArgument());
        },
        handleClearResults: function() {
            dispatch(setResults([]));
        }
    }
}

export const ModelFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelForm);

export default ModelFormContainer
