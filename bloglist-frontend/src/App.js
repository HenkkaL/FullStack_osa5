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

  addLike = (id) => {
    return () => {
      const blog = this.state.blogs.find(b => b._id === id)
      console.log(blog)
      const likes =  blog.likes + 1
      const changedBlog = { ...blog, likes: likes }

      blogService
        .update(id, changedBlog)
        .then(updatedBlog => {
          this.setState({
            blogs: this.state.blogs.map(blog => blog._id !== id ? blog : changedBlog)
          })
        })
    }
  }

  deleteBlog = (id) => {
    return () => {
      if (window.confirm("haluatko poistaa numeron"))
      blogService
      .deleteBlog(id)
      .then(responce => {
        if (responce.status === 204) {
          this.setState({
            blogs: this.state.blogs.filter(blog => blog._id !== id)
          })
        }
      })
    }
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
        {this.state.blogs.sort(function (a, b) {
          if (a.likes < b.likes) {
            return 1;
          }
          if (a.likes > b.likes) {
            return -1;
          }
          return 0;
        }).map(blog =>
          <Blog 
            key={blog._id}
            blog={blog}
            addLike={this.addLike(blog._id)}
            user={this.state.user.username}
            deleteBlog={this.deleteBlog(blog._id)}
          />
        )}
      </div>
    )

    return (
      <div>
        <Notification errorType={this.state.errorType} message={this.state.error} />
        {this.state.user === null ? loginForm() : allBlogs() }
      </div>
    );
  }
}

export default App;
