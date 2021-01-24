import gql from 'graphql-tag';

export const MUTATION_CREATE_BLOG = gql`
  mutation createBlog(
    $category: String!
    $title: String!
    $content: String!
    $tags: [String!]!
  ) {
    createBlog(
      input: {
        category: $category
        title: $title
        content: $content
        tags: $tags
      }
    ) {
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

export const MUTATION_UPDATE_BLOG = gql`
  mutation updateBlog(
    $_id: String!
    $category: String!
    $title: String!
    $content: String!
    $tags: [String!]!
  ) {
    updateBlog(
      input: {
        _id: $_id
        category: $category
        title: $title
        content: $content
        tags: $tags
      }
    ) {
      _id
      category {
        _id
      }
      title
      content
      tags
    }
  }
`;

export const MUTATION_DELETE_BLOG_BY_ID = gql`
  mutation deleteBlogByID($id: String!) {
    deleteBlogByID(id: $id) {
      _id
      n
      deletedCount
      ok
    }
  }
`;

export const MUTATION_DELETE_ALL_BLOG = gql`
  mutation deleteAllBlogs {
    deleteAllBlogs {
      n
      deletedCount
      ok
    }
  }
`;
