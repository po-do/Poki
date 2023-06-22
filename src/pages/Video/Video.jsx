import React, { useEffect, useRef, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import { socket } from "../../App";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import { getConnectedUserId } from "../../api/auth";

// const socket = io.connect("http://localhost:4000/video-chat");
// const socket = io.connect("https://api.pokids.site:8000/video-chat");

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

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  /* 소켓 함수들은 useEffect로 한 번만 정의한다. */
  useEffect(() => {
    /* device중 video를 가져 와서 나의 얼굴을 띄우고 setStream */
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     setStream(stream);
    //     if (myVideo.current) myVideo.current.srcObject = stream;
    //   });
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      } catch (error) {
        console.log("Failed to get media stream:", error);
      }
    };
    getMediaStream();

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

  const callConnectedUser = async () => {
    try {
      const connectedUser = await getConnectedUserId();
      if (connectedUser) {
        const { connected_user, is_connected } = connectedUser.data;
        callUser(connected_user);
      } else {
        console.log("There is no connected_user to call");
      }
    } catch (error) {
      console.log("Failed to get connected status:", error);
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
      <h1 className="text-center text-purple-600 text-3xl">화상</h1>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="w-3/4 md:w-full"
              />
            )}
          </div>
          <div className="flex-grow">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="w-3/4 md:w-full"
              />
            ) : null}
          </div>
        </div>
        <div className="flex my-4">
          <button
            variant="contained"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleMuteClick}
          >
            {muted ? "음소거 해제" : "음소거"}
          </button>
          <button
            variant="contained"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleCameraClick}
          >
            {cameraOff ? "카메라 켜기" : "카메라 끄기"}
          </button>
        </div>
        <div className="myId">
          <div className="call-button mt-5">
            {callAccepted && !callEnded ? (
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                End Call
              </button>
            ) : (
              <button
                color="primary"
                onClick={() => callConnectedUser()}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mt-5"
              >
                자녀/부모에게 통화하기
              </button>
            )}
            {idToCall}
            {errorMessage}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1 className="text-lg">{name} 가 전화를 걸었어요</h1>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
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
