import React from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ addBlog, title, author, url, handleBlogChange }) => {
  return (
    <div>
      <h2>Lisää uusi blogi</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>Nimi</label>
          <input
            name="title"
            value={title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>Kirjoittaja</label>
          <input
            name="author"
            value={author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>Url</label>
          <input
            name="url"
            value={url}
            onChange={handleBlogChange}
          />
          <button>tallenna</button>
        </div>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleBlogChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default AddBlog
