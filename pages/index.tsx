import Head from 'next/head'

import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import withApollo from '../lib/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const GET_ALL_BLOG_CATEGORY = gql`
query {
  blogs: getAllBlogs {
    _id
    title
    content
    tags
  }
}
`;

const MUTATION_CREATE_BLOG = gql`
  mutation createBlog($category: String!, $title: String!, $content: String!, $tags: [String!]!) {
    createBlog(input: {
      category: $category, title: $title, content: $content, tags: $tags
    }) {
      _id
      title
      content
      tags
    }
  }
`;

const Home = () => {

  const { loading, error, data } = useQuery(GET_ALL_BLOG_CATEGORY);
  const [createBlog] = useMutation(MUTATION_CREATE_BLOG, {
    update(cache, {data: {createBlog}}) {
      const {blogs} = cache.readQuery({query: GET_ALL_BLOG_CATEGORY})
      cache.writeQuery({
        query: GET_ALL_BLOG_CATEGORY,
        data: { blogs: [...blogs, createBlog]}
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
    <button onClick={async (e) => {
      const newData = await createBlog({
        variables: {
          category: "5fe7bf224ab62548684c7fd9",
          title: "Seven Blog",
          content: "Content of Seven Blog",
          tags: []
        }
      });
      console.log('newData', newData)
    }}>Add blog</button>

    <hr/>
    
    {data.blogs.map((blog) => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>{blog.tags}</p>
          </div>
        ))}
    </>
  );

}

export default withApollo(Home, {getDataFromTree});
