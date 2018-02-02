import React, { Component } from 'react'
import axios from 'axios';


class Form extends Component {

    state = {
        email: '',
        name: ''
    }
    onSubmit = (e) => {
        console.log('onSubmit');
        e.preventDefault();
        let { name, email } = this.state;
          axios.post('http://localhost:8000/api/people', {
            name,
            email
          })
        this.props.history.push('/events')
    }
    onNameChange = (e) => {
        e.persist();
        this.setState(() => ({
            name: e.target.value
        }));
    }

    onEmailChange = (e) => {
        e.persist();
        this.setState(() => ({
            email: e.target.value
        }));
    }


    render = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <button onClick={() => console.log(this.state)}>State</button>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input is-primary" type="text" placeholder="John Doe" onChange={this.onNameChange} required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input is-primary" type="email" placeholder="email" onChange={this.onEmailChange} required />
                    </div>
                </div>

                <div className="control">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
        )
    }
}


export default Form;
