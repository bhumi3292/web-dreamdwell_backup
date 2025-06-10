import axios from "./api"

export  const registerUserApi=(data) =>{
    console.log(data)
   return axios.post('/auth/register',data)
}
export  const loginUserApi=(data) => axios.post("/auth/login", data)