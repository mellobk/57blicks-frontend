import { io } from "socket.io-client";
import sharedObject from "./config/api-config";

const socket = io(sharedObject.api.ENDPOINT);

export default socket;
