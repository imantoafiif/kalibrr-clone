import { jwtDecode } from "jwt-decode";

const getUserSession = () => {
    const token = localStorage.getItem('user-session')
    if(token) {
        const parsed_token = jwtDecode(token)
        return parsed_token
    }
    return null
}

export default getUserSession