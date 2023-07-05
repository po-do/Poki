import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Peer from "simple-peer";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import { getConnectedUserId } from "../../api/auth";
import {
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
  PhoneArrowDownLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

// const socket = io.connect("http://localhost:4000/video-chat");
// const socket = io.connect("https://api.pokids.site:8000/video-chat");
const socket = io.connect(process.env.REACT_APP_VIDEO_SOCKET_URL);

export default function Video() {
  const user = useRecoilValue(userState); // Recoil에서 사용자 정보 받아오기

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [cameraOff, setCameraOff] = useState(false);
  const [muted, setMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef([]);
  const connectionRef = useRef();

  const getPrevPermission = async () => {
    const permissionName = "camera"; // Adjust the permission name as needed
    // const result = await navigator.permissions?.query({ name: permissionName })
    // if (result?.state === 'granted') {
    //  console.log('prevpermission called getmediastream')
    // }
    getMediaStream();
  };
  const getMediaStream = () => {
    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        // console.log(myVideo.current);
        // console.log(stream, "stream");
        if (myVideo.current) myVideo.current.srcObject = stream;
      })
      .catch((err) => {
        // getMediaStream();
        console.log(err);
      });
  };

  /* 소켓 함수들은 useEffect로 한 번만 정의한다. */
  useEffect(() => {
    getMediaStream();
    // console.log("this is useEffect func.");

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.emit("setUserName", {
      user_id: user.user_id,
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on("noUserToCall", (data) => {
      setErrorMessage(`${data} 에게 통화를 걸 수 없습니다`);
    });

    socket.on("callEnded", () => {
      setCallEnded(true);
      connectionRef.current?.destroy();
      // force a page reload
      window.location.reload();
    });
  }, []);

  const callUser = (id) => {
    // console.log("calluser", "this is front");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("track", (track, stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      // console.log("callaccepted");
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const callConnectedUser = async () => {
    try {
      setIsCalling(true);
      const connectedUser = await getConnectedUserId();
      // console.log("connectedUser", connectedUser);
      if (connectedUser) {
        const { connected_user, is_connected } = connectedUser.data;
        callUser(connected_user);
      } else {
        console.log("There is no connected_user to call");
      }
    } catch (error) {
      console.log("Failed to get connected status:", error);
      setIsCalling(false); // In case of error, allow the button to be clicked again
    }
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller, name: name });
    });
    peer.on("track", (track, stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    setIsCalling(false);
    socket.disconnect();
    socket.emit("callEnd");
    connectionRef.current.destroy();
    // force a page reload
    window.location.reload();
  };

  const handleMuteClick = () => {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setMuted(!muted);
  };

  const handleCameraClick = () => {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setCameraOff(!cameraOff);
  };

  return (
    <>
      <div className="flex justify-between ">
        <h1 className="md:px-12 md:py-7 mt-2 ml-2 md:text-3xl px-6 py-3 text-2xl font-semibold tracking-tight text-black sm:text-4xl">
          영상통화
        </h1>
        <div className="flex justify-center items-center mt-2 mr-2">
          <button
            variant="contained"
            className="h-14 w-14 text-white bg-indigo-600 hover:bg-indigo-800 rounded-full p-2 mr-2"
            onClick={handleMuteClick}
          >
            {/* 음소거, 해제 */}
            {muted ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
          </button>
          <button
            variant="contained"
            className="h-14 w-14 text-white bg-indigo-600 hover:bg-indigo-800 rounded-full p-2"
            onClick={handleCameraClick}
          >
            {/* 카메라 켜기, 끄기 */}
            {cameraOff ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white h-14 w-14 rounded-full p-2 ml-2"
                onClick={leaveCall}
              >
                {/* 통화끊기 */}
                <PhoneXMarkIcon />
              </button>
            ) : (
              <button
                color="primary"
                onClick={callConnectedUser}
                className={`h-14 w-14 text-white bg-indigo-600 rounded-full p-2 ml-2 ${
                  isCalling ? "opacity-50" : "hover:bg-indigo-800"
                }`}
                disabled={isCalling}
                alt="call"
              >
                {/* 통화걸기 */}
                <PhoneArrowUpRightIcon />
              </button>
            )}
            {idToCall}
            <div className="absolute whitespace-nowrap left-6">
              {errorMessage}
            </div>
          </div>
          <div>
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <button
                  className="bg-indigo-600 hover:bg-indigo-800 text-white h-14 w-14 rounded-full p-2 ml-2"
                  onClick={answerCall}
                >
                  {/* 통화받기 */}
                  <PhoneArrowDownLeftIcon />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-4 mt-2">
        <div
          className={classNames(
            callAccepted && !callEnded
              ? "relative flex flex-col-reverse md:flex-row items-center"
              : "relative flex flex-col items-center"
          )}
        >
          <div
            className={classNames({
              "md:w-6/12": true,
              "max-[720px]:w-4/5 max-[720px]:rounded-3xl max-[720px]:border-8 max-[720px]:border-white":
                callAccepted && !callEnded,
            })}
          >
            <video
              playsInline
              muted
              ref={myVideo}
              // ref={userVideo}
              autoPlay
              className="md:w-full rounded-3xl md:border-8 md:border-white"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>

          <div className="md:w-6/12">
            <video
              playsInline
              ref={userVideo}
              // ref={myVideo}
              autoPlay
              className="md:w-full rounded-3xl md:border-8 md:border-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
