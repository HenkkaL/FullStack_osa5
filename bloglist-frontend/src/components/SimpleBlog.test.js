import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Blogin nimi',
            author: 'kirjoittajan nimi',
            likes: 3
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const contentDiv = blogComponent.find('.content')
        const likesDiv = blogComponent.find('.likes')        
        const contentDivText = contentDiv.text()
        
        expect(contentDivText).toContain(blog.title)
        expect(contentDivText).toContain(blog.author)
        expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)
    })

    it('clicking the button twice calls event handler twice', () => {
        const blog = {
            title: 'Blogin nimi',
            author: 'kirjoittajan nimi',
            likes: 3
        }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
            <SimpleBlog
             blog={blog}
             onClick={mockHandler}
             />)
      
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
      
        expect(mockHandler.mock.calls.length).toBe(2)
      })
})