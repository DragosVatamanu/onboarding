import React from 'react';
import { Meteor } from 'meteor/meteor';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import AutoField from 'uniforms-bootstrap3/AutoField';
import ErrorField from 'uniforms-bootstrap3/ErrorField';
import SimpleSchema from 'simpl-schema';

class Login extends React.Component {
    constructor() {
        super();
    }

    onSubmit = (data) => {
        const {email, password} = data;

        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                FlowRouter.go('post.list');
            } else {
                alert(err.reason);
            }
        });
    };

    render() {
        return (
            <div className="wrapper">
                <h2>Log in</h2>
                <AutoForm schema={LoginSchema} onSubmit={this.onSubmit}>
                    <AutoField name="email"/>
                    <ErrorField name="email"/>

                    <AutoField name="password" type="password"/>
                    <ErrorField name="password"/>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </AutoForm>
                <a href={FlowRouter.url('home')}>Return Home</a>
            </div>
        )
    }
}

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {type: String}
});

export default Login;