import React, { useState } from "react";
import "./App.scss";
import CustomInput from "./Components/CustomInput/CustomInput";
import QRCode from "qrcode.react";

import { BiErrorCircle } from "react-icons/bi";

import VCard from "vcard-creator";

function Checkout() {
  // States
  const [inputValues, setInputValues] = useState({});
  const [vcardString, setVcardString] = useState(null);
  const [error, setError] = useState(null);

  // Variables

  const namesList = [
    ["Ime", "Prezime"],
    "Telefonski broj",
    ["ZIP (nije obavezno)", "Email adresa (nije obavezno)"],
    ["Drzava (nije obavezno)", "Grad (nije obavezno)"],
    ["Ulica (nije obavezno)"],
  ];

  // Functions

  const generateCode = () => {
    if (inputValues.Ime && inputValues.Prezime && inputValues.Telefonskibroj) {
      // Define a new vCard
      const myVCard = new VCard();

      myVCard
        // Add personal data
        .addName(inputValues.Prezime, inputValues.Ime)
        // Add work data
        .addEmail(inputValues.Emailadresa || "")
        .addPhoneNumber(inputValues.Telefonskibroj)
        .addAddress(
          null,
          null,
          inputValues.Ulica || "",
          inputValues.Grad || "",
          null,
          inputValues.ZIP || "",
          inputValues.Drzava || ""
        );

      setVcardString(myVCard.toString());
      setError(null);
    } else {
      setVcardString(null);
      setError("Molimo vas da ispunite obavezna polja.");
    }
  };

  const handleCallback = (data) => {
    setInputValues({ ...inputValues, ...data });
    console.log(inputValues);
  };

  return (
    <div className="app">
      <div className="title">
        <h1>Qr Kod Generator</h1>
      </div>
      <div className="content">
        <div className="value_input">
          <h2>Unesi Vrijednosti</h2>
          <div className="inputs">
            {namesList.map((names) => (
              <CustomInput names={names} parentCallback={handleCallback} />
            ))}
          </div>
          <div className="buttons">
            <button type="text" onClick={generateCode}>
              Generiraj
            </button>
          </div>
        </div>
        <div className="qrCode">
          <h2>Qr Kod</h2>
          <div className="image">
            {vcardString && <QRCode value={vcardString} size={256} />}
            {error && (
              <div className="error">
                <BiErrorCircle color="white" size="2rem" />
                <p>Molimo vas da ispunite obavezna polja.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
