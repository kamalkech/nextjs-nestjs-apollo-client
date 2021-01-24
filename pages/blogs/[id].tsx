import Link from "next/link";

// Hook form.
import { useForm } from "react-hook-form";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBlog, fetchBlogs, fetchCategoriesBlogs, FETCH_BLOG, FETCH_CATEGORIES_BLOGS, updateBlog } from "../../redux/blog/actions";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

interface IBlog {
  _id: string;
  title: string;
  content: string;
  tags: [string];
}

interface IProps {
  blog: IBlog,
  loading: boolean
}

const DetailPage = (props: any) => {
  const { register, setValue, handleSubmit, watch, errors } = useForm();

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect( () => {
    async function fetchBlogAction() {
      await props.fetchBlog(props.id);
    }
    fetchBlogAction();
    
    async function fetchAllCategoriesBlogs() {
      await props.fetchCategoriesBlogs();
    }
    fetchAllCategoriesBlogs();

    if (props.blog) {
      setCategory(props.blog.category._id)
      setTitle(props.blog.title)
      setContent(props.blog.content)
      setTags(props.blog.tags);
    }
  }, [props.blog]);

  const onUpdateHandler = async data => {
    const values = {...data, _id: props.blog._id };
    await props.updateBlog(values);
  };

  return (
    <>
      <Container>
        <Row>
          <div className="col-md-12 text-center">
            <h1>Detail Blog</h1>
          </div>
        </Row>

        <hr/>

        <Row>
          {props.blog &&
            <div>
              <h2>{props.blog.title}</h2>
              <div>{props.blog.content}</div>
              <p>Category: {props.blog.category.title}</p>
            </div>
          }
        </Row>

        <hr/>

        {props.blog &&
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onUpdateHandler)}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    name="category"
                    ref={register}
                    value={ category }
                    onChange={(e) => {
                      console.log('e.target.value', e.target.value)
                      setCategory(e.target.value)
                      setValue('category', e.target.value)
                    }}
                  >
                    { props.categoriesBlogs &&
                      props.categoriesBlogs.map((cb: any, idx: number) => (
                        <option key={ idx } value={ cb._id }
                        >{ cb.title } = { cb._id }</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={ title }
                    ref={register}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      setValue('title', e.target.value)
                    }}
                    />
                </Form.Group>

                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    name="content"
                    placeholder="Enter content"
                    ref={register}
                    value={ content }
                    onChange={(e) => {
                      setContent(e.target.value)
                      setValue('content', e.target.value)
                    }}
                    />
                </Form.Group>

                <Form.Group controlId="tags">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="tags"
                    placeholder="Enter tags"
                    ref={register}
                    value={ tags }
                    onChange={(e) => {
                      setTags(e.target.value)
                      setValue('tags', e.target.value)
                    }}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
          }
        <hr/>

        <Row>
          <Link href="/blogs" as={`/blogs`}>
            <a>
              <button className="btn btn-info">Back to List</button>
            </a>
          </Link>
        </Row>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategoriesBlogs: bindActionCreators(fetchCategoriesBlogs, dispatch),
    fetchBlog: bindActionCreators(fetchBlog, dispatch),
    updateBlog: bindActionCreators(updateBlog, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  blog: state.blog.blog,
  categoriesBlogs: state.blog.categoriesBlogs,
  loading: state.blog.loading,
});

DetailPage.getInitialProps = async (props: any) => {
  const id = props.query.id;
  // Dispatch actions to get blog by id and all categories.
  await props.store.dispatch(await fetchBlog(id));
  await props.store.dispatch(await fetchCategoriesBlogs());

  return { id };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
