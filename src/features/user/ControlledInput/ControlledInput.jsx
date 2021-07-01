import { useRef } from "react";
import "./controlledInput.css";

export const ControlledInput = ({
  heading,
  maxLength,
  type,
  onInputChange,
  value,
}) => {
  const inputContainerRef = useRef(null);
  const headingRef = useRef(null);

  const highlightColor = "#db2777";
  const darkGreyColor = "#243447";
  const greyColor = "#888888";

  return (
    <div className="controlled-input" ref={inputContainerRef}>
      <div className="header-controlledInput" ref={headingRef}>
        <span>{heading}</span>
        <span>
          {value.length}/{maxLength}
        </span>
      </div>
      {type === "input" ? (
        <input
          type="text"
          value={value}
          onFocus={() => {
            inputContainerRef.current.style.borderColor = highlightColor;
            headingRef.current.style.color = highlightColor;
          }}
          onBlur={() => {
            inputContainerRef.current.style.borderColor = darkGreyColor;
            headingRef.current.style.color = greyColor;
          }}
          onChange={(e) => {
            let updatedValue = e.target.value;
            if (updatedValue.length <= maxLength) onInputChange(updatedValue);
          }}
        />
      ) : (
        <textarea
          value={value}
          onFocus={() => {
            inputContainerRef.current.style.borderColor = highlightColor;
            headingRef.current.style.color = highlightColor;
          }}
          onBlur={() => {
            inputContainerRef.current.style.borderColor = darkGreyColor;
            headingRef.current.style.color = greyColor;
          }}
          onChange={(e) => {
            let updatedValue = e.target.value;
            if (updatedValue.length <= maxLength) onInputChange(updatedValue);
          }}
        />
      )}
    </div>
  );
};
