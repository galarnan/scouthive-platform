import React from 'react';
import DropdownCheck from './DropdownCheck';
const FilterBar = props => {
  return (
    <div
      className="d-flex center align-items-center bg-body w-80 h-25 bgcolor-black px-3"
      style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
    >
      <DropdownCheck />
    </div>
  );
};

export default FilterBar;
