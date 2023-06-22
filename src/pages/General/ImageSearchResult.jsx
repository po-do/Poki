import { useEffect } from "react";
import { getShoppingList } from "../../api/wishlist.js";
export default function ImageSearchResult({ query,handleSetResult }) {

  const shoppingData = async () => {
    const param = {
      request : {
        query : query
      }
    }

    await getShoppingList(param)
    .then((response)=>{
      handleSetResult(response.items);
      console.log("Naver Open API Success");
    }).catch((error) => {
      console.log(error);
    });
    
  };

  useEffect(() => {
    shoppingData();
  }, []);
}
