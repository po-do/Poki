import React, { useEffect, useState } from "react";
import { getBoardStatus } from "../../api/board.js";
import GrapeImage_0 from "../../icons/Grapes/podo_0.png";
import GrapeImage_1 from "../../icons/Grapes/podo_1.png";
import GrapeImage_2 from "../../icons/Grapes/podo_2.png";
import GrapeImage_3 from "../../icons/Grapes/podo_3.png";
import GrapeImage_4 from "../../icons/Grapes/podo_4.png";
import GrapeImage_5 from "../../icons/Grapes/podo_5.png";
import GrapeImage_6 from "../../icons/Grapes/podo_6.png";
import GrapeImage_7 from "../../icons/Grapes/podo_7.png";
import GrapeImage_8 from "../../icons/Grapes/podo_8.png";
import GrapeImage_9 from "../../icons/Grapes/podo_9.png";
import GrapeImage_10 from "../../icons/Grapes/podo_10.png";
import GrapeImage_11 from "../../icons/Grapes/podo_11.png";
import GrapeImage_12 from "../../icons/Grapes/podo_12.png";
import GrapeImage_13 from "../../icons/Grapes/podo_13.png";
import GrapeImage_14 from "../../icons/Grapes/podo_14.png";
import GrapeImage_15 from "../../icons/Grapes/podo_15.png";
import GrapeImage_16 from "../../icons/Grapes/podo_16.png";
import GrapeImage_17 from "../../icons/Grapes/podo_17.png";
import GrapeImage_18 from "../../icons/Grapes/podo_18.png";
import GrapeImage_19 from "../../icons/Grapes/podo_19.png";
import GrapeImage_20 from "../../icons/Grapes/podo_20.png";
import GrapeImage_21 from "../../icons/Grapes/podo_21.png";
import GrapeImage_22 from "../../icons/Grapes/podo_22.png";
import GrapeImage_23 from "../../icons/Grapes/podo_23.png";
import GrapeImage_24 from "../../icons/Grapes/podo_24.png";
import GrapeImage_25 from "../../icons/Grapes/podo_25.png";
import GrapeImage_26 from "../../icons/Grapes/podo_26.png";
import GrapeImage_27 from "../../icons/Grapes/podo_27.png";
import GrapeImage_28 from "../../icons/Grapes/podo_28.png";
import GrapeImage_29 from "../../icons/Grapes/podo_29.png";
import GrapeImage_30 from "../../icons/Grapes/podo_30.png";
import GrapeImage_31 from "../../icons/Grapes/podo_31.png";

export default function Grapes({ GrapesCount, message }) {
  const [showOverlay, setShowOverlay] = useState(null);
  const [isUrl, setIsUrl] = useState("");

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  const getState = async () => {
    const grapeStatus = await getBoardStatus();
    if (!grapeStatus.data.grape.blank) {
      setShowOverlay(true);
    }
  };

  useEffect(() => {
    showGrape(GrapesCount);
    getState();
  }, [GrapesCount]);

  const showGrape = (count) => {
    switch (count) {
      case 1:
        setIsUrl(GrapeImage_1);
        break;
      case 2:
        setIsUrl(GrapeImage_2);
        break;
      case 3:
        setIsUrl(GrapeImage_3);
        break;
      case 4:
        setIsUrl(GrapeImage_4);
        break;
      case 5:
        setIsUrl(GrapeImage_5);
        break;
      case 6:
        setIsUrl(GrapeImage_6);
        break;
      case 7:
        setIsUrl(GrapeImage_7);
        break;
      case 8:
        setIsUrl(GrapeImage_8);
        break;
      case 9:
        setIsUrl(GrapeImage_9);
        break;
      case 10:
        setIsUrl(GrapeImage_10);
        break;
      case 11:
        setIsUrl(GrapeImage_11);
        break;
      case 12:
        setIsUrl(GrapeImage_12);
        break;
      case 13:
        setIsUrl(GrapeImage_13);
        break;
      case 14:
        setIsUrl(GrapeImage_14);
        break;
      case 15:
        setIsUrl(GrapeImage_15);
        break;
      case 16:
        setIsUrl(GrapeImage_16);
        break;
      case 17:
        setIsUrl(GrapeImage_17);
        break;
      case 18:
        setIsUrl(GrapeImage_18);
        break;
      case 19:
        setIsUrl(GrapeImage_19);
        break;
      case 20:
        setIsUrl(GrapeImage_20);
        break;
      case 21:
        setIsUrl(GrapeImage_21);
        break;
      case 22:
        setIsUrl(GrapeImage_22);
        break;
      case 23:
        setIsUrl(GrapeImage_23);
        break;
      case 24:
        setIsUrl(GrapeImage_24);
        break;
      case 25:
        setIsUrl(GrapeImage_25);
        break;
      case 26:
        setIsUrl(GrapeImage_26);
        break;
      case 27:
        setIsUrl(GrapeImage_27);
        break;
      case 28:
        setIsUrl(GrapeImage_28);
        break;
      case 29:
        setIsUrl(GrapeImage_29);
        break;
      case 30:
        setIsUrl(GrapeImage_30);
        break;
      case 31:
        setIsUrl(GrapeImage_31);
        break;
      default:
        setIsUrl(GrapeImage_0);
        break;
    }
  };

  return (
    <div className="relative">
      {/* overlay 창 구현 */}
      {showOverlay && (
        <div
          className="flex-col rounded-2xl absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10"
          onClick={handleOverlayClick}
        >
          {message.map((item) => (
            <React.Fragment key={item}>
              <p className="text-white text-2xl font-semibold mx-8">{item}</p>
              <br />
            </React.Fragment>
          ))}
        </div>
      )}

      {/* <div className={styles.uvas}>
          줄기
          <div className={styles.tallo}></div>
          잎파리
          <div className={styles.hojas}></div>
          1번째 부터 31번째 포도
          {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
            <span
              className={`${styles[`u${n}`]} ${
                n <= GrapesCount ? styles.grape : ""
              }`}
              key={n}
            ></span>
          ))}
        </div> */}

      <div className="mb-4 flex-shrink-0 sm:mb-0">
        <img
          src={isUrl}
          alt={isUrl}
          className="object-cover object-center sm:h-full sm:w-full rounded-2xl"
        />
      </div>

      {/* 보물 상자 */}
      {/* <div class="treasure" onclick="alert('Hoooray you found the treasure')"></div> */}

      {/* 말풍선 */}
      {/* <div class="talk-bubble tri-right border round btm-right-in">
  <div class="talktext">
    <p>Now flipped the other way and square. Uses .border and .btm-right-in</p>
  </div>
</div> */}
    </div>
  );
}
