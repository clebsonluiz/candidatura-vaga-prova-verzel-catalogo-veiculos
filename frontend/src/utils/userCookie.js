import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";


export const TK_ACCESS = 'tk_a';
export const TK_REFRESH = 'tk_r';


export const getUserTKCookie = (name) => {
    const cookie = new Cookies();
    return cookie.get(name);
}


export const setUserTKCookie = (name, tokenJWTInfo) => {
    const cookie = new Cookies();
    const decode = jwtDecode(tokenJWTInfo);
    cookie.set(name, tokenJWTInfo, {
        expires: new Date(decode.exp * 1000)
    });
}


export const clearTKCookie = (name) => {
    const cookie = new Cookies();
    // document.cookie = `${name}=; expires=0; path=/;`
    // cookie.set(name, null, {expires: 0});
    cookie.remove(name);
}

