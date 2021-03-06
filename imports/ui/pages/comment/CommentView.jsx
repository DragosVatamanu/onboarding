import React from 'react';
import route from '/imports/routing/router.js';
import {AutoForm, TextField, ErrorField} from "uniforms-bootstrap3";
import { withTracker } from 'meteor/react-meteor-data';
import Comments from '../../../api/comments/collection';
import Posts from '../../../api/posts/collection';
import CommentSchema from './CommentSchema';
import moment from "moment";

class CommentView extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      comments: []
    };
  }
  
  componentDidMount() {
    this.getComments();
  }

  getComments() {
    Meteor.call('comment.list', route.current().params.postId, (err, comments) => {
      this.setState({
        loading: false,
        comments: comments
      })
    })
  }

  isLoggedIn = () => {
    return Meteor.user();
  }

  isCommentOwner = (comment) => {
    return comment.userId === Meteor.userId();
  }

  onSubmit = (data) => {
    Meteor.call('comment.add', route.current().params.postId, data, (err) => {
        if (!err) {
           this.getComments();
        }
        else {
            alert(err.reason);
        }
    })
};

removeComment = (id) => {
  Meteor.call('comment.remove', id, (err) => {
      if (!err) {
         this.getComments();
      }
      else {
          alert(err.reason);
      }
  })
};

  render() {
    const {loading, comments} = this.state;

    if (loading) {
      return (<div>Loading...</div>);
    }
    
    return (
      <div className="wrapper">
        {this.isLoggedIn() ? (<AutoForm schema={CommentSchema} onSubmit={this.onSubmit}>
          <TextField name="text"/>
          <ErrorField name="text"/>
          <button type="submit" className="btn btn-primary">
            Add Comment
          </button>
        </AutoForm>):''}
        <table className="table">
          <thead>
            <tr>
              <th scope="col"><span>Date</span></th>
              <th scope="col"><span>Comment</span></th>
              <th scope="col"><span>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => {
                return (
                  <tr key={comment._id}>
                    <td>{moment(comment.createdAt).format('DD MMM YYYY')}</td>
                    <td>{comment.text}</td>
                    <td><span>{this.isCommentOwner(comment) &&
                    <a href="" onClick={() => this.removeComment(comment._id)}>Delete </a>}</span></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <a href={FlowRouter.url('post.list')}>Back to posts</a>
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('posts');

  return {
    loading: !handle.ready(),
    posts: Posts.find().fetch(),
    comments: Comments.find().fetch()
  }
})(CommentView);