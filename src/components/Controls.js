import React from 'react';
import './Controls.css'

class Controls extends React.Component {
    render(){
        return (
            <div className="controls">
                <button className="btn" onClick={this.props.zoomIn} type="click">+</button>
                <button className="btn" onClick={this.props.zoomOut} type="click">-</button>
            </div>
        )
    }
}

export default Controls;