import { Meteor } from 'meteor/meteor';
import Posts from './collection';
import Security from '../security';

Meteor.methods({
    'post.create'(data) {
        Security.checkLoggedIn(this.userId);
        return Posts.insert(data);
    },
    'post.get'(_id) {
        return Posts.findOne({_id: _id, userId: this.userId})
    },
    'post.edit'(_id, data) {
        Security.checkLoggedIn(this.userId);
        Posts.update({_id: _id, userId: this.userId}, {$set: data});
    },
    'post.remove'(_id) {
      Security.checkLoggedIn(this.userId);
      Posts.remove({_id: _id, userId: this.userId});
    }
});