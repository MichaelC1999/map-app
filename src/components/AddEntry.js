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
        
        fetch("https://open.mapquestapi.com/geocoding/v1/reverse?key=eRXGKFu3rZYY12JffRJSz4x3GIkTQBzG&location=" + this.props.lat + "," + this.props.long)
            .then(res => {
                return res.json()
            }).then(res => {
                if(res.results[0].locations[0].adminArea1 !== "XZ" && res.results[0].locations[0].adminArea1 !== undefined){
                    this.setState({location: {town: res.results[0].locations[0].adminArea5, state: res.results[0].locations[0].adminArea3, country: res.results[0].locations[0].adminArea1}})
                } else {
                    this.setState({location: {town: "", state: "", country: ""}, error: "Open Sea"})
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
                <h3 style={{color: "white"}}>{this.state.location.town ? this.state.location.town + ", ": null}{this.state.location.state ? this.state.location.state + ", " + this.state.location.country : this.state.location.country}</h3>
                {this.state.error ? <h4 style={{color: "white"}}>{this.state.error}</h4> : null }
                <form className="input" onSubmit={this.submitHandler.bind()}>
                    <input className="btn" name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.changeValueHandler.bind()} />
                    <textarea className="btn" name="description" type="text" placeholder="Description" value={this.state.description} onChange={this.changeValueHandler.bind()} />
                    <input className="btn" type="date" name="visitDate" />
                    <input style={{width: "80%", marginTop: "6px"}} className="btn" type="file" name="image" />

                    {this.state.title && this.state.description ? <button className="btn" type="submit">Submit</button> : null }
                </form>
            </div>
        )
    }
}

export default AddEntry;