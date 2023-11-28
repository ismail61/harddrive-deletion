import React from 'react';
import './index.css';

const DownloadButton = ({tableData}) => {
  const handleDownload = () => {
    const data = 'This is the content of the file.';
   
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Customer_data.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // alert('File downloading...');
  };

  return (
    <div className='pt-5 '>
      <button onClick={handleDownload}>Download Page</button>
    </div>
  );
};

export default DownloadButton;
