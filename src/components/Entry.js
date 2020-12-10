import React from 'react';

class Entry extends React.Component {
    
    state = {
        picPage: true
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_SERVER_URL + 'api/entry/' + this.props.entryID)
            .then(data => {
                return data.json()
            }).then(res => {
                this.setState({entry: res.entry})
            })
    }
    
    render() {
        let entry
        if(this.state.entry && this.state.picPage === true){
            entry = <div><h2 style={{color: "white", margin: "10px 0"}}>{this.state.entry.title}</h2><img className="entryImg" src={this.state.entry.image} /><h4 style={{color: "white", margin: "10px 0"}}>{this.state.entry.town}, {this.state.entry.state}, {this.state.entry.country}</h4></div>
        } else if(this.state.entry && this.state.picPage === false){
            entry = <div><p style={{color: "white"}}>{this.state.entry.description}</p><h6 style={{color: "white"}}>Visited on {this.state.entry.visitDate.split("T")[0]}</h6></div>
        }
        return (
            <div>
                {entry}
                <h3 class="bottom" onClick={() => this.setState({picPage: !this.state.picPage})}>{this.state.picPage ? "More info" : "See image" }</h3>
            </div>
        )
    }
}

export default Entry;