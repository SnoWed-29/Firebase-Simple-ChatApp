import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore' ;
import { auth, db } from "../firebase-config";

export const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");
    
        useEffect(() => {
            const queryMessages =query(messagesRef, where("room", "==", room), orderBy("createAt") )
            const unsubscribe= onSnapshot(queryMessages, (snapshot) => {
                let messages =[];
                snapshot.forEach((doc)=> {
                    messages.push({...doc.data(), id: doc.id})
                });
                setMessages(messages);
            });
            return () => unsubscribe();
        }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;


        await addDoc(messagesRef, {
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("");



    };

    return (
      <div className="w-2/3 mx-auto my-3">
        <div className="w-full flex justify-center bg-purple-500 text-white text-3xl p-4"> 
            <h1>Welcome To : {room.toUpperCase()}</h1>
        </div>
        <div className="py-2 border-2 border-purple-500">
          {messages.map((message) => (
            <div className="flex " key={message.id}> 
            <span className="font-bold" > {message.user}: </span>
            {message.text}
            
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-">
          <input
            type="text"
            className="p-2 text-center border-2 border-black border-t-white rounded-sm"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600"
          >
            {" "}
            Send{" "}
          </button>
        </form>
      </div>
    );
}