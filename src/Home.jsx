import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.scss";
import { setGlobalState, useGlobalState } from "./state";
import { getReading } from "./loggerService";
import { apiBaseUrl, apiKey, appScriptUrl, clientId, folderId } from "./urls";

const Home = () => {
  const [page] = useGlobalState("page");
  const [gsrSensorStatus] = useGlobalState("gsrSensorStatus");
  const [ecgSensorStatus] = useGlobalState("ecgSensorStatus");
  const [recordingStatus] = useGlobalState("recordingStatus");
  const [subjectName, setSubjectName] = useState(
    localStorage.getItem("subjectName") ?? ""
  );
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
        let sensorVal = getReading(seconds);
        let timeStamp = new Date().toISOString();
        axios
          .post(apiBaseUrl + "/addRow", {
            sensorVal,
            timeStamp,
            fileName: filename,
          })
          .then((snap) => {
            console.log("api response", snap.data);
          });
        console.log("filename: sensorReading", filename, sensorVal);
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
      setFileName(subjectName+'_'+getFileName(loggingStartedTimeStamp));
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
    console.log("Form Handle Upload called.");
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <h1>GSR Reasearch Project</h1>

        <div className="nameForm">
          <h3>Subject name - </h3>
          {page === 1 && (
            <div>
              <input
                type="text"
                onChange={(e) => {
                  localStorage.setItem('subjectName', e.target.value)
                  setSubjectName(e.target.value);
                }}
                value={subjectName}
                placeholder="Full Name"
              />
            </div>
          )}
          {page !== 1 && <h3 className="margined">{subjectName}</h3>}
        </div>

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
              <button className="button primary">TEST SENSORS</button>
              <button className="button">TRIGGER SENSORS</button>
            </div>
            <div className="bottomActionPanel">
              <button className="button primary"
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
              <button className="button primary"
                onClick={() => startLogger()}
                disabled={recordingStatus === "recording"}
              >
                {recordingStatus === "new" || recordingStatus === "recording"
                  ? "START"
                  : "RESUME"}{" "}
                RECORDING
              </button>
              <button className="button"
                onClick={() => pauseLogger()}
                disabled={!(recordingStatus === "recording")}
              >
                PAUSE
              </button>
              <button className="button finish"
                onClick={() => stopLogger()}
                disabled={recordingStatus === "new"}
              >
                FINISH
              </button>
            </div>
            <div className="bottomActionPanel">
            <a className="button" style={{display: "table-cell"}} href={`${appScriptUrl}?name=${subjectName}`}>UPLOAD</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
