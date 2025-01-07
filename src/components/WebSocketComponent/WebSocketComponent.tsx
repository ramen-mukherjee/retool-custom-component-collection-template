import { type FC, useEffect, useState } from 'react';

type PriceData = {
  [key: string]: number;
};

export const WebSocketComponent: FC = () => {
  const [prices, setPrices] = useState<PriceData>({});

  useEffect(() => {
    const ws = new WebSocket(
      'wss://ai-chat-wss-demo-realtimedatasources-prod.deployments.quix.io/timeseries'
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices((prevPrices) => ({
        ...prevPrices,
        ...data,
      }));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices).map(([asset, price]) => (
            <tr key={asset}>
              <td>{asset}</td>
              <td>{price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
