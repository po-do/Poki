// // imageRouter.js
// import { Router } from "express";
// import axios from "axios";
// import config from "../config.js";

// export const imageRouter = Router();

// function imageSearch(req, res, next) {
//   const api_url =
//     "https://openapi.naver.com/v1/search/shop.json?query=" +
//     encodeURI(req.query.query);
//   axios
//     .get(api_url, {
//       headers: {
//         "X-Naver-Client-Id": config.naverShop.clientID,
//         "X-Naver-Client-Secret": config.naverShop.clientSecret
//       },
//     })
//     .then((data) => {
//       res.send(data.data.items);
//     })
//     .catch((err) => next(err));
// }

// const result = imageRouter.get("/", imageSearch);

// console.log(result);