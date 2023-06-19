import React, { useState } from "react";
import ImageSearchResult from "../../pages/General/ImageSearchResult";

export default function LinkRegisterModal({ onClose }) {
  const [bookSearchKeyword, setbookSearchKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleSetResult = (item) => {
    setSearchResult(item);
  };

  const handleBookSearch = (e) => {
    setbookSearchKeyword(e.target.value);
  };

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const handleItemClick = (index) => {
    if (selectedItemIndex === index) {
      return; // Clicked item is already selected, no action needed
    }
    setSelectedItemIndex(index);
    
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">선물 검색하기</h2>

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
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClick}
            >
              검색
            </button>

            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onClose}
            >
              닫기
            </button>
            {open && (
              <ImageSearchResult query={bookSearchKeyword} handleSetResult={handleSetResult} />
            )}
          </div>
        </div>
        <div className="overflow-y-auto max-h-96">
          {/* 네이버 api로 찾은 상품 목록 출력 */}
          {searchResult.map((item, index) => (
            <div
              key={item.productId}
              className={`flex p-4 border rounded mt-2 ${
                selectedItemIndex === index ? "bg-gray-200" : ""
              }`}
              onClick={() => handleItemClick(index)}
            >
              <div className="mr-4 flex-shrink-0">
                <a href={item.link}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-16 w-16 border ${
                      selectedItemIndex === index ? "border-gray-500" : "border-gray-300"
                    } bg-white text-gray-300`}
                  />
                </a>
              </div>
              <div>
                <h4 className={`text-lg font-bold ${selectedItemIndex === index ? "text-gray-500" : ""}`}>
                  {item.title}
                </h4>
                <p className={`mt-1 ${selectedItemIndex === index ? "text-gray-500" : ""}`}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
