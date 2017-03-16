import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class BasicExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChange.bind(this)} value={this.state.text} />
                <p>{this.state.text}</p>
            </div>
        );
    }
}

ReactDOM.render(
    <BasicExample />,
    document.getElementById('app')
);
