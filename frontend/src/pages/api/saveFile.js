import {handleFiles} from '../UploadFile';
import fs from "fs";

async function saveFile() {
    const file = handleFiles();

    await file.move()
}