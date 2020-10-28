const Header = () => {
  return (
    <div className="header grid">
      <h1 className="title">Jiffy</h1>
    </div>
  )
}

class App extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      searchTerm:''
    }
  }
  
  
  // create-react-app lets you use arrow funcs, removing need to bind()
  handleChange = (event) => {
    const { value } = event.target
    this.setState((prevState, props) => ({
      ...prevState, // take old props, spread them out
      
      searchTerm: value // overwrite the ones we want afterward
    }))
    if (value.length > 2) {
      // show hint message
    }
  }

  handleKeyPress = (event) => {
    const { value } = event.target

    // when we have 2+ chars in our search box && pressed enter: run search
    if (value.length > 2 && event.key === "Enter") {
      alert(`search for ${value}`)
    }
  }
  
  render(){
    // can also be written 
    // const searchTerm = this.state.searchTerm
    const {searchTerm} = this.state
    return (
    <div className="page">
      <Header />
      <div className="search grid">
        {/* our stack of gif images */}
        <input
          className="input grid-item"
          placeholder="Type something"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={searchTerm}
        />
      </div>
    </div>
  )
  }


}

export default App
