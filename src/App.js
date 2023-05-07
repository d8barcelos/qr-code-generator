import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import QRCodeLib from 'qrcode';
import './App.css';

const App = () => {
  const [link, setLink] = useState('');
  const [qrCodeBlob, setQRCodeBlob] = useState(null);
  const qrCodeLinkRef = useRef(null);

  useEffect(() => {
    if (qrCodeBlob !== null) {
      qrCodeLinkRef.current.href = URL.createObjectURL(qrCodeBlob);
    }
  }, [qrCodeBlob]);

  const handleGenerate = (linkUrl) => {
    QRCodeLib.toCanvas(
      document.createElement('canvas'),
      linkUrl,
      {
        width: 600,
        margin: 3,
      },
      (error, canvas) => {
        if (error) {
          console.error(error);
        } else {
          canvas.toBlob((blob) => {
            setQRCodeBlob(blob);
          }, 'image/png');
        }
      }
    );
  };

  const handleQrcode = (e) => {
    setLink(e.target.value);
    handleGenerate(e.target.value);
  };

  return (
    <div className='container'>
      <QRCode value={link} />
      <input
        className='input'
        placeholder='Enter your link...'
        value={link}
        onChange={handleQrcode}
      />
      <a
        href='#'
        ref={qrCodeLinkRef}
        download='qrcode.png'
      >
        Download QR Code
      </a>
    </div>
  );
};

export default App;
