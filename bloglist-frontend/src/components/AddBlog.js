import React from 'react'





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

export default AddBlog
