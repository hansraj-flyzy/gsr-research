import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.scss";
import { generateRandomString } from "./random";
import { setGlobalState, useGlobalState } from "./state";
import { getReading } from "./loggerService";
import { apiBaseUrl } from "./urls";
const Home = () => {
  const [page] = useGlobalState("page");
  const [gsrSensorStatus] = useGlobalState("gsrSensorStatus");
  const [ecgSensorStatus] = useGlobalState("ecgSensorStatus");
  const [recordingStatus] = useGlobalState("recordingStatus");
  const [seconds, setSeconds] = useState(1);
  const [timerId, setTimerId] = useState(0);
  const [filename, setFileName] = useState("na");
  let count = 0;
  let loggingStartedTimeStamp = "";
  let loggingEndedTimeStamp = "";

  useEffect(() => {
    let interval = null;
    let isActive = recordingStatus === "recording";
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        let reading = getReading(seconds);
        let ts = new Date().toISOString()
        axios.post(apiBaseUrl+'/addRow', {reading, ts, filename}).then((snap)=>{
          console.log('api response', snap.data);
        })
        console.log("filename: sensorReading", filename, reading);
      }, 2000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recordingStatus, seconds]);

  const setPage = (page) => {
    setGlobalState("page", page);
  };
  const getFileName = (ts) => {
    return ts + ".csv";
  };

  const startLogger = () => {
    if (recordingStatus === "new") {
      loggingStartedTimeStamp = new Date().toISOString();
      setFileName(getFileName(loggingStartedTimeStamp));
    }
    setGlobalState("recordingStatus", "recording");
    console.log("filename", filename);
  };
  const pauseLogger = () => {
    clearInterval(timerId);
    setGlobalState("recordingStatus", "paused");
  };
  const stopLogger = () => {
    setGlobalState("recordingStatus", "new");
    loggingEndedTimeStamp = new Date().toISOString();
    console.log("Saving data " + filename);
    setSeconds(0);
  };

  const handleUpload = () => {
    // console.log(filename+ ' Uploaded');
    // setFinishDialogVisible(false);
  };

  return (
    <div className="home">
      <div className="homeContainer">
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
            <div className="count">{seconds}</div>
            <div className="buttonsContainer">
              <button
                onClick={() => startLogger()}
                className="primary"
                disabled={recordingStatus === "recording"}
              >
                {recordingStatus === "new" || recordingStatus === "recording"
                  ? "START"
                  : "RESUME"}{" "}
                RECORDING
              </button>
              <button
                onClick={() => pauseLogger()}
                disabled={!(recordingStatus === "recording")}
              >
                PAUSE
              </button>
              <button
                onClick={() => stopLogger()}
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
                  setPage(3);
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
