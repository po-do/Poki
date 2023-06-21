import React, { useEffect, useRef, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";

import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
// import "./App.css";

// const socket = io.connect("http://localhost:4000/video-chat");
// const socket = io.connect("https://api.pokids.site:8000/video-chat");
const socket = io.connect(process.env.REACT_APP_VIDEO_SOCKET_URL);

function Video() {
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

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  /* 소켓 함수들은 useEffect로 한 번만 정의한다. */
  useEffect(() => {
    /* device중 video를 가져 와서 나의 얼굴을 띄우고 setStream */
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) myVideo.current.srcObject = stream;
      });

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
  }, []);

  const callUser = (id) => {
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

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
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
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.disconnect();
    connectionRef.current.destroy();
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
      <h1 className="text-center text-white">화상</h1>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="video w-3/4">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="w-full"
              />
            )}
          </div>
          <div className="video w-3/4">
            {callAccepted && !callEnded ? (
              <video playsInline ref={userVideo} autoPlay className="w-full" />
            ) : null}
          </div>
          <div className="flex gap-8 mt-4">
            <button
              className={`p-2 text-white ${
                muted ? "bg-red-500" : "bg-blue-500"
              }`}
              onClick={handleMuteClick}
            >
              {muted ? "음소거 해제" : "음소거"}
            </button>
            <button
              className={`p-2 text-white ${
                cameraOff ? "bg-green-500" : "bg-blue-500"
              }`}
              onClick={handleCameraClick}
            >
              {cameraOff ? "카메라 켜기" : "카메라 끄기"}
            </button>
          </div>
        </div>
        <div className="my-8">
          <input
            className="border-2 border-gray-200 w-full p-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="p-2 w-full bg-blue-500 text-white mb-8"
            onClick={() => {
              socket.emit("setUserName", {
                user_id: name,
              });
            }}
          >
            이름 등록
          </button>

          <input
            className="border-2 border-gray-200 w-full p-2"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button mt-4">
            {callAccepted && !callEnded ? (
              <button
                className="p-2 w-full bg-red-500 text-white"
                onClick={leaveCall}
              >
                End Call
              </button>
            ) : (
              <button
                className="p-2 w-full bg-blue-500 text-white"
                onClick={() => callUser(idToCall)}
              >
                통화하기
              </button>
            )}
            <p className="text-red-500">{errorMessage}</p>
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller mt-8 text-center">
              <h1 className="text-2xl">{name} 가 전화를 걸었어요</h1>
              <button
                className="p-2 w-full bg-blue-500 text-white mt-4"
                onClick={answerCall}
              >
                Answer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Video;
