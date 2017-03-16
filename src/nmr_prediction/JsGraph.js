import React from 'react';
import {connect} from 'react-redux';
import {Schema} from 'react-jsgraph';
import nmrSimulation from 'nmr-simulation';
import {createSelector} from 'reselect';

function JsGraph(props) {
    if (!props.spectrum) {
        return null;
    } else {
        return <Schema schema={props.spectrum} style={{width: 800, height: 600}} />
    }
}

const predictionSelector = state => state.prediction;
const spectrumSelector = createSelector(
    predictionSelector,
    (prediction) => {
        var spectrum = null;
        if (prediction) {
            const simulation = nmrSimulation.simulate1D(nmrSimulation.SpinSystem.fromPrediction(prediction), {frequency: 400});
            spectrum = {
                data: [{
                    x: getX(0, 10, 1024),
                    y: simulation
                }],
                axis: [
                    {
                        type: 'bottom',
                        flip: true,
                        label: 'Chemical shift'
                    }
                ]
            };
        }
        return spectrum;
    }
);

function mapStateToProps(state) {
    return {
        spectrum: spectrumSelector(state)
    };
}

export default connect(mapStateToProps)(JsGraph);

function getX(from, to, nbPoints) {
    const result = new Array(nbPoints);
    const step = (to - from) / nbPoints;
    var value = from;
    for (var i = 0; i < nbPoints; i++) {
        result[i] = value;
        value += step;
    }
    return result;
}
