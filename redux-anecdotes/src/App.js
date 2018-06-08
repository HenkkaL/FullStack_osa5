import React from 'react';


class App extends React.Component {
  store = this.props.store
  vote = (id) => () => {
    this.store.dispatch({
      type: 'LIKE',
      data: {
        id: id
      }
    })
  }

  create = (id) => () => {
    const input = this.refs.anecdote.value
    this.store.dispatch({
      type: 'ADD',
      data: {
        input: input
      }
    })
    this.refs.anecdote.value = ''
  }

  render() {
    const anecdotes = this.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input ref="anecdote"/></div>
          <button type="button" onClick={this.create()}>create</button> 
        </form>
      </div>
    )
  }
}

export default App