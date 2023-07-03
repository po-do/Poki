import React, { Fragment, useState } from "react";
import ImageSearchResult from "../../pages/General/ImageSearchResult";
import { createWishList } from "../../api/wishlist.js";
import FailModal from "../Modal/FailModal";
import { Dialog, Transition } from "@headlessui/react";

export default function LinkRegisterModal({ onClose }) {
  const [bookSearchKeyword, setbookSearchKeyword] = useState("");
  const [isState, setIsState] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [failModal, setFailModal] = useState(false);
  const [open] = useState(true);

  const handleSetResult = (item) => {
    setSearchResult(
      item.map((data) => ({
        ...data,
        title: data.title.replace(/<\/?b>/g, ""),
      }))
    );
  };

  const handleBookSearch = (e) => {
    setbookSearchKeyword(e.target.value);
  };

  const handleOpen = () => {
    setIsState(true);
  };

  const handleClose = () => {
    setIsState(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
  };

  // 에러 처리 필요
  const choiceWishList = async () => {
    try {
      if (selectedItem) {
        const params = {
          request: {
            ProductName: selectedItem.title,
            ProductLink: selectedItem.link,
            ProductImage: selectedItem.image,
          },
        };
        await createWishList(params);
        setSelectedItem(null);
        onClose();
      } else {
        openFailModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center lg:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:item-center sm:p-6">
                {/* 선물 검색 및 닫기 버튼 */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">선물 검색하기</h2>

                  <div className="flex gap-3">
                    <input
                      id="mission-register-two"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="선물을 검색하세요."
                      value={bookSearchKeyword}
                      onChange={handleBookSearch}
                    />

                    <button
                      className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleOpen}
                    >
                      검색
                    </button>

                    <button
                      className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={onClose}
                    >
                      닫기
                    </button>
                    {/* 선물 검색 API */}
                    {isState && (
                      <ImageSearchResult
                        onClose={handleClose}
                        query={bookSearchKeyword}
                        handleSetResult={handleSetResult}
                      />
                    )}
                  </div>
                </div>

                {/* 선물 검색 */}
                <div className="overflow-y-auto max-h-96">
                  {/* 네이버 api로 찾은 상품 목록 출력 */}
                  {searchResult.map((item, index) => (
                    <div
                      key={item.productId}
                      className={`flex p-4 border rounded mt-2 ${
                        selectedItem === item ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="mr-4 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`h-16 w-16 border ${
                            selectedItem === index
                              ? "border-gray-500"
                              : "border-gray-300"
                          } bg-white text-gray-300`}
                        />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold ${
                            selectedItem === index ? "text-gray-500" : ""
                          }`}
                        >
                          {item.title}
                        </h4>
                        {/* <p className={`mt-1 ${selectedItem === index ? "text-gray-500" : ""}`}>{item.title}</p> */}
                      </div>
                    </div>
                  ))}
                </div>

                {/*  */}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="flex-none rounded-md bg-indigo-500 mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={choiceWishList}
                  >
                    결정
                  </button>
                  {failModal && (
                    <FailModal
                      closeModal={closeFailModal}
                      message={"선물을 선택해 주세요"}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
