import React from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],      
      error: null,
      errorType :null,
      username: '',
      password: '',
      user: null,
      author: '',
      title: '',
      url:''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>      
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
        errorType: 'error'
      })
      setTimeout(() => {
        this.setState({ error: null, errorType: null })
      }, 5000)
    }
  }

  logout = (event) => {
    window.localStorage.clear()
    this.setState({ username: '', password: '', user: null})
  }

  addBlog = (event) => {
    event.preventDefault()
    console.log("testi")
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          author: '',
          title: '',
          url: '',
          error: `a new blog '${newBlog.title}' by '${newBlog.author} added`,
          errorType: 'notification'
        })
        setTimeout(() => {
          this.setState({ error: null, errorType: null })
        }, 5000)
      })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const allBlogs = () => (
      <div>
        <h2>blogs</h2>        
        <button onClick={this.logout}>logout</button>
        <p>{this.state.user.name} logged in</p>
        <Togglable buttonLabel="new blog" ref={component => this.allBlogs = component}>
          <AddBlog
            addBlog={this.addBlog}
            handleBlogChange={this.handleBlogChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url} />
        </Togglable>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )

    return (
      <div>
        {console.log(this.state.blogs)}
        <Notification errorType={this.state.errorType} message={this.state.error} />
        {this.state.user === null ? loginForm() : allBlogs() }
      </div>
    );
  }
}

export default App;
