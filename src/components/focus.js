import React, { useState } from 'react';
import './YourComponent.css';

function YourComponent() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`iconHolder ${isFocused ? 'focused' : ''}`}>
      <div
        tabIndex="0"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* Your content here */}
      </div>
    </div>
  );
}

export default YourComponent;
