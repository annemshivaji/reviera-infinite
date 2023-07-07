import React from "react";

function Button({ title, onClick, variant, disabled, fullWidth, type }) {
  let className = "bg-primary p-1 text-white br";


  if (variant === "outlined") {
    className = className.replace(
      "bg-primary",
      "border border-primary text-primary bg-white"
    );
  }

  if (variant === "transparent") {
    className = className.replace(
      "bg-primary p-1 text-white",
      "btn p-1 text-sm"
    );
  }

  if (variant === "transparent1") {
    className = className.replace(
      "bg-primary p-1 text-white",
      "btn p-1 text-lg"
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
