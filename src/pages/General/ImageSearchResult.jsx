import React from "react";
import axios from "axios"; 
import { useState, useEffect } from "react"; 

export default function ImageSearchResult() {
    const [data, setData] = useState([]);
    const ID_KEY = process.env.REACT_APP_ClientID;
    const SECRET_KEY = process.env.REACT_APP_ClientSecret;
    
    // const ID_KEY = 'FUtOtoai31sBEM31IpOP';
    // const SECRET_KEY = 'dnXvSQnxlS';
    const shoppingData = async () => {
    const URL = "v1/search/shop.json"; 
    await axios
      .get(URL, {
        params: {
          query: "모자",
          display: 20,
        },
        headers: {
          'X-Naver-Client-Id': ID_KEY,
          'X-Naver-Client-Secret': SECRET_KEY,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) =>console.log("성공",response))
      .catch((e) => {console.log("실패")});
  };
  
    useEffect(() => {
        shoppingData();
    }, []);
  
    return (
        <div>
        </div>
    );
}

