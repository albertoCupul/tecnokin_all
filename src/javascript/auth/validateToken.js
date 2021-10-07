import { SessionStorage } from "quasar";
import { api } from "../../boot/axios";
import Router from "../../router/index";

async function validateToken(bearerToken, getDataUser=false){    
    try {
        api.defaults.headers.common.Authorization = `Bearer ${bearerToken}`;
        let response = null;
        if (getDataUser){
            response = await api.post("/login/validateToken/true");
        }else{
            response = await api.post("/login/validateToken/false");
        }
        if (response.data.HTTP === 100){
            if (getDataUser===true){
                return response
            }
            return 1
        }
        return 2
        
    } catch (error) {        
        return 3
    }
}

function existToken(tokenName){
    if (SessionStorage.has(tokenName)){
        return true
    } 
        return false
    
}

function deleteToken(tokenName){
    SessionStorage.remove(tokenName)
}

async function redireccionar(nextPage, reloadPage = true){
    const navigation = Router();
    await navigation.push({ path: nextPage });
    if (reloadPage){
        window.location.reload();
    }    
}

export {validateToken, redireccionar, existToken, deleteToken}