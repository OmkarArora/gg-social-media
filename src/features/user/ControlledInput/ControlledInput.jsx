import "./controlledInput.css";

export const ControlledInput = ({
  heading,
  maxLength,
  type,
  onInputChange,
  value,
}) => {
  return (
    <div className="controlled-input">
      <div className="header-controlledInput">
        <span>{heading}</span>
        <span>
          {value.length}/{maxLength}
        </span>
      </div>
      {type === "input" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => {
            let updatedValue = e.target.value;
            if (updatedValue.length <= maxLength) onInputChange(updatedValue);
          }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => {
            let updatedValue = e.target.value;
            if (updatedValue.length <= maxLength) onInputChange(updatedValue);
          }}
        />
      )}
    </div>
  );
};
