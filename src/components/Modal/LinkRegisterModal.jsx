import React, { useState } from "react";
import ImageSearchResult from "../../pages/General/ImageSearchResult";
import { createWishList } from "../../api/wishlist.js";
import FailModal from "../Modal/FailModal";
export default function LinkRegisterModal({ onClose }) {
  const [bookSearchKeyword, setbookSearchKeyword] = useState("");
  const [isState, setIsState] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [failModal, setFailModal] = useState(false);

  const handleSetResult = (item) => {
    setSearchResult(item.map((data) => ({ ...data, title: data.title.replace(/<\/?b>/g, "") })));
  };

  const handleBookSearch = (e) => {
    setbookSearchKeyword(e.target.value);
  };

  const handleOpen= () => {
    setIsState(true);
  };

  const handleClose= () => {
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

  const handleKeyPress = (e) => {
     if(e.key === 'Enter') { handleOpen(); } 
    }

  // 에러 처리 필요
  const choiceWishList = async () => {
    try {
      if (selectedItem){
        const params = {
          request: {
            ProductName: selectedItem.title,
            ProductLink: selectedItem.link,
            ProductImage: selectedItem.image
          }
        };
        await createWishList(params);
        setSelectedItem(null);
        onClose();
      }
      else {
        openFailModal();
      }
      
    } catch (error){
      console.log(error);
    }

  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">선물 검색하기</h2>

          <div className="flex gap-3">
            <input
              id="mission-register-two"
              type="text"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="선물을 검색하세요."
              onKeyUp={handleKeyPress}
              value={bookSearchKeyword}
              onChange={handleBookSearch}
            />

            <button
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleOpen}
            >
              검색
            </button>


            <button
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onClose}
            >
              닫기
            </button>
            {/* 선물 검색 API */}
            {isState && (
              <ImageSearchResult onClose={handleClose} query={bookSearchKeyword} handleSetResult={handleSetResult} />
            )}
          </div>
        </div>
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
                    selectedItem === index ? "border-gray-500" : "border-gray-300"
                  } bg-white text-gray-300`}
                />
              </div>
              <div>
                <h4 className={`text-lg font-bold ${selectedItem === index ? "text-gray-500" : ""}`}>
                  {item.title}
                </h4>
                {/* <p className={`mt-1 ${selectedItem === index ? "text-gray-500" : ""}`}>{item.title}</p> */}
              </div>
            </div>
          ))}
        </div>

        
        <button
          type="submit"
          className="flex-none rounded-md bg-indigo-500 mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={choiceWishList}
        > 결정
        </button>
        {failModal && (
          <FailModal closeModal={closeFailModal} message={"선물을 선택해 주세요"} />
        )}
      </div>

    </div>
  );
}
