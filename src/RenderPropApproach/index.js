import React from 'react';
import axios from 'axios';

const API = 'http://18.237.242.89/api/problems';
// const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(this.props.url)
      .then(result => this.setState({
        data: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    return this.props.children(this.state);
  }
}

const RenderPropApproach = ({ data, isLoading, error }) =>
  <Fetcher url={API }>
    {({ data, isLoading, error }) => {
      if (!data) {
        return <p>No data yet ...</p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

      return (
        <ul>
          {data.data.problems.map(problem =>
            <li key={problem.id}>
              <h1>Problem ID : {problem.id}</h1>
              <strong>Subject ID : {problem.subject_id}</strong>
              <br/>
              <strong>Created At : {problem.created_at}</strong>
              <br/>
              <strong>Updated At : {problem.updated_at}</strong>
            </li>
          )}
        </ul>
      );
    }}
  </Fetcher>

export default RenderPropApproach;
