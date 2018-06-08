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

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.store.dispatch({
      type: 'ADD',
      data: {
        content: content
      }
    })
    event.target.anecdote.value = ''
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
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App