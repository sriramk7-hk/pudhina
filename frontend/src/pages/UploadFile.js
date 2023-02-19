
export default function UploadFile() {
    return(
        <div>
            <img alt="Upload file within 100MB"></img>
            <button onClick={handleFiles}>Upload</button>
            
        </div>
    )
}

let fileHandle;
export async function handleFiles() {
    const options = {
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    [fileHandle] = await window.showOpenFilePicker(options);

    const file = await fileHandle.getFile();
    console.log(file);
    return file;

  }