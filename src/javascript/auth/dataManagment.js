import { SessionStorage, LocalStorage } from "quasar";

function saveToken(name, value){
    SessionStorage.set(name, value);
}

function saveData(name, value){
    LocalStorage.set(name, value);
}

function getToken(name){    
    return SessionStorage.getItem(name)
}

export {saveToken, saveData, getToken}