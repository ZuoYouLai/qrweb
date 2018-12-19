import {history} from "../config";
const VALIDATOR_KEY = 'com.user';
const ACCESS_TOKEN_KEY = 'token';
let user = null;

export function loadValidator() {
    if (user) {
        return user
    }
    user = localStorage.getItem(VALIDATOR_KEY)
    if (!user) {
        return null
    }
    user = JSON.parse(user)

    return user
}

export function saveValidator(obj) {
    user = obj
    /**
     * 增加登录过期时间
     * @local_time
     */
    user.local_time = new Date().getTime();
    localStorage.setItem(VALIDATOR_KEY, JSON.stringify(user))
}

export function clearValidator() {
    user = null
    localStorage.removeItem(VALIDATOR_KEY)
}
export function clearValidatorGoLogin(){
    clearValidator();
    if(window.location.pathname.indexOf('admin') != -1){
        history.replace('/admin/login')
    }else{
        history.replace('/login')
    }
}
export function getAccessToken() {
    let validator = loadValidator()
    return validator && validator[ACCESS_TOKEN_KEY]
}

function getRole() {
    const validator = loadValidator()
    if (!validator) {
        return undefined
    }
    return loadValidator()
    //const decoded = jwtDecode(validator[ACCESS_TOKEN_KEY])
   // return decoded[ROLE_KEY]
}


export function isUser() {
    return true
}
