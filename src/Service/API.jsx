import axios from "axios";

const baseURL = "https://dummyjson.com"

export const getData = async ()=>{
    try {
        return await axios.get(`${baseURL}/products`)
    }
    catch(error){
        console.log('Error while calling api.');
    }
}

export const getDataID = async (id)=>{
    try {
        return await axios.get(`${baseURL}/products/${id}`)
    }
    catch(error){
        console.log('Error while calling api.');
    }
}