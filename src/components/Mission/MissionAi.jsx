import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import MissionRecommendModal from "../Modal/MissionRecommendModal";
import { missionRecommend } from "../../api/mission.js";

const ageOptions = [
  { name: "7~9 세", inStock: true },
  { name: "10~12 세", inStock: true },
  { name: "13~14 세", inStock: true },
];

const placeOptions = [
  { name: "집", inStock: true },
  { name: "학교", inStock: true },
  { name: "놀이터", inStock: true },
];

const pointOptions = [
  { name: "창의력", inStock: true },
  { name: "사고력", inStock: true },
  { name: "자신감", inStock: true },
];

function AgeFilter(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PlaceFilter(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PointFilter(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MissionAi() {
  const [ageMem, setAgeMem] = useState([]);
  const [placeMem, setplaceMem] = useState([]);
  const [pointMem, setpointMem] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [result, setResult] = useState([]);
  const [spiningFlag, setSpiningFlag] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleModal = async () => {
    setSpiningFlag(true);
    console.time("그냥");
    // api 호출
    try {
      const params = {
        request: {
          age: ageMem.name,
          place: placeMem.name,
          ability: pointMem.name,
        },
      };

      const data = await missionRecommend(params);
      setResult(data);
      // console.log("성공 : ", data);
      // console.timeEnd("그냥");
    } catch (error) {
      console.log("AI Load 실패 : ", error);
    }
    openModal();
  };

  return (
    <div>
      <div>
        <h3 className="text-2xl font-semibold mb-4">AI에게 미션 추천 받기</h3>
        <p className="ml-4 mt-2 text-lg text-gray-700">
          3개의 키워드를 골라 AI에게 미션을 추천 받아 보세요.
        </p>
      </div>

      {/* 나이 태그 */}
      <RadioGroup value={ageMem} onChange={setAgeMem} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose age option
        </RadioGroup.Label>

        <div className="gap-3 m-5">
          <h3 className="text-xl font-semibold mb-4">나이</h3>
          <div className="flex">
            {ageOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  AgeFilter(
                    option.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    active ? "ring-2 ring-gray-500 ring-offset-2" : "",
                    checked
                      ? "bg-gray-400 text-white hover:bg-gray-500"
                      : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                    "flex items-center justify-center rounded-3xl py-3 px-3 text-sm font-semibold uppercase w-36 mx-2"
                  )
                }
                disabled={!option.inStock}
              >
                <RadioGroup.Label as="span" className="text-base">
                  {option.name}
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </div>
      </RadioGroup>

      {/* 장소 태그 */}
      <RadioGroup value={placeMem} onChange={setplaceMem} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose place option
        </RadioGroup.Label>

        <div className="gap-3 m-5">
          <h3 className="text-xl font-semibold mb-4">장소</h3>
          <div className="flex">
            {placeOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  PlaceFilter(
                    option.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    active ? "ring-2 ring-gray-500 ring-offset-2" : "",
                    checked
                      ? "bg-gray-400 text-white hover:bg-gray-500"
                      : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                    "flex items-center justify-center rounded-3xl py-3 px-3 text-sm font-semibold uppercase w-36 mx-2"
                  )
                }
                disabled={!option.inStock}
              >
                <RadioGroup.Label as="span" className="text-base">
                  {option.name}
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </div>
      </RadioGroup>

      {/* 키워드 태그 */}
      <RadioGroup value={pointMem} onChange={setpointMem} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose point option
        </RadioGroup.Label>

        <div className="gap-3 m-5">
          <h3 className="text-xl font-semibold mb-4">키워드</h3>
          <div className="flex">
            {pointOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  PointFilter(
                    option.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    active ? "ring-2 ring-gray-500 ring-offset-2" : "",
                    checked
                      ? "bg-gray-400 text-white hover:bg-gray-500"
                      : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                    "flex items-center justify-center rounded-3xl py-3 px-3 text-sm font-semibold uppercase w-36 mx-2"
                  )
                }
                disabled={!option.inStock}
              >
                <RadioGroup.Label as="span" className="text-base">
                  {option.name}
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </div>
      </RadioGroup>

      {/* 추천 받기 버튼 */}
      <div className="flex justify-end">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-lg text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleModal}
        >
          <div className="flex">
            {spiningFlag && (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-50"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                />
                <path
                  className="opacity-105"
                  fill="white"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z"
                />
              </svg>
            )}
            <span>추천 받기</span>
          </div>
        </button>
        {isModal && (
          <MissionRecommendModal onClose={closeModal} result={result.result} />
        )}
      </div>
    </div>
  );
}
