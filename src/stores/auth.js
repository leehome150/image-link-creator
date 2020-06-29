import {observable, action} from 'mobx';
import {Auth} from "../models"
import UserStore from './user'

class AuthStore {
    @observable isLogin = false;
    @observable isLoading = false;
    @observable values = {
        username: '',
        password: ''

    }

    @action setIsLogin(isLogin) {
        this.isLogin = isLogin;
    }

    @action setUsername(username) {
        this.values.username = username;

    }

    @action setPassword(password) {
        this.values.password = password
    }

    @action login() {
        return new Promise((resolve, reject) => {
            Auth.login(this.values.username, this.values.password)
                .then(user => {
                    console.log('登录成功');
                    UserStore.pullUser()
                    resolve(user)
                }).catch(err => {
                console.log('登录失败');
                reject(err)
            })
        })

    }

    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password)
                .then(user => {
                    console.log('注册成功');
                    UserStore.pullUser()
                    resolve(user)
                }).catch(err => {
                console.log('注册失败');
                UserStore.resetUser()
                reject(err)
            })
        })

    }

    @action logout() {
        Auth.logout();
        UserStore.resetUser()
    }

}

export default new AuthStore();