import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_ALL_BLOGS, GET_BLOG_BY_ID } from '../../../apollo/queries/blog';
import apolloClient from '../../../lib/apolloClient';

//Action Types
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOG = 'FETCH_BLOG';
export const FIND_BLOG = 'FIND_BLOG';
export const SET_LOADING = 'SET_LOADING';
export const LOGS_ERROR = 'LOGS_ERROR';

export const fetchBlogs = async () => (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  apolloClient
    .query({
      query: GET_ALL_BLOGS,
      // variables: {},
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
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      // FIXME: add dispload to hide loader.
      // dispatch(setLoading(false))
    });
};

export const findBlog = (id: any) => ({
  type: FIND_BLOG,
  payload: id,
});
