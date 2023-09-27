import React, { useState } from 'react';

const FileInput = ({ onFileChange }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    onFileChange(selectedFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default FileInput;
