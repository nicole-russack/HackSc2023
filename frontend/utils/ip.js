import Constants from "expo-constants";
const { manifest } = Constants;

const getIP = () => {
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:8080`)
    : `api.example.com`;
    return api
}

export {
    getIP,
}