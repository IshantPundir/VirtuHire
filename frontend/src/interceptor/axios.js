import axios from "axios";

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        console.log(localStorage.getItem('virtuhire_refresh_token'))
        const response = await axios.post('http://127.0.0.1:8000/token/refresh/',
            { refresh_token:localStorage.getItem('virtuhire_refresh_token') },
            { headers: {'Content-Type': 'application/json'} },  
            { withCredentials: true }
        );

        if (response.status === 200) {
            localStorage.setItem('virtuhire_access_token', response.data.access);
            localStorage.setItem('virtuhire_refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] =  `Bearer ${response.data.access}`;
            
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});