import axios from "axios"

const checkUser= async ()=>{
const { data } = await axios.get('/api/auth/me')
return data
}
export default checkUser