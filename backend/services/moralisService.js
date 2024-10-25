import Moralis from 'moralis';

        export async function getTokenPrice(tokenAddress) {
          try {
            await Moralis.start({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjVmZTNiYzgyLWM0M2ItNDc2Mi1hZjIwLTkzMzQxMDdkN2I3NSIsIm9yZ0lkIjoiNDEzMTM5IiwidXNlcklkIjoiNDI0NTc1IiwidHlwZUlkIjoiMDQxODQ5YjAtZWI0MS00Y2VhLTg2NjctODI2OGJjMmM2YWM5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjk3Njg1NDksImV4cCI6NDg4NTUyODU0OX0.HZDfA-GeGdxUYsCpBlCgIMMPL4CrdBhky1Uwl_IyF44" });
            const response = await Moralis.EvmApi.token.getTokenPrice({
              address: tokenAddress,
              chain: '0x1',
            });
            return response.raw;
          } catch (e) {
            console.error("Error fetching token price:", e);
            throw new Error("Failed to fetch token price");
          }
        }
        