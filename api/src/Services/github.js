import axios from 'axios'

export default function github(){

    async function getUser(username){
        return axios.get(`https://api.github.com/users/${username}`)
    }

    return {
        getUser
    }
}
    
