import axios from "axios";
const baseUrl = '/api/login'
//const baseUrl = 'http://localhost:3001/api/login'

const login = async Credentials => {
    const response = await axios.post(baseUrl, Credentials)
    return response.data
}

export default { login }
