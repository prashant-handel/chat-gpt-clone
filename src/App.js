import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const creatNewChat = ()=>{
    setMessage(null)
    setValue('')
    setCurrentTitle(null)
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:5000/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(
        (prevChats) => (
          [...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          }]
        )
      );
    }
  }, [message, currentTitle]);
  console.log(previousChats);

  const currentChat = previousChats.filter(previousChats => (previousChats.title === currentTitle));

  return (
    <div className="App">
      <section className="side-bar">
        <button onClick={creatNewChat}>+ New Chat</button>
        <ul className="history">
          <li>Blugh</li>
        </ul>
        <nav>
          <p>Made by Prashant</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ChatGPT</h1>}
        <ul className="feed">
          {currentChat.map(chatMessage, index)=>}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts. ChatGPT May 12 Version.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
