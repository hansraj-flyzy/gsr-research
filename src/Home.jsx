import React from "react";
import "./home.scss";
import { setGlobalState, useGlobalState } from "./state";
// import { CSVLink } from "csv";
// import FinishDialog from "./FinishDialog";
// var randomstring = require("randomstring");

const Home = () => {
  const [page] = useGlobalState("page");
  const [gsrSensorStatus] = useGlobalState("gsrSensorStatus");
  const [ecgSensorStatus] = useGlobalState("ecgSensorStatus");
  const [recordingStatus] = useGlobalState("recordingStatus");
  // const [seconds, setSeconds] = useState(1);
  // const [timerId, setTimerId] = useState(0);
  // const [userId, setUserId] = useState(randomstring.generate(4).toUpperCase());
  // const [filename, setFilename] = useState("");
  // const [finishDialogVisible, setFinishDialogVisible] = useState(false);
  let loggingStartedTimeStamp = "";
  let loggingEndedTimeStamp = "";

  const setPage = (page) => {
    setGlobalState("page", page);
  };
  const getFileName = (ts) => {
    // return "../recordings/"+userId + "-" + ts + ".csv";
  };

  const startLogger = () => {
    if (recordingStatus === "new") {
      loggingStartedTimeStamp = new Date().toISOString();
      // setFilename(getFileName(loggingStartedTimeStamp));
    //   fs.writeFileSync(filename, "TimeStamp,SensorValue");
    }
    setGlobalState("recordingStatus", "recording");

    let id = setInterval(() => {
      let ts = new Date().toISOString();
    //   fs.appendFileSync(filename, "\r\n" + ts + ",SensorValue");
      console.log("ts", ts);
    }, 2000);
    // setTimerId(id);
  };
  const pauseLogger = () => {
    // clearInterval(timerId);
    setGlobalState("recordingStatus", "paused");
  };
  const stopLogger = () => {
    setGlobalState("recordingStatus", "new");
    loggingEndedTimeStamp = new Date().toISOString();
    // clearInterval(timerId);
    // setSeconds(0);
    // setFinishDialogVisible(true);
  };

  const handleUpload = () =>{
    // console.log(filename+ ' Uploaded');
    // setFinishDialogVisible(false);
  }

  return (
    <div className="home">
      <div className="homeContainer">
        {/* <FinishDialog open={finishDialogVisible} handleCloseDialog={handleUpload}/> */}
        <h1>GSR Reasearch Project</h1>
        <h3>-By Bitopan Kalita</h3>

        {page === 1 && (
          <div className="page">
            <div className="statusDots">
              <div className={`dot ${gsrSensorStatus}`} />
              <div className="text">Galvanic Sensor</div>
            </div>
            <div className="statusDots">
              <div className={`dot ${ecgSensorStatus}`} />
              <div className="text">ECG Sensor</div>
            </div>
            <div className="buttonsContainer">
              <button className="primary">TEST SENSORS</button>
              <button>TRIGGER SENSORS</button>
            </div>
            <div className="bottomActionPanel">
              <button
                className="primary"
                onClick={(e) => {
                  setPage(2);
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className="page">
            <div className="statusDots">
              <div className={`dot ${gsrSensorStatus}`} />
              <div className="text">Galvanic Sensor</div>
            </div>
            <div className="statusDots">
              <div className={`dot ${ecgSensorStatus}`} />
              <div className="text">ECG Sensor</div>
            </div>
            <div className="buttonsContainer">
              <button
                // onClick={startLogger}
                className="primary"
                disabled={recordingStatus === "recording"}
              >
                {recordingStatus === "new" || recordingStatus === "recording"
                  ? "START"
                  : "RESUME"}{" "}
                RECORDING
              </button>
              <button
                // onClick={pauseLogger}
                disabled={!(recordingStatus === "recording")}
              >
                PAUSE
              </button>
              <button
                // onClick={stopLogger}
                disabled={recordingStatus === "new"}
                className="finish"
              >
                FINISH
              </button>
            </div>
            <div className="bottomActionPanel">
              <button
                className="primary"
                onClick={(e) => {
                  setPage(2);
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
