import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);


  if (!isAuth) {
    return (
      <>
        <div>
          <Auth setIsAuth={setIsAuth} />
        </div>
      </>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="w-1/3 h-screen mx-auto flex flex-col items-center justify-center space-y-4">
          <label className="text-2xl font-semibold">Enter Room Name</label> 
          <input ref={roomInputRef} type="text" className="p-2 text-center border-2 border-black rounded-sm"/>
          <button onClick={() => setRoom(roomInputRef.current.value)} className="px-4 py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600">Enter Chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
