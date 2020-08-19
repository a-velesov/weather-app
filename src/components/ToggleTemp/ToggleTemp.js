import React, { useState } from 'react';

export const ToggleTemp = (props) => {

  const [toggled, setToggled] = useState(false);

  return (
    <label
      onClick={() => {
        setToggled((checked) => !checked);
        props.onClick();
      }}
    >
      {toggled && <span className="on">C</span>}
      {!toggled && <span className="off">F</span>}

      <div style={ { transform: toggled ? ' translateX(28px)' : ' translateX(0px)' } }/>
    </label>
  );
};
