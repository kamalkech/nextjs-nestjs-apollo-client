import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  MUTATION_CREATE_BLOG,
  MUTATION_DELETE_ALL_BLOG,
  MUTATION_DELETE_BLOG_BY_ID,
} from '../../../apollo/mutations/blog';
import {
  GET_ALL_BLOGS,
  GET_ALL_CATEGORIES_BLOGS,
  GET_BLOG_BY_ID,
} from '../../../apollo/queries/blog';
import apolloClient from '../../../lib/apolloClient';

// DTO.
export class BlogCreateDto {
  category: string;
  title: string;
  content: string;
  tags: [string];
}

export class BlogUpdateDto {
  category: string;
  title: string;
  content: string;
  tags: [string];
}

//Action Types
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOG = 'FETCH_BLOG';
export const FIND_BLOG = 'FIND_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';
export const DELETE_ALL_BLOGS = 'DELETE_ALL_BLOGS';
export const FETCH_CATEGORIES_BLOGS = 'FETCH_CATEGORIES_BLOGS';
export const SET_LOADING = 'SET_LOADING';
export const LOGS_ERROR = 'LOGS_ERROR';

export const fetchBlogs = () => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .query({
      query: GET_ALL_BLOGS,
    })
    .then((result) => {
      dispatch({
        type: FETCH_BLOGS,
        payload: result.data.blogs,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    })
    .finally(() => {
      // dispatch(setLoading(false))
    });
};

export const fetchBlog = (id: any) => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .query({
      query: GET_BLOG_BY_ID,
      variables: { id },
    })
    .then((result) => {
      dispatch({
        type: FETCH_BLOG,
        payload: result.data.blog,
      });
    })
    .catch((error) => {})
    .finally(() => {
      // FIXME: add dispload to hide loader.
      // dispatch(setLoading(false))
    });
};

export const findBlog = (id: any) => ({
  type: FIND_BLOG,
  payload: id,
});

export const addBlog = (blog: BlogCreateDto) => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .mutate({
      mutation: MUTATION_CREATE_BLOG,
      variables: {
        category: blog.category,
        title: blog.title,
        content: blog.content,
        tags: blog.tags,
      },
      update: (store, { data: { createBlog } }) => {
        // Refresh data in graphql.
        const data: any = store.readQuery({ query: GET_ALL_BLOGS });
        data.blogs.push(createBlog);
        store.writeQuery({ query: GET_ALL_BLOGS, data });
        // Refresh data in redux.
        dispatch({
          type: FETCH_BLOGS,
          payload: data.blogs,
        });
      },
    })
    .then(async (result) => {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
    })
    .catch((error) => {})
    .finally(() => {});
};

export const deleteBlog = (id: String) => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .mutate({
      mutation: MUTATION_DELETE_BLOG_BY_ID,
      variables: { id },
      update: (store, { data: { deleteBlogByID } }) => {
        // Refresh data in graphql.
        const data: any = store.readQuery({ query: GET_ALL_BLOGS });
        const newData = data.blogs.filter(
          (blog: any) => blog._id != deleteBlogByID._id
        );
        store.writeQuery({ query: GET_ALL_BLOGS, data: { blogs: newData } });

        // Refresh data in redux.
        dispatch({
          type: FETCH_BLOGS,
          payload: newData,
        });
      },
    })
    .then(async (result) => {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
    })
    .catch((error) => {})
    .finally(() => {});
};

export const deleteAllBlogs = () => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .mutate({
      mutation: MUTATION_DELETE_ALL_BLOG,
      // variables: {},
      update: (store, { data: { deleteBlogByID } }) => {
        // Refresh data in graphql.
        store.writeQuery({ query: GET_ALL_BLOGS, data: { blogs: [] } });
        // Refresh data in redux.
        dispatch({
          type: FETCH_BLOGS,
          payload: [],
        });
      },
    })
    .then(async (result) => {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
    })
    .catch((error) => {})
    .finally(() => {});
};

export const fetchCategoriesBlogs = () => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .query({
      query: GET_ALL_CATEGORIES_BLOGS,
    })
    .then((result) => {
      dispatch({
        type: FETCH_CATEGORIES_BLOGS,
        payload: result.data.categoriesBlogs,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    })
    .finally(() => {
      // dispatch(setLoading(false))
    });
};
