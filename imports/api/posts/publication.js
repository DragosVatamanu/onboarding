import { Meteor } from 'meteor/meteor';
import Posts from './collection';

Meteor.publish('posts', function() {
    return Posts.find({}, { sort: { updatedAt: -1 } });
  })