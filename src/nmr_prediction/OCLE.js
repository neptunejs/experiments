import React from 'react';
import * as OCL from 'openchemlib/full';
import {StructureEditor} from 'react-ocl';
import {connect} from 'react-redux';

import {changeQuery} from './actions'

function OCLE(props) {
    return <StructureEditor OCL={OCL} onChange={props.changeQuery} />;
}

export default connect(null, {changeQuery})(OCLE)
