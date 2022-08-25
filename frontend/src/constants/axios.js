import axios from 'axios'
import { SERVER_URL } from './urls'
const api=axios.create({baseURL:SERVER_URL});


api.interceptors.request.use(
    function(configs) {
        let admin=JSON.parse( localStorage.getItem("adminData"))
      const token = admin
      console.log(token)
      if (token) {
        configs.headers["Authorization"] = token;
      }
      return configs;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

export default api;