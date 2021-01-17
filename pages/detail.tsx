import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBlog, fetchBlogs } from "../redux/blog/actions";


const DetailPage = (props: any) => {
  return (
    <>
      <div className="container fluid mt-2 mb-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Detail Blog</h1>
          </div>
        </div>
      </div>
      <div className="container fluid">
        <div className="row">
        {props.blog &&
          <div>
            <h2>{props.blog.title}</h2>
            <br/>
            <p>{props.blog._id}</p>
          </div>
        }
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchBlog: bindActionCreators(fetchBlog, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  blog: state.blog.blog,
  loading: state.blog.loading,
});

DetailPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  console.log('props.query.id', props.query.id)
  if (!state.blog.blog) {
    await props.store.dispatch(await fetchBlog(props.query.id));
  }
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
