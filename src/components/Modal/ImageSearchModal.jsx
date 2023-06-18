// import React, { useState } from "react";

// const ImageSearchModal = (props) => {
//   const [bookSearchKeyword, setBookSearchKeyword] = useState("");
//   const [bookSearchResult, setBookSearchResult] = useState([]);

//   const handleImageSearchInputChange = (e) => {
//     setBookSearchKeyword(e.target.value);
//   };

//   const handleImageSearchClick = async () => {
//     try {
//       if (bookSearchKeyword === "") {
//         console.log("검색어 없음");
//         return;
//       }
//       const { data } = await axios.get(`/api/image?query=${bookSearchKeyword}`);
//       setBookSearchResult([...data]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Modal title="이미지 검색하기" setModalState={props.setModalState}>
//       <ImgSearchModalWrap>
//         <ImgSearchBar>
//           <ImgSearchInput
//             name="img"
//             id="img"
//             placeholder="책 제목, 지은이, 키워드로 검색할 수 있습니다."
//             value={bookSearchKeyword}
//             onChange={handleImageSearchInputChange}
//           />
//           <MyButton btntype="basic" onClick={handleImageSearchClick}>
//             검색
//           </MyButton>
//         </ImgSearchBar>
//         {bookSearchResult.map((item, index) => (
//           <ImageSearchResult
//             key={index}
//             item={item}
//             setBookImageUrl={props.setBookImageUrl}
//             setModalState={props.setModalState}
//           />
//         ))}
//       </ImgSearchModalWrap>
//     </Modal>
//   );
// };

// export default ImageSearchModal;
