import React from "react";
import axios from "axios";
import { useEffect } from "react";

export default function ImageSearchResult({ query }) {
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
          // "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => console.log("성공", response))
      .catch((e) => {
        console.log("실패");
      });
  };

  useEffect(() => {
    const data = shoppingData();
    console.log("아롬너ㅏ어ㅏ롬나아뢈ㄴ", data);
  }, []);

  return <></>;
}
