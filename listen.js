import { listen } from "binance-leaderboard-listener";
// Exactly the same as scan.js
// Reminder: Uninstall in order to not show weakness
import * as dotenv from "dotenv";
dotenv.config();

const users = {
  TreeOfAlpha1: {
    name: "TreeOfAlpha",
    encryptedUid: "FB23E1A8B7E2944FAAEC6219BBDF8243",
    positions: [],
    initialized: false,
  },
  TreeOfAlpha2: {
    name: "TreeOfAlpha",
    encryptedUid: "DF74DFB6CB244F8033F1D66D5AA0B171",
    positions: [],
    initialized: false,
  },
  blankbrain: {
    name: "BlankBrain",
    encryptedUid: "10CD59AFCF8A261D738E3803586FE3FF",
    positions: [],
    initialized: false,
  },
  hyuk: {
    name: "Hyuk",
    encryptedUid: "0F773DC158FDF10D9B0FDDC860C5FD2C",
    positions: [],
    initialized: false,
  },
  test: { encryptedUid: "4DEEE53F639E5E825DC84E6B7AF3D1E8", positions: [], initialized: false },
};

const updatedPositions = (prev, curr) => {
  let temp = [];
  if (prev.length < curr.length) {
    // Opened a position
    const dir = curr[0].amount > 0 ? "LONG" : "SHORT";
    const value = curr[0].amount * curr[0].entryPrice;
    const margin = value / curr[0].leverage;

    console.log(
      `${users.blankbrain.name} opened \$${margin} ${dir} on ${curr[0].symbol} @ \$${curr[0].entryPrice} (${value} w/ ${curr[0].leverage}x lev)`,
    );
    //} else if (true) {
  } else if (prev.length > curr.length) {
    // Closed a position
    const closed_position = Object.values(prev).filter((val) => {
      return !JSON.stringify(curr).includes(JSON.stringify(val));
    });
    const dir = closed_position[0].amount > 0 ? "LONG" : "SHORT";
    const value = curr[0].amount * curr[0].entryPrice;
    const margin = value / curr[0].leverage;

    console.log(
      `${users.blankbrain.name} closed \$${margin} ${dir} on ${curr[0].symbol} @ \$${curr[0].entryPrice} (${value} w/ ${curr[0].leverage}x lev)`,
    );
  } else {
    // console.log(Object.entries(curr));
    temp = Object.entries(curr).forEach(([key, val]) => {
      // Check the 'updateTime' of each position to see if any adjustments were made
      if (JSON.stringify(val.updateTime) !== JSON.stringify(prev[key].updateTime)) {
        console.log("Updated Position Detected!");
        // Spit out a telegram msg here
        // ...
        // Update the value of the changed position
        prev[key] = val;
        // return curr;
      } else if (val.pnl !== prev[key].pnl) {
        /*
         * TESTING
         */
        //console.log(val);
        console.log(
          `[updated PnL for 'user' ${val.amount} ${val.symbol}]: \$${val.pnl}    -    prev: ${prev[key].pnl}, curr: ${val.pnl}    %    opened @ ${val.updateTime}`,
        );
        prev[key] = val;
        return 1;
      }
    });
  }
};

const tg = `https://api.telegram.org/bot${process.env.TG_API}/getMe`;
console.log(tg);
const listener = listen({
  encryptedUid: "4DEEE53F639E5E825DC84E6B7AF3D1E8",
  delay: 2000,
  tradeType: "PERPETUAL",
});
listener.on("update", (data) => {
  console.log(`\n[updated @ ${Date.now()}]`);
  // console.log(users.test.positions);
  if (
    users.test.initialized == false &&
    (users.test.positions == undefined || users.test.positions.length == 0)
  ) {
    console.log("[fetching initial positions]");
    users.test.positions = data;
    users.test.initialized = true;
  } else {
    // const eq = users.test.positions.isEqual(data);
    // const eq = comparePositions(users.test.positions, data);
    //const eq = JSON.stringify(users.test.positions) === JSON.stringify(data);

    console.log(updatedPositions(users.test.positions, data));
    // if (updatedPositions(users.test.positions, data)) {
    //   console.log(comp);
    // } else {
    //   console.log("[no changes detected]");
    // }
  }
  // Compare positions to current data
  //
  // console.log(data);
});
