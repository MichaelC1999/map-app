import React from 'react';
import Backdrop from './Backdrop';
import Entry from './Entry';
import AddEntry from './AddEntry';
import './Modal.css';

class Modal extends React.Component{
    render() {

        let modalCompToRender;

        if(this.props.type === 'selectEntry'){
            modalCompToRender = <Entry {...this.props} />
        } else if(this.props.type === 'addEntry'){
            modalCompToRender = <AddEntry {...this.props} />
        }

        return (
            <div>
                <Backdrop closeModal={this.props.closeModal} />
                <div
                    className="Modal"
                    style={{
                        transform: true ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: true ? '1' : '0'
                    }}>
                    {modalCompToRender}
                </div>
            </div>
        )
    }
}

export default Modal;