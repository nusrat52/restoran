
import axios from "axios"
export const Agent= {
    getOrders:() => {
      return axios.get("http://localhost:3000/db").then(data =>  data.data)
  },
  postOrders: (body) => {
     return axios.post("http://localhost:3000/sifarishler", body).then(data =>data.data)
  },
  putOrders: (body, id) => {
    return axios.put(`http://localhost:3000/sifarishler/${id}`, body).then(data =>data.data)
},
  
}

 