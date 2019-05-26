import {Mongo} from 'meteor/mongo';
import CommentsSchema from '../comments/schema';
const Comments = new Mongo.Collection('comments');

Comments.attachSchema(CommentsSchema);

export default Comments;