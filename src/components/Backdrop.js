import React from 'react';
import './Backdrop.css';

class Backdrop extends React.Component {

    render() {
        return (
            <div className="Backdrop" onClick={this.props.closeModal}>

            </div>
        )
    }
}

export default Backdrop;