import gql from 'graphql-tag';

export const GET_ALL_BLOGS = gql`
  query {
    blogs: getAllBlogs {
      _id
      category {
        _id
        title
      }
      title
      content
      tags
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query getBlogByID($id: ID!) {
    blog: getBlogByID(id: $id) {
      _id
      category {
        _id
        title
      }
      title
      content
      tags
    }
  }
`;

export const GET_ALL_CATEGORIES_BLOGS = gql`
  query {
    categoriesBlogs: getAllBlogCategories {
      _id
      title
    }
  }
`;
