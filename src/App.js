import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber.length > 0) {
      window.open(`https://wa.me/${countryCode.match("[0-9]+") + phoneNumber}`);
      setPhoneNumber("");
    }
  };

  const [installEvent, setInstallEvent] = useState(null);
  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type={"text"}
            id="country-code-input"
            value={countryCode}
            size={countryCode.length}
            onChange={(e) =>
              setCountryCode((old) => {
                return e.target.value.length > 0 ? e.target.value : old;
              })
            }
          ></input>
          <input
            type={"tel"}
            id="phone-number-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]+"
          ></input>
        </div>
        <input
          type={"submit"}
          className={"button"}
          disabled={!phoneNumber}
          value={"Search"}
        ></input>
        {installEvent !== null && (
          <button
            className={"button"}
            style={{ filter: "revert" }}
            onClick={() => {
              installEvent.prompt().then((event) => {
                if (event.outcome === "accepted") {
                  setInstallEvent(null);
                }
              });
            }}
          >
            Install App
          </button>
        )}
      </form>
      <footer>
        Made with ❤️ by Yash Chaudhari |{" "}
        <a
          href={
            "https://github.com/yashchaudhari008/unsaved-contact-whatsapp-chat"
          }
        >
          Github
        </a>
      </footer>
    </div>
  );
}

export default App;
