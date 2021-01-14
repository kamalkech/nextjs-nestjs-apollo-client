import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useQuery, useMutation } from '@apollo/client';
import withApollo from '../lib/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

import { GET_ALL_BLOG_CATEGORY } from '../apollo/queries/blog';
import { MUTATION_CREATE_BLOG, MUTATION_DELETE_BLOG_BY_ID } from '../apollo/mutations/blog';


const Home = () => {

  // Fetch blog.
  const { loading, error, data } = useQuery(GET_ALL_BLOG_CATEGORY);
  // Create blog.
  const [createBlog] = useMutation(MUTATION_CREATE_BLOG, {
    update(cache, {data: {createBlog}}) {
      const {blogs} = cache.readQuery({query: GET_ALL_BLOG_CATEGORY})
      cache.writeQuery({
        query: GET_ALL_BLOG_CATEGORY,
        data: { blogs: [...blogs, createBlog]}
      });
    }
  });
  // Delete blog.
  const [deleteBlogById] = useMutation(MUTATION_DELETE_BLOG_BY_ID, {
    update(cache, {data: {deleteBlogByID}}) {
      const { blogs } = cache.readQuery({query: GET_ALL_BLOG_CATEGORY})
      const newBlogs = blogs.filter(b => b._id !== deleteBlogByID._id);
      cache.writeQuery({
        query: GET_ALL_BLOG_CATEGORY,
        data: { blogs: newBlogs }
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Handlers
  const creatBlogHanlder = async (): Promise<void> => {
    const newData = await createBlog({
      variables: {
        category: "5fe7bf224ab62548684c7fd9",
        title: "Seven Blog",
        content: "Content of Seven Blog",
        tags: []
      }
    });
    // console.log('newData', newData)
  }
  const deleteBlogByIdHander = async (id) => {
    await deleteBlogById({
      variables: { id }
    })
  }

  return (
    <Container>
      <h1>Nextjs + NestJS + Graphql + MongoDB</h1>
      <br/>
      <Row>
        <Col>
          <Button variant="primary" onClick={async (e) => creatBlogHanlder()}>Add blog</Button>  
        </Col>
      </Row>

      <hr/>
      
      <Row>
        <Col>
          {data.blogs.map((blog) => (
            <div key={blog._id}>
              <h2>{blog.title} | {blog._id}</h2>
              <p>{blog.content}</p>
              <p>{blog.tags}</p>
              <span><Button variant="danger" onClick={async (e) => deleteBlogByIdHander(blog._id)}>delete</Button></span>
              <hr/>
            </div>
          ))}
        </Col>
      </Row>
      
      
    </Container>
  );
}

export default withApollo(Home, {getDataFromTree});
