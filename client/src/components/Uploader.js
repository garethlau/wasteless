import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const Uploader = (props) => {

    const [fileAdded, setFileAdded] = useState(false);
    const [base64Data, setBase64Data] = useState(null);

    const onDrop = useCallback(droppedFiles => {
        // ondrop
        console.log("AF", droppedFiles);
        if (droppedFiles.length > 1) {  // check for multiple images
            console.log("1 only pls");
        }
        else {
            let reader = new FileReader();
            // convert image to base64
            reader.readAsDataURL(droppedFiles[0]);
            reader.onloadend = () => {
                let data = reader.result;
                console.log(data);

                setBase64Data(data);
                setFileAdded(true);
                document.getElementById('img').setAttribute('src', data);
            }
        }
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const uploadFile = () => {
        console.log("Base64Data is", base64Data);
    };

    const removeFile = () => {
        console.log("remove file");
        setBase64Data(null);
        setFileAdded(false);
    }

    return (
        <>
        {
            fileAdded ? 
                <Container>
                    <Image style={{width: "100%"}} id="img" src="" rounded/>
                </Container>
                :
                <div {...getRootProps()}>
                    <input {...getInputProps()}/> 
                    {
                        isDragActive ? <p>Drop image here</p> : <p>Drag and drop image here</p>
                    }
                </div>
        }
        {
            fileAdded ?
                <div>
                    <ButtonToolbar>
                        <div style={{marginRight: "25px"}}>
                            <Button variant="primary" onClick={() => uploadFile()}>Nice</Button>
                        </div>
                        <Button variant="secondary" onClick={() => removeFile()}>Not nice</Button>
                    </ButtonToolbar>
                   
                </div>
                :
                <p></p>
        }    
        </>
    )
}

export default Uploader;