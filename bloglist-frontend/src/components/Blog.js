import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false
    }
  }

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  

  render() {
    const getUser = (user1, user2) => {
      if (!user1) {
        return ''
      }
      if (user1.username === user2) {
        return ''
      }
      return 'none'
    }

    const collapseDiv = { display: this.state.collapse ? '' : 'none' }
    const deleteButton = {display: getUser(this.props.blog.user, this.props.user)}
    const getUserName = this.props.blog.user? this.props.blog.user.name : ''
    

    const blogStyle = {
        paddingTop: 2,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleCollapse}>
          <h4>{this.props.blog.author}</h4>
        </div>
        <div style={collapseDiv}>
        <h4>{this.props.blog.title}</h4>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>{this.props.blog.author}</p>
          <p>Likes: {this.props.blog.likes}    <span><button onClick={this.props.addLike}>Like</button></span></p>          
          <p>Added by: <span>{getUserName}</span></p>
          <button style={deleteButton} onClick={this.props.deleteBlog}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Blog