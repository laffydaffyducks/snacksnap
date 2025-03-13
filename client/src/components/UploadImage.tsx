import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadImage.css';

interface DropzoneFile extends File {
  preview: string;
}

const UploadImage: React.FC = () => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accepted image file types
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp'],
    },
    onDrop: (acceptedFiles: File[]) => handleDrop(acceptedFiles),
  });

  const handleDrop = (acceptedFiles: File[]) => {
    // when users drop the image, will map through  the file and create array object with image details, including URL blob of image
    const previewFiles: DropzoneFile[] = acceptedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));

    // Set the first file preview to state
    if (previewFiles.length > 0) {
      setFilePreview(previewFiles[0].preview);
    }

    console.log('Accepted files: ', previewFiles);
    console.log('IMG HERE: ', previewFiles[0].preview);

    // TODO: send image to BE to analyze
    // Image Blob to send to BE
    // previewFiles[0].preview

    setIsProcessing(true);

    const imageBlob: string = previewFiles[0].preview;
    handleImageProcessing(imageBlob);

    // setIsProcessing(false);
  };

  const handleImageProcessing = (imageBlob: string) => {
    // TODO: BE logic here
    // fetch image details
    // pass to foodItemsList?
  };

  return (
    <div className='upload-image-container'>
      <h3 className='upload-prompt'>Upload an image of what you ate:</h3>
      <div
        className={filePreview ? 'image-drop image-drop-preview' : 'image-drop'}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop an image here, or click to select an image</p>
        )}
      </div>

      {/* Display the image preview */}
      {filePreview && isProcessing && (
        <div className='img-processing'>
          <img
            src={filePreview}
            className='img-preview opacity'
            alt='image preview processing'
          />
          <div className='processing-txt'>
            <p>Processing...</p>
            <div className='loader'></div>
          </div>
        </div>
      )}
      {filePreview && !isProcessing && (
        <img
          src={filePreview}
          className='img-preview'
          alt='preview of image uploaded'
        />
      )}
    </div>
  );
};

export default UploadImage;
