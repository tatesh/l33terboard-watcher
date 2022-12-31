import { listen } from "binance-leaderboard-listener";
// Exactly the same as scan.js
// Reminder: Uninstall in order to not show weakness

const users = {
  TreeOfAlpha1: {
    encryptedUid: "FB23E1A8B7E2944FAAEC6219BBDF8243",
    positions: [],
    initialized: false,
  },
  TreeOfAlpha2: {
    encryptedUid: "DF74DFB6CB244F8033F1D66D5AA0B171",
    positions: [],
    initialized: false,
  },
  blankbrain: {
    encryptedUid: "10CD59AFCF8A261D738E3803586FE3FF",
    positions: [],
    initialized: false,
  },
  test: { encryptedUid: "4DEEE53F639E5E825DC84E6B7AF3D1E8", positions: [], initialized: false },
};

const updatedPositions = (prev, curr) => {
  let temp = [];
  if (prev.length != curr.length) {
    // Look for Open / Close events ici
    return curr;
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
        console.log(
          `[updated PnL for ${val.amount} ${val.symbol}]: \$${val.pnl}    -    prev: ${prev[key].pnl}, curr: ${val.pnl}`,
        );
        prev[key] = val;
        return 1;
      }
    });
  }
};

// const deepEqual = (a, b) => {
//   if (a === b) return true;
//   if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
//   if (!a || !b || (typeof a !== "object" && typeof b !== "object")) return a === b;
//   if (a === null || a === undefined || b === null || b === undefined) return false;
//   if (a.prototype !== b.prototype) return false;
//   // let keys = Object.keys(a);
//   let keys = ['symbol', 'entryPrice', 'updateTime']
//   // keys.filter(([key]) => key.includes(""))
//   if (keys.length !== Object.keys(b).length) return false;
//   return keys.every((k) => isEqual(a[k], b[k]));
// };

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
    const eq = JSON.stringify(users.test.positions) === JSON.stringify(data);

    // console.log(Object.values(data));
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
