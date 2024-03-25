import { useState } from "react";
import axios from "axios";
import "./App.css";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//import { openAiKey } from "./key";
import ShowImage from "./ShowImage";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [openAiKey] = useState(import.meta.env.VITE_OPEN_AI_KEY0);
  const [buttonColor, setButtonColor] = useState("gray");
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [theError, setTheError] = useState(true);
  console.log(openAiKey);
  function show(event) {
    setInputValue(event.target.value);
    if (event.target.value === null) {
      setButtonColor("gray");
    } else {
      setButtonColor("#1de9b6");
    }
  }

  function getReqest() {
    setIsLoading(true);

    const url = "https://api.openai.com/v1/images/generations";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    };
    const data = {
      model: "dall-e-2",
      prompt: inputValue,
      n: 1,
      size: "1024x1024",
    };

    axios
      .post(url, data, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        setIsLoading(false);
        setImageURL(response.data.data[0].url);
        console.log(imageURL);
        setShowResponse(true);
        setTheError(true);
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoading(false);
        setShowResponse(true);
        setTheError(false);
      });
  }

  return (
    <>
      {showResponse ? (
        <ShowImage
          img={imageURL}
          inputValue={inputValue}
          setShowResponse={setShowResponse}
          theError={theError}
        />
      ) : (
        <>
          <div
            style={{
              backgroundColor: "#1de9b6",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "23px",
              border: "5px",
              borderColor: "#00bfa5",
              borderRadius: "37px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#333333",
              }}
            >
              Aimag
            </div>
          </div>
          <TextField
            value={inputValue}
            onChange={show}
            id="outlined-multiline-flexible"
            label="description"
            multiline
            maxRows={4}
          />
          <hr />
          <button
            style={{ border: "gray", backgroundColor: buttonColor }}
            onClick={getReqest}
          >
            Send
          </button>
          {isLoading && <CircularProgress />}
        </>
      )}
    </>
  );
}

export default App;
