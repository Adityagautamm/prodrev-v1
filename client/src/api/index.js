import axios from 'axios';

// to access store in a non component
let store

export const injectStore = _store => {
    store = _store
}

export const API = axios.create({ baseURL: 'http://localhost:5000', withCredentials: true, credentials: 'include' });



API.interceptors.request.use((req) => {
    try {
        console.log('token at interceptor:' + store.getState().auth.token)
        req.headers.Authorization = `Bearer ${store.getState().auth.token}`;

        return req;
    } catch (error) {
        console.log('request interceptor error')
    }
});


API.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            // add method below to call API to get new access token and save it in state- may be use useRfresh hook to do that
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            //   return axiosPrivate(prevRequest);
        }
        // return Promise.reject(error);
    }
);


const refresh = async () => {
    const response = await API.get('/refresh', {
        withCredentials: true
    });
    //saving the new access token in state
    // setAuth(prev => {
    //     console.log(JSON.stringify(prev));
    //     console.log(response.data.accessToken);
    //     return { ...prev, accessToken: response.data.accessToken }
    // });
    // return response.data.accessToken;
}
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// });


// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);