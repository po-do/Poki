import { Menu, Transition } from "@headlessui/react";
import { HiChevronLeft, HiChevronRight, HiDotsVertical } from "react-icons/hi";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isAfter,
} from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { missionReadChild, missionDelete } from "../../api/mission.js";
import { getWishlistByUserId } from "../../api/wishlist.js";
import { BsGift } from "react-icons/bs";
import FailModal from "../../components/Modal/FailModal";
import MissionReserveModal from "../../components/Modal/MissionReserveModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ParentCalendar() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [completedMissions, setCompletedMissions] = useState([]);
  const [reservedMissions, setReservedMissions] = useState([]);
  // ===================================================================
  const [givenList, setGivenList] = useState([]);

  // given 된 위시리스트
  const givenData = async () => {
    try {
      const wishlistData = await getWishlistByUserId();

      // 상품이 없는 경우 에러 처리
      if (wishlistData.data.item[0]) {
        const givenItem = wishlistData.data.item.filter(
          (wishItem) => wishItem.Given === "TRUE"
        );

        setGivenList(givenItem);
      }
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };
  // ===================================================================

  // use-query로 변경해야 함
  useEffect(() => {
    getMission();
    givenData();
  }, []);

  const getMission = async () => {
    const missionsData = await missionReadChild();

    const compMissions = missionsData.filter((data) => {
      return parseISO(data.completed_date) <= today;
    });

    const resMissions = missionsData.filter((data) => {
      return parseISO(data.created_date) > today;
    });

    setCompletedMissions(compMissions);
    setReservedMissions(resMissions);
  };

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedCompDayMeetings = completedMissions.filter((mission) =>
    isSameDay(parseISO(mission.completed_date), selectedDay)
  );
  // console.log("selectedCompDayMeetings", selectedCompDayMeetings);

  let selectedResDayMeetings = reservedMissions.filter((mission) =>
    isSameDay(parseISO(mission.created_date), selectedDay)
  );
  // console.log("selectedResDayMeetings", selectedResDayMeetings);

  let selectedGiftDayMeetings = givenList.filter((gift) =>
    isSameDay(parseISO(gift.GivenAt), selectedDay)
  );

  return (
    <div className="pt-16 text-2xl">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        {/* Calendar */}
        <div className="border shadow-2xl rounded-2xl">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-gray-900 ml-12 mt-10">
              {format(firstDayCurrentMonth, "MMMM")}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 mt-2"
            >
              <span className="sr-only">Previous month</span>
              <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 mr-6 mt-2"
            >
              <span className="sr-only">Next month</span>
              <HiChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-10 text-lg leading-6 text-center text-gray-500">
            <div>일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div>토</div>
          </div>
          <div className="grid grid-cols-7 mt-2 text-base">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-4"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    !isEqual(day, selectedDay) && "hover:bg-gray-200",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>

                <div className="relative w-1 h-1 mx-auto mt-1 mb-4">
                  {/* 받은 선물 표시 */}
                  {givenList.some((gift) =>
                    isSameDay(parseISO(gift.GivenAt), day)
                  ) && (
                    <div className="absolute left-8 mb-2 mt-1">
                      <BsGift />
                    </div>
                  )}
                  {/* 완료된 미션 */}
                  {completedMissions.some((mission) =>
                    isSameDay(parseISO(mission.completed_date), day)
                  ) && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs text-center py-1">포도</div>
                  )}
                  {/* 예약된 미션 */}
                  {reservedMissions.some(
                    (mission) =>
                      isAfter(parseISO(mission.created_date), new Date()) &&
                      isSameDay(parseISO(mission.created_date), day)
                  ) && <div className="w-6 h-6 rounded-full bg-gray-500 text-white text-xs text-center py-1">예약</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* section */}
        <section className="mt-12 md:mt-4 border-t border-gray">
          <h2 className="font-semibold text-gray-900 mt-4 mb-2">완료된 미션</h2>
          <ol className="space-y-1 text-lg leading-6 text-gray-500">
            {selectedCompDayMeetings.length > 0 ? (
              selectedCompDayMeetings.map((mission) => (
                <Meeting
                  key={mission.id}
                  Mission={mission}
                  given_flag={false}
                />
              ))
            ) : (
              <p className="flex items-center px-1 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
                미션이 없습니다.
              </p>
            )}
          </ol>

          <section className="border-t border-gray">
            <h2 className="font-semibold text-gray-900 mt-4 mb-2">예약 미션</h2>
            <ol className="space-y-1 text-lg leading-6 text-gray-500">
              {selectedResDayMeetings.length > 0 ? (
                selectedResDayMeetings.map((mission) => (
                  <Meeting
                    key={mission.id}
                    Mission={mission}
                    flag={true}
                    given_flag={false}
                  />
                ))
              ) : (
                <p className="flex items-center px-1 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
                  예약된 미션이 없습니다.
                </p>
              )}
            </ol>
          </section>
          {/* 받은 선물 부분 */}
          <section className="border-t border-gray">
            <h2 className="font-semibold text-gray-900 mt-4 mb-2">받은 선물</h2>
            <ol className="space-y-1 text-sm leading-6 text-gray-500">
              {selectedGiftDayMeetings.length > 0 ? (
                selectedGiftDayMeetings.map((gift) => (
                  <Meeting key={gift.id} Mission={gift} given_flag={true} />
                ))
              ) : (
                <p className="text-lg flex items-center px-1 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
                  받은 선물이 없습니다.
                </p>
              )}
            </ol>
          </section>
        </section>
      </div>
    </div>
  );
}

function Meeting({ Mission, flag, given_flag }) {
  const [failModal, setFailModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // 미션 수정
  const openUpdateModal = () => {
    setUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  // 미션 삭제
  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
    window.location.reload();
  };

  // 미션수정 ===================
  const handleChange = async () => {
    openUpdateModal();
  };

  // 미션삭제 ===================
  const handleDelete = async () => {
    const params = {
      mission_id: Mission.id,
    };

    await missionDelete(params);

    openFailModal();
  };

  return (
    <li className="flex items-center px-2 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        {given_flag === false && (
          <>
            <p className="text-gray-900">{Mission.content}</p>
            <p className="mt-0.5">
              <time dateTime={Mission.completed_date}>
                {flag === true
                  ? `${Mission.created_date} 예약`
                  : `${Mission.completed_date} 완료`}
              </time>
            </p>
          </>
        )}

        {/* 받은선물 */}
        {given_flag && (
          <>
            <p className="text-gray-900"></p>
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-36 w-36 rounded-xl"
                  src={Mission.ProductImage}
                  alt=""
                />
              </div>
              <div className="ml-6">
                <p className="text-lg text-gray-700 group-hover:text-gray-900">
                  {Mission.ProductName}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* 예약 수정 삭제 버튼  */}
      {flag ? (
        <Menu
          as="div"
          className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
        >
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <HiDotsVertical className="w-6 h-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900 w-full"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm w-full"
                      )}
                      onClick={handleChange}
                    >
                      수정
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900 w-full"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm w-full"
                      )}
                      onClick={handleDelete}
                    >
                      삭제
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        ""
      )}

      {failModal && (
        <FailModal closeModal={closeFailModal} message="삭제되었습니다." />
      )}

      {updateModal && (
        <MissionReserveModal
          closeModal={closeUpdateModal}
          Mission={Mission}
          flag={true}
        />
      )}
    </li>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
