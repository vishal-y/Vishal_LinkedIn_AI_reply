import React from "react";

type ButtonProp = {
    id: string;
    title: string;
    bgColor: string;
    textColor: string;
    borderColor?: string;
    cursor: string;
    iconSrc: string;
    iconHeight : string,
    clickFunction?: () => void;
}

function Button(props: ButtonProp) {
  return (
    <button
      id={props.id}
      style={{
        backgroundColor: props.bgColor,
        color: props.textColor,
        border: props.borderColor ? `1px solid ${props.borderColor}` : 'none',
        cursor: props.cursor === "disable" ? "not-allowed" : "pointer",
      }}
      disabled={props.cursor === "disable"}
      className="flex font-normal justify-center items-center gap-2 px-4 py-1.5 rounded-lg"
      onClick={() => {
        if (props.clickFunction) {
          props.clickFunction(); 
        }
      }}
    >
      <img
        src={props.iconSrc}
        alt={props.title}
        style={{height : props.iconHeight}}
        className={`align-middle } mt-1 mr-1`}
      />
      <p>{props.title}</p>
    </button>
  );
}

export default Button;