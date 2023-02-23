import {default as axios} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c410eced-baa9-4d4f-8e7c-26e796d99261"
    },
})

export const usersAPI = {

    getUsers(currentPage: number, pageSize: number){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId:number){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId:number){
        return instance.delete(`follow/${userId}`)
    },
    authMe(){
        return instance.post(`auth/me`)
    },
    profile(userId:number){
        return instance.get(`profile/`+ userId)
    }
}