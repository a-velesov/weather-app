import React from 'react';
import { useSelector } from 'react-redux';

export const CityList = (props) => {


  const local = useSelector((state) => state.app.cityList)

    // доп код

  let localStorage = []
  localStorage.push(local)
  localStorage.join('')


  return (
    <>
      <div>
        { localStorage }
      </div>
    </>
  );
};
