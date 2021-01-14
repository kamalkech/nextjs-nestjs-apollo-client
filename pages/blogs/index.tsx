import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBlogs } from "../../redux/blog/actions";

interface IProps {
  blogs: [];
  blog: null,
  loading: boolean;
}

const BlogsPage = (props: IProps) => {
  return (
    <>
      <div className="container fluid mt-2 mb-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>List Blogs</h1>
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
                        <button className="btn btn-dark">Details</button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchBlogs: bindActionCreators(fetchBlogs, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  blogs: state.blog.blogs,
  blog: null,
  loading: state.blog.loading,
});

BlogsPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  if (state.blog.blogs.length === 0) {
    await props.store.dispatch(await fetchBlogs());
  }
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);
