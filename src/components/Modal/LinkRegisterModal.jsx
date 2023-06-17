import React, { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function LinkRegisterModal({ onClose }) {
  const [productName, setProductName] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(true)
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
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
            placeholder="상품을 입력하세요."
            value={url}
            onChange={handleUrlChange}
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClose}
            > 등록
            </button>
            </div>
        </div>
              {/* 네이버 api로 찾은 상품 목록 출력 */}
              <div className="flex p-4 border rounded mt-2">
        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
          <div className="mr-4 flex-shrink-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2431/2431996.png"
              alt="Poki"
              className="h-16 w-16 border border-gray-300 bg-white text-gray-300"   
            />
          </div>
          <div>
            <h4 className="text-lg font-bold">Lorem ipsum</h4>
            <p className="mt-1">
              Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus
              quidem ipsam quia iusto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}