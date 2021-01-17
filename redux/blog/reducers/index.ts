import {
  FETCH_BLOGS,
  FETCH_BLOG,
  FIND_BLOG,
  DELETE_BLOG,
  SET_LOADING,
  LOGS_ERROR,
  FETCH_CATEGORIES_BLOGS,
} from '../actions/index';

const initialState = {
  blogs: [],
  blog: null,
  categoriesBlogs: [],
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
    case DELETE_BLOG:
      const listBlogs = state.blogs;
      const newListBlogs = listBlogs.filter((p: any) => p.id != action.payload);
      return {
        ...state,
        blogs: newListBlogs,
      };
    case FETCH_CATEGORIES_BLOGS:
      return {
        ...state,
        categoriesBlogs: action.payload,
        loading: false,
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
