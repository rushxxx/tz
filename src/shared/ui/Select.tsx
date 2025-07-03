import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = (props) => {
  return <select {...props} />;
};

export default Select; 