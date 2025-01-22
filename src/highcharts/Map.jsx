// src/components/EmbeddedMap.jsx
import React from "react";

const EmbeddedMap = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "5px",marginLeft: "10px"  }}>



      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3548.313279678833!2d-98.80267592437106!3d31.258275560044297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDE1JzI5LjgiTiA5OMKwNDgnMDAuNCJX!5e1!3m2!1sen!2sin!4v1737458484173!5m2!1sen!2sin"
        width="650px"
        height="450"

        
        style={{ border: "0",borderRadius:"5px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default EmbeddedMap;
