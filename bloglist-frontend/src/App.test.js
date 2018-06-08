import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
      beforeEach(() => {
        app = mount(<App />)        
      })
  
      it('only login form is rendered', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(0)
      })
    })
  
    describe('when user is logged', () => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      } 
      beforeEach(() => {        
        
        app = mount(<App />) 
        localStorage.setItem('loggedInUser', JSON.stringify(user))
  
        
      })
  
      it('all notes are rendered', () => {

        console.log(window.localStorage.getItem('loggedInUser'))
        app.update()
        console.log(app.html())
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
      })
    })
  })