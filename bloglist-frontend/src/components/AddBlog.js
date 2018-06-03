import React from 'react'





const AddBlog = (props) => {
  return (
    <div>
      <h2>Lisää uusi blogi</h2>

      <form onSubmit={props.addBlog}>
        <label>Nimi</label>
        <input
          name="title"
          value={props.title}
          onChange={props.handleBlogChange}
        />
        <label>Kirjoittaja</label>
        <input
          name="author"
          value={props.author}
          onChange={props.handleBlogChange}
        />
        <label>Url</label>
        <input
          name="url"
          value={props.url}
          onChange={props.handleBlogChange}
        />
        <button>tallenna</button>
      </form>
    </div>
  )
}

export default AddBlog
