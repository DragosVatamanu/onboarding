import React from 'react';
import { Meteor } from 'meteor/meteor';
import {AutoForm, TextField, LongTextField, ErrorField} from 'uniforms-bootstrap3';
import PostSchema from './PostSchema';

class PostCreate extends React.Component {
    constructor() {
      super();
    }
  
    onSubmit = (data) => {
      Meteor.call('post.create', data, (err) => {
          if (!err) {
              FlowRouter.go('post.list');
          }
          else {
              alert(err.reason);
          }
      })
  };
  
    render() {
      return (
        <div className="wrapper">
          <AutoForm schema={PostSchema} onSubmit={this.onSubmit}>
            <a href={FlowRouter.url('post.list')}>Return to list</a>
  
            <TextField name="title"/>
            <ErrorField name="title"/>
  
            <LongTextField name="description"/>
            <ErrorField name="description"/>
  
            <button type="submit" className="btn btn-primary">
             Post
            </button>
          </AutoForm>
        </div>
      );
    }
  }
  
  export default PostCreate;