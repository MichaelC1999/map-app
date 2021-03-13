import React from 'react';
import './AddEntry.css';

class AddEntry extends React.Component {

    state = {
        location: {
            town: "",
            state: "",
            country: ""
        }
    }

    componentDidMount() {
        fetch("http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + this.props.lat + "&lng=" + this.props.long + "&username=cm172596")
            .then(res => {
                return res.json()
            }).then(res => {
                if(res.geonames.length > 0){
                    this.setState({location: {town: res.geonames[0].name, state: res.geonames[0].adminName1, country: res.geonames[0].countryName}})
                }
            }).catch(err => {
                this.setState({error: err.message})
            })
    }

    changeValueHandler = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()

        if(!e.target.image.files[0]) {
            return this.setState({error: "No image file. Try Again"})
        }
        if(!e.target.visitDate.value) {
            return this.setState({error: "No visit date selected. Try again"})
        }
        

        var formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("image", e.target.image.files[0]);
        formData.append("town", this.state.location.town); 
        formData.append("state", this.state.location.state); 
        formData.append("country", this.state.location.country);
        formData.append("description", this.state.description);
        formData.append("latitude", this.props.lat);
        formData.append("longitude", this.props.long);
        formData.append("visitDate", e.target.visitDate.value);

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_SERVER_URL + "api/logs", requestOptions)
            .then(res => {
                res.json()
            }).then(res => {
                this.props.closeModal()
            }).catch(err => {
                console.log(err)
                this.setState({error: "Entry could not post. Try again."})
            })
    }

    render() {
        return (
            <div className="addEntry">
                <h3 style={{color: "white"}}>{this.state.location.town && this.state.location.state ? this.state.location.town + ", " + this.state.location.state: ""}</h3>
                {this.state.error ? <h4 style={{color: "white"}}>{this.state.error}</h4> : null }
                <form className="input" onSubmit={this.submitHandler.bind()}>
                    <input className="btn" name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.changeValueHandler.bind()} />
                    <textarea className="btn" name="description" type="text" placeholder="Description" value={this.state.description} onChange={this.changeValueHandler.bind()} />
                    <input className="btn" type="date" name="visitDate" />
                    <input className="btn" type="file" name="image" />

                    {this.state.title && this.state.description ? <button className="btn" type="submit">Submit</button> : null }
                </form>
            </div>
        )
    }
}

export default AddEntry;