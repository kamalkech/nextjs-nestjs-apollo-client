import {
  FETCH_BLOGS,
  FETCH_BLOG,
  FIND_BLOG,
  SET_LOADING,
  LOGS_ERROR,
} from '../actions/index';

const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_BLOGS:
      // console.log('action.payload', action.payload);
      const data = {
        ...state,
        blogs: action.payload,
        loading: false,
      };
      console.log('data', data);
      return data;
    case FETCH_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
      };
    case FIND_BLOG:
      const blogs = state.blogs;
      const blog = blogs.filter((p: any) => p.id == action.payload);
      return {
        ...state,
        blog: blog[0],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default blogReducer;
