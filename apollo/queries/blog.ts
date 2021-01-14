import gql from 'graphql-tag';

export const GET_ALL_BLOGS = gql`
  query {
    blogs: getAllBlogs {
      _id
      title
      content
      tags
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query getBlogByID($id: String!) {
    blog: getBlogByID(id: $id) {
      _id
      title
      content
      tags
    }
  }
`;
