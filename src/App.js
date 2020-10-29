import { Component } from 'react'
import loader from './assets/loader.svg'
import Gif from './Gif'

const randomChoice = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length)
  return arr[randIndex]
}

const Header = () => {
  return (
    <div className="header grid">
      <h1 className="title">Jiffy</h1>
    </div>
  )
}

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {/* loader is pulled via Webpack */}
    {/* Is the returned status loading ? (Y) = Loader : (N) = text */}
    {loading ? (
      <img className="block mx-auto" src={loader} alt="loader showing" />
    ) : (
      hintText
    )}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      hintText: '',
      gif: null,
      gifs: [],
    }
  }

  searchGiphy = async (searchTerm) => {
    this.setState({
      loading: true,
    })

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=skOxpxRE3EQVYqxKBrfILVh9zEKTqrbQ&q=${searchTerm}&limit=25&offset=0&rating=pg&lang=en`
      )
      // {data} = better way of writing data.data
      const { data } = await response.json()

      const randomGif = randomChoice(data)

      this.setState((prevState, props) => ({
        ...prevState,
        gif: randomGif,
        gifs: [...prevState.gifs, randomGif],
        loading: false, // we need to do this otherwise the spinner stays onscreen
      }))
      // console.log(data)
    } catch (error) {
      //
    }
  }

  // create-react-app lets you use arrow funcs, removing need to bind()
  handleChange = (event) => {
    const { value } = event.target
    // by setting searchTerm in our state+ using that value on the input
    // it creates a "controlled input"
    this.setState((prevState, props) => ({
      ...prevState, // take old props, spread them out

      searchTerm: value, // overwrite the ones we want afterward

      // Setting a test for the length of the input
      hintText: value.length > 2 ? `Hit enter to search ${value}` : '',
    }))
  }

  handleKeyPress = (event) => {
    const { value } = event.target

    // when we have 2+ chars in our search box && pressed enter: run search
    if (value.length > 2 && event.key === 'Enter') {
      this.searchGiphy(value)
    }
  }

  render() {
    // could also be written
    // const searchTerm = this.state.searchTerm
    const { searchTerm, gif } = this.state
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* our stack of gif images */}
          {gif && this.state.gifs.map((gif) => <Gif {...gif} />)}
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        <UserHint {...this.state} />
      </div>
    )
  }
}

export default App
