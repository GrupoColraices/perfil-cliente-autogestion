const Chip = ({ children, bgColor = "#ff5c35"}) => {
  return (
    <div
      className={'inline-flex items-center rounded-md py-0.3 px-2 border border-transparent text-xs text-white shadow-sm'}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

export default Chip;