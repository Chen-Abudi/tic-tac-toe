import { io } from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";

export const socket = io("http://localhost:3002");

const getClientList = (clientId) => {
  return fetch(`http://localhost:3001/clients?clientId=${clientId}`)
    .then((res) => res.json())
    .then((clients) => {
      return clients;
    });
};
function App() {
  const [clientId, setClientId] = useState("");
  const [didNewClientConnect, setDidNewClientConnect] = useState(false);
  const [clients, setClients] = useState([]);

  const fetchClients = useCallback(async (clientId) => {
    const clients = await getClientList(clientId);
    setClients(clients);
  }, []);

  useEffect(() => {
    function onClientCallToPlay() {
      console.log("Client called to play");
    }

    function onConnect() {
      console.log("Connected to server");
      fetchClients(socket.id);
      setClientId(socket.id);
      socket.on(`${socket.id}-play`, onClientCallToPlay);
    }

    function onDisconnect() {
      setClientId("");
    }

    function onClientConnected(clientId) {
      if (clientId !== socket.id) {
        setDidNewClientConnect(true);
      }
    }

    function onClientDisconnected(clientId) {
      if (clients.includes(clientId)) {
        fetchClients(socket.id);
      }
    }

    socket.on(`newClientConnected`, onClientConnected);
    socket.on(`clientDisconnected`, onClientDisconnected);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(`newClientConnected`, onClientConnected);
      socket.off(`clientDisconnected`, onClientDisconnected);
      socket.off(`${socket.id}-play`, onClientCallToPlay);
    };
  }, [clients, fetchClients]);

  const refresh = async () => {
    await fetchClients(socket.id);
    setDidNewClientConnect(false);
  };

  return (
    <div className="App">
      <p>Client ID: {clientId}</p>
      {didNewClientConnect && (
        <p>
          Client connected
          <button onClick={refresh}>Refresh</button>
        </p>
      )}
      <pre>players: {JSON.stringify(clients, null, 2)}</pre>
    </div>
  );
}

export default App;
