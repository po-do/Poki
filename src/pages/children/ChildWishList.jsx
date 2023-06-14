import { React, useState } from "react";
import ProductCard from "../../components/UI/ProductCard";
import LinkRegisterModal from "../../components/Modal/LinkRegisterModal";

export default function ChildWishList() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div>
        <h1>Wish List</h1>
        <ProductCard />
      </div>
      <div>
        <button onClick={openModal}>링크등록</button>
        {showModal && <LinkRegisterModal onClose={closeModal} />}
      </div>
    </div>
  );
}
