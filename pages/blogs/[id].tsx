import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBlog, fetchBlogs } from "../../redux/blog/actions";

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
        <Link href="/blogs" as={`/blogs`}>
          <a>
            <button className="btn btn-info">Back to List</button>
          </a>
        </Link>
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
  const id = props.query.id;
  await props.store.dispatch(await fetchBlog(id));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
