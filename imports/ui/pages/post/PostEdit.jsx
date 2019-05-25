import React from 'react';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import TextField from 'uniforms-bootstrap3/TextField';
import LongTextField from 'uniforms-bootstrap3/LongTextField';
import ErrorField from 'uniforms-bootstrap3/ErrorField';
import PostSchema from './PostSchema';

class PostEdit extends React.Component {
  constructor() {
    super();
    this.postId = FlowRouter.current().params._id;
    this.state = {
      post: null
    }
  }

  componentDidMount() {
    Meteor.call('post.get', this.postId, (err, post) => {
      this.setState({
        post
      })
    })
  }

  // componentDidUpdate() {
  //   if(Meteor.user() == null) {
  //     FlowRouter.go('home');
  //   }
  // }

  onSubmit = (data) => {
    Meteor.call('post.edit', this.postId, data, (err) => {
      if (!err) {
        FlowRouter.go('post.list');
      }
    });
  }

  render() {
    const {post} = this.state;

    if (!post) {
      return (<div>Loading...</div>);
    }

    return (
      <div className="wrapper">
        <AutoForm schema={PostSchema} onSubmit={this.onSubmit} model={post}>
          <a href={FlowRouter.url('post.list')}>Return to list</a>

          <TextField name="title"/>
          <ErrorField name="title"/>

          <LongTextField name="description"/>
          <ErrorField name="description"/>

          <button type="submit" className="btn btn-primary">
           Edit post
          </button>
        </AutoForm>
      </div>
    );
  }
}

export default PostEdit;