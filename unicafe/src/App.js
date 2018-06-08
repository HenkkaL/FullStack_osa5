import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'
import {createStore} from 'redux'

const store = createStore(reducer)

const handleZero = () => {
  return store.dispatch({type: 'ZERO'})
}
const Statistiikka = () => {
  const feedBack = store.getState()
  const sum = feedBack.good + feedBack.ok + feedBack.bad
  const average = (feedBack.good - feedBack.bad)/sum
  const positives = (feedBack.good / sum) * 100
  if ( sum === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{feedBack.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{feedBack.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{feedBack.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positives} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleZero}>nollaa tilasto</button>
    </div >
  )
}
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }  
  
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka 
        feedBack={store.getState()}
        />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App;