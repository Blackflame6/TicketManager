import { useState, createContext } from "react";
import axios from "axios"
const PicContext = createContext()

export const PicProvider = ({children}) =>{
    //state goes here
    const [pic, setPic] = useState("");
    const [file, setFile] = useState();
    //functionality that changes the state
    const fileState = (e) =>{
        e.preventDefault()
        setFile(e.target.files[0])
    }
    const fetchReq = async(e) =>{
        e.preventDefault()
        const getUrl = await axios.get("https://ticket-manager-api.onrender.com/s3Url")
        const {url} = await getUrl.data
        await fetch(url, {
            method: "PUT",
            header: {
                "Content-Type": "multiport/form-data"
            },
            body: file
        })
        const appendImage = await url.split('?')[0]
        setPic(appendImage)
    }
    //return the functionality we made
    return <PicContext.Provider value={{fetchReq, fileState, pic, file, setPic}}>
        {children}
    </PicContext.Provider>
}

export default PicContext