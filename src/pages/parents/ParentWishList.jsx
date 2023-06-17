import React, { useState} from "react";
import PodoRegisterModal from "../../components/Modal/PodoRegisterModal";
import ParentProductCard from "../../components/UI/ParentProductCard";
import { getWishlistByUserId } from '../../api/wishlist.ts';

const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
]

export default function ChildWishList() {
  const [showModal, setShowModal] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [isSelected, setIsSelected] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const getRegistGift = async () => {
    try {
      const wishlistData = await getWishlistByUserId();
      setWishList(wishlistData.data.item);
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  return (
    <div className="bg-white lg:pb-12">
      <div className="px-12 py-7 ">
        <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          아이의 위시리스트 목록
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {wishList.map((item) => (
            <ParentProductCard key={item.id} item={item} setIsSelected = {setIsSelected}/>
          ))}
        </div>
        
        {/* 보상 등록 버튼 */}
        <div>
        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={openModal}
                >
                  포도알 등록
                </button>
                {showModal && <PodoRegisterModal onClose={closeModal} isSelected={isSelected}/>}
              </div>
      </div>
      </div>
    </div>
  )
}
