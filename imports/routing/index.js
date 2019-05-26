import route from './router.js';

import Login from '../ui/pages/user/Login';
import Home from '../ui/Home';
import Register from '../ui/pages/user/Register';
import PostCreate from '../ui/pages/post/PostCreate';
import PostList from '../ui/pages/post/PostList';
import PostEdit from '../ui/pages/post/PostEdit';
import CommentView from '../ui/pages/comment/CommentView';

route('/', Home, {}, {
    name: 'home'
  });
  route('/login', Login, {}, {
    name: 'login'
  });
  route('/register', Register, {}, {
    name: 'register'
  });
  route('/post/create', PostCreate, {}, {
    name: 'post.create'
  });
  route('/post/list', PostList, {}, {
    name: 'post.list'
  });
  route('/post/edit/:_id', PostEdit, {}, {
    name: 'post.edit'
  });
  route('/comments/:postId', CommentView, {}, {
    name:'comments'
  });