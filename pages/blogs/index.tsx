import Link from "next/link";

// Hook form.
import { useForm } from "react-hook-form";

// Redux
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addBlog, deleteAllBlogs, deleteBlog, fetchBlogs, fetchCategoriesBlogs } from "../../redux/blog/actions";

// Bootstrap.
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

interface IProps {
  blogs: [];
  blog: null,
  loading: boolean;
  addBlog: any;
}

const BlogsPage = (props: any) => {
  const { register, handleSubmit, watch, errors } = useForm();
  
  useEffect( () => {
    async function fetchAllBlogs() {
      await props.fetchBlogs();
    }
    async function fetchAllCategoriesBlogs() {
      await props.fetchCategoriesBlogs();
    }
    fetchAllBlogs();
    fetchAllCategoriesBlogs();
  }, []);

  const onSubmit = async data => {;
    await props.addBlog(data);
  };

  return (
    <>
      <div className="container fluid mt-2 mb-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Nextjs + Nestjs + Graphql + Redux + Mongodb</h1>
            <h2>List Blogs</h2>
          </div>
          <Button variant="primary" type="submit" onClick={async (e) => {
            e.stopPropagation();
            await props.fetchBlogs();
          }}>
              refresh
            </Button>
        </div>
        <div className="row">
          <div className="col-md-12">
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" custom name="category" ref={register}>
                {props.categoriesBlogs &&
                  props.categoriesBlogs.map((cb: any, idx: number) => (
                    <option key={idx} value={cb._id}>{cb.title}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" ref={register} defaultValue="test title blog" />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" name="content" placeholder="Enter content" ref={register} defaultValue="test content blog" />
            </Form.Group>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" name="tags" placeholder="Enter tags" ref={register} defaultValue="sport,fifa" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
          </div>
        </div>
      </div>
      <div className="container fluid">
        <div className="row">
          {props.blogs &&
            props.blogs.map((blog: any, idx: number) => (
              <div key={idx} className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title text-truncate">
                      {blog.title}
                    </h5>
                    <p>{blog._id}</p>
                    <Link href="/blogs/[id]" as={`/blogs/${blog._id}`}>
                      <a>
                        <Button variant="info" block>Details</Button>
                      </a>
                    </Link>
                  </div>
                  <Button variant="danger" onClick={async (e) => {
                    await props.deleteBlog(blog._id)
                  }}>Delete</Button>
                </div>
              </div>
            ))}
        </div>
        <br/>
        <Row>
          <Button variant="dark" block onClick={async (e) => {
            await props.deleteAllBlogs()
          }}>Delete All</Button>
        </Row>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchBlogs: bindActionCreators(fetchBlogs, dispatch),
    addBlog: bindActionCreators(addBlog, dispatch),
    deleteBlog: bindActionCreators(deleteBlog, dispatch),
    deleteAllBlogs: bindActionCreators(deleteAllBlogs, dispatch),
    fetchCategoriesBlogs: bindActionCreators(fetchCategoriesBlogs, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  blogs: state.blog.blogs,
  blog: null,
  categoriesBlogs: state.blog.categoriesBlogs,
  loading: state.blog.loading,
});

// BlogsPage.getInitialProps = async (props: any) => {
//   const state = props.store.getState();
//   // props.store.dispatch(await fetchBlogs());
//   // props.store.dispatch(await fetchCategoriesBlogs());
//   return {};
// };

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);
