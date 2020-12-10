import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Controls from './Controls';
import Geocoder from 'react-mapbox-gl-geocoder';
import './Map.css';

class Map extends React.Component {
    state = {
        startScreen: true,
        viewport: {
          latitude: 37,
          longitude: -95,
          zoom: 3,
          bearing: 0,
          pitch: 0
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_SERVER_URL + "api/markers")
            .then(data => {
                return data.json()
            }).then(res => {
                this.setState({markers: res.markers})
            })
    }


    zoomIn = () => {
        if(this.state.viewport.zoom>=24){
            return
        }
        this.setState({viewport: {...this.state.viewport, zoom: this.state.viewport.zoom + 1}})
    }

    zoomOut = () => {
        if(this.state.viewport.zoom<=0){
            return
        }
        this.setState({viewport: {...this.state.viewport, zoom: this.state.viewport.zoom - 1}})
    }
    
    selectEntry = (entryID) => {
        this.props.modalRender("selectEntry", entryID)
    }

    newMarker = (evt) => {
        this.setState({viewport: {...this.state.viewport, latitude: evt.lngLat[1], longitude: evt.lngLat[0]}})
        this.props.modalRender("addEntry", "", this.state.viewport.latitude, this.state.viewport.longitude)
    }

    onSelected = (viewport, item) => {      
        this.setState({
          viewport
        })
    }

    enterApp = () => {
        this.setState({startScreen: false})
    }
    
    render() {


        let markers;

        if(this.state.markers && !this.state.startScreen){
            markers = this.state.markers.map((entry, idx) => {
                return (
                    <Marker key={idx} latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-15} offsetTop={-28}>
                        <img style={{marginBottom: "15"}} src="https://michaelc1999.github.io/map-app/map-pin-blue.png" width="30px" height="30px" onClick={() => this.selectEntry(entry.LogEntryID)} />
                    </Marker>)
            })
        } else {
            markers = null;
        }

        let tools

        if(this.state.startScreen === false){
            tools = (<React.Fragment>
                <Controls zoomIn={this.zoomIn} zoomOut={this.zoomOut} /> 
                <Geocoder                
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}                
                    onSelected={this.onSelected}                
                    viewport={this.state.viewport}                
                    hideOnSelect={true}                
                    value=""                
                />
                </React.Fragment>)
        } else {
            tools = null
        }

        let startScreen

        if(this.state.startScreen){
            startScreen = 
                <div class="startScreen">
                    <h1>WELCOME TO THE MAP APP</h1>
                    <button class="btn" type="click" onClick={this.enterApp}>ENTER</button>
                </div>
        } else {
            startScreen = null
        }

        return (
            <React.Fragment>
                {startScreen}
                {tools}             
                <ReactMapGL
                    {...this.state.viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle="mapbox://styles/cm172596/cki87vss16v031apa2us3ckho"
                    
                    onViewportChange={viewport => this.setState({viewport})}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
                    onClick={this.state.startScreen ? null : this.newMarker}>
                    {markers}
                </ReactMapGL>
            </React.Fragment>
        )
    }
}

export default Map;
