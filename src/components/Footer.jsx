import React, { useState, useEffect } from "react";

const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleString());
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <footer className="fixed-bottom ml-3">
        <p>{currentTime}</p>
      </footer>
    );
}

export default Footer