import formidable from "formidable";
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
            uploadDir: path.join(process.cwd(), "/public"),
            filename: () => {
                return 
            }
        }

        const form = formidable(options)
        form.parse(req, (err, fields, files) => {
            if(err){
                console.log(err)
            }
        })
        
        // return new Promise((resolve, reject) => {
            
        // })
    }

    if(method == 'POST'){

        
        parseFile();

        res.status(200).json({response: "Successful"});
    }
}