import React from 'react';
import {reduxForm, Field} from 'redux-form';

function Form() {
    return (
        <div>
            <Field name="type" component={renderSelect} />
        </div>
    );
}

function renderSelect(props) {
    return (
        <span>
            <label>
                Kind of prediction:
            </label>
            <select {...props.input}>
                <option value="Proton">Proton</option>
                <option value="Carbon">Carbon</option>
            </select>
        </span>
    );
}

export default reduxForm({
    form: 'Options'
})(Form);
