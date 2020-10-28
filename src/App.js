import React, { useState } from "react"

const Header = () => {
  return (
    <div className="header grid">
      <h1 className="title">Jiffy</h1>
    </div>
  )
}

function App() {
  const [searchTerm, useSearchTerm] = useState("")

  // create-react-app lets you use arrow funcs, removing need to bind()
  const handleChange = (event) => {
    const { value } = event.target
    if (value.length > 2) {
    }
  }

  const handleKeyPress = (event) => {
    const { value } = event.target

    // when we have 2+ chars in our search box && pressed enter: run search
    if (value.length > 2 && event.key === "Enter") {
      alert(`search for ${value}`)
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="search grid">
        {/* our stack of gif images */}
        <input
          className="input grid-item"
          placeholder="Type something"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default App
