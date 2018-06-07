import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe('<Blog />', () => {
    let blogComponent
    const blog = {
        title: 'Blogin nimi',
        author: 'kirjoittajan nimi',
        url: 'urli',
        likes: 3
    }

    beforeEach(() => {
        blogComponent = shallow(
            <Blog
                blog={blog}
            />
        )
    })

    it('at start the details are not displayed', () => {
        const div = blogComponent.find('.detailDiv')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    })

    it('after clicking the button,details are displayed', () => {
        const headerDiv = blogComponent.find('.headerDiv')
        headerDiv.simulate('click')
        console.log(headerDiv.debug())
        
        const detailsDiv = blogComponent.find('.detailDiv')
        expect(detailsDiv.getElement().props.style).toEqual({ display: '' })
        console.log(detailsDiv.debug())
    })

})