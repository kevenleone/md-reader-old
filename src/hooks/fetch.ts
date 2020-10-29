import axios from 'axios';

const useFetch = (url: string, params?: Object) => {
  return axios.get(url, { params });
};

const usePost = (url: string, body?: Object) => {
  return axios.post(url, body);
};

const useQuery = (query, variables) => {
  return axios
    .create({
      baseURL: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    })
    .post('', { query, variables });
};

export { useFetch, usePost, useQuery };
