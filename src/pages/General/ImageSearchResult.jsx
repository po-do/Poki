import { useEffect } from "react";
import axios from "axios";

export default function ImageSearchResult({ query,handleSetResult }) {
  const ID_KEY = process.env.REACT_APP_ClientID;
  const SECRET_KEY = process.env.REACT_APP_ClientSecret;

  const shoppingData = async () => {
    const URL = "/v1/search/shop.json";
    await axios
      .get(URL, {
        params: {
          query: query,
          display: 10,
        },
        headers: {
          "X-Naver-Client-Id": ID_KEY,
          "X-Naver-Client-Secret": SECRET_KEY,
        },
      })
      .then((response) => {
        handleSetResult(response.data.items);
        console.log("성공");
    })
      .catch((e) => {
        console.log("실패");
      });
 
  };

  useEffect(() => {
    shoppingData();
  }, []);

}
