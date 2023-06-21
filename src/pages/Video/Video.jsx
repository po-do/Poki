import React, { useEffect, useRef, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";

import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import { getConnectedUser } from "../../api/auth";
// import "./App.css";

// const socket = io.connect("http://localhost:4000/video-chat");
const socket = io.connect("https://api.pokids.site:8000/video-chat");
// const socket = io.connect(process.env.REACT_APP_VIDEO_SOCKET_URL);

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
      const connectedUser = await getConnectedUser();
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
      <h1 style={{ pAlign: "center", color: "#fff" }}>화상</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "70%" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "70%" }}
              />
            ) : null}
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              variant="contained"
              color="primary"
              onClick={handleMuteClick}
            >
              {muted ? "음소거 해제" : "음소거"}
            </button>
            <button
              variant="contained"
              color="primary"
              onClick={handleCameraClick}
            >
              {cameraOff ? "카메라 켜기" : "카메라 끄기"}
            </button>
          </div>
        </div>
        <div className="myId">
          <input
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <button
            variant="contained"
            color="primary"
            style={{ marginBottom: "2rem" }}
            onClick={() => {
              // TODO: 소켓-유저 아이디 연결이 완료되면 버튼과 socket 함수를 제거해야 한다.
              socket.emit("setUserName", {
                user_id: name,
              });
            }}
          >
            이름 등록
          </button>

          <input
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </button>
            ) : (
              <div>
                <button
                  color="primary"
                  aria-label="call"
                  onClick={() => callUser(idToCall)}
                >
                  <p fontSize="large">통화하기</p>
                </button>
                <button
                  color="primary"
                  aria-label="call"
                  onClick={() => callConnectedUser()}
                >
                  <p fontSize="large">자녀/부모에게 통화하기</p>
                </button>
              </div>
            )}
            {idToCall}
            {errorMessage}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} 가 전화를 걸었어요</h1>
              <button variant="contained" color="primary" onClick={answerCall}>
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
