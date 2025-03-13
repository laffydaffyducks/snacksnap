import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const UploadImage: React.FC = () => {
  return (
    <div className='upload-image-container'>
      <div>Upload an image of what you ate:</div>
      {/* TODO: Upload Image logic here */}
      {/* <Dropzone
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
        {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
      ></Dropzone> */}
    </div>
  );
};

export default UploadImage;
