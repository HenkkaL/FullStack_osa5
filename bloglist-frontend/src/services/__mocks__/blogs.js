let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    author: "eka kirjailija",
    title: "HTML on helppoa",
    url: "www.urli1",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    author: "toka kirjailija",
    title: "Selain pystyy suorittamaan vain javascriptiä",
    url: "www.tokaurli",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    author: "eka kirjailija",
    title: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    url: "www.kolmasurli",
    important: true,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }