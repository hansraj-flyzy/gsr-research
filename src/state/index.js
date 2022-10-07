import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    page: 1,
    gsrSensorStatus: 'red',
    ecgSensorStatus: 'red',
    recordingStatus: 'new', // recording, paused 
    
});

export { setGlobalState, useGlobalState };