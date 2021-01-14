import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface BlogCategory {
  _id: string;
  title: string;
}

interface BlogCategoryData {
  BlogCategory: BlogCategory[];
}

interface BlogCategoryVars {
  _id: string;
}

const GET_ALL_BLOG_CATEGORY = gql`
  query getAllBlogCategories {
    getAllBlogCategories {
      id
      model
      year
      stock
    }
  }
`;

export function BlogCategoryList() {
  const { loading, data } = useQuery<BlogCategoryData>(
    GET_ALL_BLOG_CATEGORY,
    // { variables: { year: 2019 } }
  );
  return (
    <div>
      <h3>All Blog Category</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data && data.BlogCategory.map(bc => (
              <tr>
                <td>{bc._id}</td>
                <td>{bc.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
