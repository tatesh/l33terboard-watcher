import https from "https";

const postBody = JSON.stringify({
  encryptedUid: "2154D02AD930F6C6E65C507DD73CB3E7",
  tradeType: "PERPETUAL",
});

const users = {
  TreeOfAlpha1: { encryptedUid: "FB23E1A8B7E2944FAAEC6219BBDF8243", positions: [null] },
  TreeOfAlpha2: { encryptedUid: "DF74DFB6CB244F8033F1D66D5AA0B171", positions: [null] },
  blankbrain: { encryptedUid: "10CD59AFCF8A261D738E3803586FE3FF", positions: [null] },
  test: { encryptedUid: "2154D02AD930F6C6E65C507DD73CB3E7", positions: [null] },
};

const options = {
  host: "www.binance.com",
  path: "/bapi/futures/v1/public/future/leaderboard/getOtherPosition",
  headers: {
    accept: "*/*",
    "content-type": "application/json",
    "Content-Length": postBody.length,
  },
  body: postBody,
  method: "POST",
};

setInterval(() => {
  const req = https.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  req.write(postBody);

  req.end();
}, 1000);

// type position = {
//   symbol: String,
//   entryPrice: Number,
//   markPrice: Number,
//   pnl: Number,
//   roe: Number,
//   updateTime: [any],
//   amount: Number,
//   updateTimeStamp: Number, // 1672316691778,
//   yellow: Boolean,
//   tradeBefore: Boolean,
//   leverage: Number,
// }

// const ex = {
//   code: "000000",
//   message: null,
//   messageDetail: null,
//   data: {
//     otherPositionRetList: [
//       {
//         symbol: "DENTUSDT",
//         entryPrice: 0.0007054996456,
//         markPrice: 0.00068664,
//         pnl: 133.59324875,
//         roe: 0.19216765,
//         updateTime: [2022, 12, 29, 12, 24, 51, 778000000],
//         amount: -7087175,
//         updateTimeStamp: 1672316691778,
//         yellow: true,
//         tradeBefore: false,
//         leverage: 7,
//       },
//     ],
//     updateTime: [2022, 12, 29, 12, 24, 51, 778000000],
//     updateTimeStamp: 1672316691778,
//   },
//   success: true,
// };

// const getPositions = (user) => {
//   const postBody = JSON.stringify({ encryptedUid: user.encryptedUid, tradeType: "PERPETUAL" });
//   const options = {
//     host: "www.binance.com",
//     path: "/bapi/futures/v1/public/future/leaderboard/getOtherPosition",
//     keepAlive: "true",
//     headers: {
//       accept: "*/*",
//       "content-type": "application/json",
//       "Content-Length": postBody.length,
//     },
//     body: postBody,
//     method: "POST",
//   };

//   let latest = null;
//   const initialReq = https.request(options, function (res) {
//     latest = res;
//     return latest;
//   });
//   //  initialReq.write(postBody);
//   // initialReq.end();
//   // console.log(latest);

//   setInterval(() => {
//     const req = https.request(options, function (res) {
//       const chunks = [];

//       res.on("data", function (chunk) {
//         chunks.push(chunk);
//         // console.log(`CHUNKS LENGTH: ${chunks.length}\nCHUNK: ${chunk}\n`);
//       });

//       res.on("end", function () {
//         const body = Buffer.concat(chunks);
//         // console.log(`[updated @ ${Date.now()}]`);
//         console.log(body.toString());

//         if (
//           JSON.stringify(user.positions) !=
//           JSON.stringify(JSON.parse(body.toString()).data.otherPositionRetList)
//         ) {
//           // console.log(JSON.parse(body.toString()).data.otherPositionRetList);
//           user.positions = JSON.parse(body.toString()).data.otherPositionRetList;
//           // console.log(user.positions);
//         }
//         // console.log(body.toString());
//         // console.log(body.data.otherPositionRetList);
//       });
//     });
//     req.write(postBody);
//     req.on("error", (err) => {
//       console.log("Error!");
//     });
//     req.end();
//   }, 500);
// };

// getPositions(users.test);
