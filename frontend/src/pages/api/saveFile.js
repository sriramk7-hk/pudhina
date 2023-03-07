import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config ={
    api: {
        bodyParser: false,
    }
}

export default function handler(req, res){
    const {method} = req;

    const parseFile = () => {
        const options = {
            uploadDir: path.join(process.cwd(), "/public")
        }

        const form = formidable(options)
        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if(err){
                    reject(err)
                }else{
                    resolve({fields, files})
                }
            })
        })
    }

    if(method == 'POST'){

        
        parseFile();

        res.status(200).json({response: "Successful"});
    }
}