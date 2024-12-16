import WebSocket from "ws";
const DerivAPI = require("@deriv/deriv-api/dist/DerivAPI");

const app_id = 65687;
let maxStake = 0;
const symbol = "R_10";

// const connection = new WebSocket(
//     "wss://ws.derivws.com/websockets/v3?app_id=65687"
//   );
function createWebSocket() {
  const connection = new WebSocket(
    "wss://ws.derivws.com/websockets/v3?app_id=65687"
  );

  connection.onopen = () => {
    console.log("WebSocket connection established.");
  };

  connection.onmessage = (message) => {
    console.log("Received message:", message.data);
  };

  connection.onclose = (event) => {
    console.log(`WebSocket closed: ${event.reason}`);
    console.log("Reconnecting in 3 seconds...");
    setTimeout(() => {
      createWebSocket();
    }, 3000);
  };

  connection.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return connection;
}
const connection = createWebSocket();

function sendHeartbeat() {
  console.log(`Sending heartbeat: ${connection.readyState}`);
  if (connection.readyState === WebSocket.OPEN) {
    connection.send(JSON.stringify({ ping: "keep-alive" }));
  }
}

setInterval(sendHeartbeat, 30000);

const api = new DerivAPI({ connection });
const basic = api.basic;
const apiToken = process.env.api_token;
await basic.authorize(apiToken);

const wsHistory = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);

// async function SampleOpenVirtualCallTrade() {
//   try {
//     await basic.authorize(apiToken);
//     const proposal = await basic.proposal({
//       amount: 0.35,
//       basis: "stake",
//       contract_type: "CALL",
//       currency: "USD",
//       duration: 1,
//       duration_unit: "m",
//       symbol: "R_10",
//     });
//     console.log("Proposal details:", proposal);
//     const buyResponse = await basic.buy({
//       buy: proposal.proposal.id,
//       price: 0.35,
//     });
//     console.log("Buy response:", buyResponse);

//     const account = await api.account(apiToken);
//     const open_contracts = account.open_contracts;

//     console.log("Open contracts:", open_contracts);
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     connection.close();
//   }
// }

// async function SampleCheckIfisWon({ contract_id }: { contract_id: number }) {
//   let data = {
//     proposal_open_contract: {
//       is_expired: 0,
//       status: "",
//     },
//   };
//   while (!data.proposal_open_contract.is_expired) {
//     console.log("Checking if is_expired .... ");
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     data = await basic.proposalOpenContract({
//       contract_id: contract_id,
//       proposal_open_contract: 1,
//     });
//     console.log(data.proposal_open_contract.is_expired);
//   }
//   return data.proposal_open_contract.status === "won";
// }

async function SampleOpenTradeUnderDigit({
  stake,
  digit,
}: {
  stake: number;
  digit: number;
}) {
  console.log("Opening trade...", stake);
  if (maxStake < stake) maxStake = stake;

  const proposal = await basic.proposal({
    amount: stake,
    basis: "stake",
    contract_type: "DIGITUNDER",
    currency: "USD",
    duration: 1,
    duration_unit: "t",
    symbol: "R_10",
    barrier: digit,
  });
  console.log(proposal);

  const buyResponse = await basic.buy({
    buy: proposal.proposal.id,
    price: stake,
  });
  console.log(buyResponse.buy);
  //   const contractId = buyResponse.buy.contract_id;
}

function getLastDigit(input: number) {
  const str = input.toString();
  const decimalIndex = str.indexOf(".");

  if (decimalIndex === -1) {
    return 0; // No decimal part
  }
  const decimals = str.split(".")[1];
  return decimals.length >= 3 ? Number(decimals[2]) : 0;
}

wsHistory.on("open", () => {
  console.log("WebSocket connection established.");
  wsHistory.send(
    JSON.stringify({
      ticks: symbol,
    })
  );
});

let count = 0;
let lastPrice = 1;
wsHistory.on("message", (message) => {
  const data = JSON.parse(message as unknown as string) as {
    tick: { symbol: string; quote: number; epoch: number };
    error: { message: string };
  };
  if (data.tick) {
    console.log(`Tick received: ${data.tick.symbol}`);
    console.log(`Price: ${data.tick.quote}`);
    console.log(`Epoch: ${data.tick.epoch}`);
    console.log(`Max stake:${maxStake}`);

    const lastDigit = getLastDigit(data.tick.quote);
    if (lastDigit >= 2) count++;
    else count = 0;
    console.log(`Count: ${count}`);
    if (count > 39) {
      // change here
      if (lastDigit >= 2) lastPrice = lastPrice * 2;
      else lastPrice = 1;
      SampleOpenTradeUnderDigit({
        stake: lastPrice,
        digit: 2,
      });
      console.log("Open trade", lastPrice, lastDigit);
    } else {
      lastPrice = 1;
    }
  } else if (data.error) {
    console.error(`Error: ${data.error.message}`);
  }
});

wsHistory.on("close", () => {
  console.log("WebSocket connection closed.");
});

wsHistory.on("error", (error) => {
  console.error("WebSocket error:", error);
});
