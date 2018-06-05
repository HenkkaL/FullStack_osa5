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
    const collapseDiv = { display: this.state.collapse ? '' : 'none' }
    
    const getUserName = this.props.blog.user? this.props.blog.user.name : ''

    const blogStyle = {
        paddingTop: 10,
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
          <p>Likes: {this.props.blog.likes}    <span><button>Like</button></span></p>
          <p>Added by: <span>{getUserName}</span></p>
        </div>
      </div>
    )
  }
}

export default Blog