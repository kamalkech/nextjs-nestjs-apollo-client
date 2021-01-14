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
