import WebSocket from "ws";
const DerivAPI = require("@deriv/deriv-api/dist/DerivAPI");

const app_id = 65687;
// let maxStake = 0;
const symbol = "R_50";

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

// async function SampleOpenTradeUnderDigit({
//   stake,
//   digit,
// }: {
//   stake: number;
//   digit: number;
// }) {
//   console.log("Opening trade...", stake);
//   if (maxStake < stake) maxStake = stake;

//   const proposal = await basic.proposal({
//     amount: stake,
//     basis: "stake",
//     contract_type: "DIGITUNDER",
//     currency: "USD",
//     duration: 1,
//     duration_unit: "t",
//     symbol: "R_10",
//     barrier: digit,
//   });
//   console.log(proposal);

//   const buyResponse = await basic.buy({
//     buy: proposal.proposal.id,
//     price: stake,
//   });
//   console.log(buyResponse.buy);
//   //   const contractId = buyResponse.buy.contract_id;
// }

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

async function SampleOpenTradeRiseFall({
  stake,
  type,
}: {
  stake: number;
  type: "CALL" | "PUT";
}) {
  console.log("Opening trade...", stake);

  const proposal = await basic.proposal({
    amount: stake,
    basis: "stake",
    contract_type: type, // Use CALL for Rise or PUT for Fall
    currency: "USD",
    duration: 1,
    duration_unit: "t",
    symbol: symbol,
  });

  //   console.log(proposal);

  const buyResponse = await basic.buy({
    buy: proposal.proposal.id,
    price: stake,
  });

  //   console.log(buyResponse.buy);
}

let lastPrice = 0;
let counter = 0;

let delayTick = false;
let consecutiveLoss = 0;



const lossToHandle = 2;
const limiter = 2;
const multiplier = 2.1;
const maxStake = 6;
const initialStake = 0.35;




let currentStake =  initialStake;
let stare = false;
wsHistory.on("message", (message) => {
  const data = JSON.parse(message as unknown as string) as {
    tick: { symbol: string; quote: number; epoch: number };
    error: { message: string };
  };
  if (data.tick) {
    if (!delayTick) {
      console.log(`Price: ${data.tick.quote}`);
      if (lastPrice !== 0) {
        if (lastPrice < data.tick.quote) {
          console.log(`won${consecutiveLoss}`, data.tick.quote, lastPrice);
          if (consecutiveLoss > limiter) {
           if(!stare)  currentStake =  initialStake;
          }
          consecutiveLoss = 0;
        } else {
          console.log(`lost${consecutiveLoss}`, data.tick.quote, lastPrice);
          if (consecutiveLoss > limiter) {
            if (!stare) {
                currentStake = currentStake * multiplier;
                if(currentStake > maxStake) currentStake =  initialStake;
              }
          }
          consecutiveLoss++;
        }
      }
      if (consecutiveLoss > limiter) {
        if (consecutiveLoss <= limiter+lossToHandle) {
            stare = false;
          SampleOpenTradeRiseFall({
            stake: Number(currentStake.toFixed(2)),
            type: "CALL",
          });
        
        }
        else{
            stare = true;
            console.log("Stare");
            consecutiveLoss = 0;
        }

        counter++;
      }
      delayTick = true;
    } else {
      delayTick = false;
      console.log("Delay tick");
      lastPrice = data.tick.quote;
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
