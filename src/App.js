import React from 'react';
import Map from './components/Map';
import Modal from './components/Modal';

class App extends React.Component {
  state = {

  }

  modalRender = (type, entryID, lat, long) => {
    this.setState({modalType: type, entryID: entryID, lat: lat, long: long})
  }

  closeModal = () => {
    this.setState({modalType: null, entryID: null})
  }

  render(){

    let modal;

    if(this.state.modalType){
      modal = <Modal closeModal={this.closeModal} type={this.state.modalType} entryID={this.state.entryID} lat={this.state.lat} long={this.state.long} />
    }

    return (
      <div className="App">
        {modal}
        <Map modalRender={this.modalRender} />
      </div>
    );
  }
  
}

export default App;
