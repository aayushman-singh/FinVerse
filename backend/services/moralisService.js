import Moralis from 'moralis';

try {
  await Moralis.start({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjVmZTNiYzgyLWM0M2ItNDc2Mi1hZjIwLTkzMzQxMDdkN2I3NSIsIm9yZ0lkIjoiNDEzMTM5IiwidXNlcklkIjoiNDI0NTc1IiwidHlwZUlkIjoiMDQxODQ5YjAtZWI0MS00Y2VhLTg2NjctODI2OGJjMmM2YWM5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjk3Njg1NDksImV4cCI6NDg4NTUyODU0OX0.HZDfA-GeGdxUYsCpBlCgIMMPL4CrdBhky1Uwl_IyF44" });
 const response = await Moralis.EvmApi.token.getMultipleTokenPrices({
    "chain": "0x1",
    "include": "percent_change"
  },{
    "tokens": [
      {
        "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7"
      },
      {
        "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      },
      {
        "exchange": "uniswapv2",
        "tokenAddress": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
        "toBlock": "16314545"
      },
      {
        "tokenAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
      }
    ]
  });
  console.log(response.raw);
} catch (e) {
  console.error(e);
}