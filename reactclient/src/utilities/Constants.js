const API_URL_DEV = "https://localhost:7164";
const API_URL_PROD = "https://appname.azure.net";

const ENDPOINTS = {
    GET_ALL_POSTS: 'getAllPosts',
    GET_POST_BY_ID: 'getPostById',
    CREATE_POST: 'createPost',
    UPDATE_POST: 'updatePost',
    DELETE_POST_BY_ID: 'deletePostById'
};

const development = {
    API_URL_GET_ALL_POSTS: `${API_URL_DEV}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_URL_DEV}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_CREATE_POST: `${API_URL_DEV}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_URL_DEV}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELERE_POST_BY_ID: `${API_URL_DEV}/${ENDPOINTS.DELETE_POST_BY_ID}`,
};

const production = {
    API_URL_GET_ALL_POSTS: `${API_URL_PROD}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_URL_PROD}/${ENDPOINTS.GET_POST_BY_ID}`,
    API_URL_CREATE_POST: `${API_URL_PROD}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_URL_PROD}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELERE_POST_BY_ID: `${API_URL_PROD}/${ENDPOINTS.DELETE_POST_BY_ID}`,
};

const Constants = process.env.NODE_ENV === 'development' ? development : production;

export default Constants;