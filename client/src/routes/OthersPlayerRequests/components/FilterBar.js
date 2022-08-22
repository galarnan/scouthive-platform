import React from 'react';
import DropdownCheck from './DropdownCheck';
const FilterBar = props => {
  return (
    <div
      className="row bg-body pt-3 relative border-top bgcolor-black"
      style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
    >
      <DropdownCheck />
    </div>
  );
};

export default FilterBar;
