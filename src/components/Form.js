import React, { Component } from 'react'


class Form extends Component {

    onSubmit = () => {
        console.log('onSubmit');
        this.props.history.push('/events')
    }
    render = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input is-primary" type="text" placeholder="John Doe" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input is-primary" type="email" placeholder="email" required />
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
