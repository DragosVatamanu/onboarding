import SimpleSchema from 'simpl-schema';

const CommentsSchema = new SimpleSchema({
  text: {
      type: String
  },

  postId: {
      type: String,
      optional: true
  },

  userId: {
      type: String,
      optional: true
  },

  createdAt: {
    type: Date,
    optional: true
  }
});

export default CommentsSchema;