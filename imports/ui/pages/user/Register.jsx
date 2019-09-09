import React from 'react';
import { Meteor } from 'meteor/meteor';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import AutoField from 'uniforms-bootstrap3/AutoField';
import ErrorField from 'uniforms-bootstrap3/ErrorField';
import SimpleSchema from 'simpl-schema';

class Register extends React.Component {
    constructor() {
        super();

    }

    onSubmit = (data) => {
        const {email, password} = data;

        Meteor.call('user.register', { email, password }, (err) => {
            if (!err) {
                FlowRouter.go('login');
            } else {
                alert(err.reason);
            }
        })
        window.location.reload(false); 
    };

    render() {
        return (
            <div className="wrapper">
                <h2>Register</h2>
                <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
                    <AutoField name="email"/>
                    <ErrorField name="email"/>

                    <AutoField name="password" type="password"/>
                    <ErrorField name="password"/>

                    <AutoField name="confirm_password" type="password"/>
                    <ErrorField name="confirm_password"/>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </AutoForm>
                <a href={FlowRouter.url('home')}>Return Home</a>
            </div>
        )
    }
}

const RegisterSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {type: String},
    confirm_password: {
        type: String,
        custom() {
            if (this.value !== this.field('password').value) {
                return 'passwordMissmatch';
            }
        }
    }
});

export default Register;