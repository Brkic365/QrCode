import React, { useState } from "react";
import "./CustomInput.scss";

function CustomInput({ names, isRequired, buttonText, parentCallback }) {
  // States

  const [max] = useState(Array.isArray(names) ? names.length : 1);
  const [types] = useState({
    email: "email",
    broj: "number",
    zip: "number",
    password: "password",
  });

  // Variables

  const inputs = [];
  let required = false;
  let text;
  let type = "text";

  // Functions

  const handleChange = (text) => (e) => {
    e.preventDefault();
    let object = {};
    object[text.replace(/\s/g, "").replace("(nijeobavezno)", "")] =
      e.target.value;
    parentCallback(object);
  };

  for (let i = 0; i < max; i++) {
    text = Array.isArray(names) ? names[i] : names;
    type = "text";

    required = !text.includes("nije obavezno");
    if (isRequired) required = isRequired;

    for (const [containing_word, typeValue] of Object.entries(types)) {
      if (text.toLowerCase().includes(containing_word)) type = typeValue;
    }

    inputs.push(
      <div className="custominput__field">
        <label htmlFor={`${text}`}>
          {text}
          {required ? <span style={{ color: "#EB5E55" }}> *</span> : null}
        </label>

        <div className="custominput__input-button">
          <input
            id={`${text}`}
            onChange={handleChange(text)}
            type={type}
            required={required}
          />

          {buttonText ? <button type="text">{buttonText}</button> : null}
        </div>
      </div>
    );
  }

  return <div className="custominput">{inputs}</div>;
}

export default CustomInput;
