import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [installEvent, setInstallEvent] = useState(null);
  const [showCountryCode, setShowCountryCode] = useState(true);

  const parseNumber = (numberString) => {
    if (numberString[0] === "+") {
      setShowCountryCode(false);
    } else {
      setShowCountryCode(true);
    }
    return numberString.replace(/[^0-9+]/g, "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!phoneNumber.length) return;
    // If user not put country code, then user can't go to next step
    if (countryCode.trim().length <= 1) return;
    window.open(
      `https://wa.me/${
        (showCountryCode ? countryCode.match("[0-9]+") : "") +
        phoneNumber.replace(/[+]/g, "")
      }`
    );
    setPhoneNumber("");
    setShowCountryCode(true);
  };

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
          {showCountryCode && (
            <input
              type={"text"}
              id="country-code-input"
              value={countryCode}
              size={countryCode.length}
              onChange={(e) =>
                setCountryCode((old) =>
                  e.target.value.length ? e.target.value : old
                )
              }
              autoComplete="off"
            />
          )}
          <input
            type={"tel"}
            id="phone-number-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseNumber(e.target.value))}
            autoComplete={"off"}
            pattern="^(\+?(\d{1,3}))?[0-9]+"
          />
        </div>
        <input
          type={"submit"}
          className={"button"}
          disabled={!phoneNumber}
          value={"Search"}
        />
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
