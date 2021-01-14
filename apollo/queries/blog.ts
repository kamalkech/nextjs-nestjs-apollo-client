import gql from 'graphql-tag';

export const GET_ALL_BLOG_CATEGORY = gql`
  query {
    blogs: getAllBlogs {
      _id
      title
      content
      tags
    }
  }
`;
