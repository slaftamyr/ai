import { Button } from "@mui/material";

const ShowImage = (props) => {
  const imageStyle = {
    width: "74%",
    height: "70%",
    borderRadius: "4%",
    marginBottom: "20px",
  };
  const textStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  return (
    <div>
      {props.theError ? (
        <div>
          <img src={props.img} alt="image" style={imageStyle} />
          <p style={textStyle}> {props.inputValue}</p>
          <Button
            onClick={() => {
              props.setShowResponse(false);
            }}
          >
            back
          </Button>
        </div>
      ) : (
        <div>
          <div>{props.errorMsg}</div>
          <Button
            onClick={() => {
              props.setShowResponse(false);
            }}
          >
            back
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShowImage;
