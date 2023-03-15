import {default as axios} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c410eced-baa9-4d4f-8e7c-26e796d99261"

    },
})

export const usersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },


    profile(userId: number) {
        console.warn('Change the method to profileApi')
        return profileAPI.getProfile(userId)
    }

}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    outLog() {
        return instance.delete(`auth/login`)
    },
}