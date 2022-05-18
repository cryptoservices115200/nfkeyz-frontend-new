const Button = ({ children, gradient = false, className }) => {
  return (
    <div
      className={className + " component-button " + (gradient && "gradient ")}
    >
      {children}
    </div>
  );
};

export default Button;
