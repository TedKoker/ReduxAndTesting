import React from 'react'
import {mount } from 'enzyme'
import moxios from 'moxios'
import Root from 'Root'
import App from 'components/App'

let fetchResponse, wrapped

describe("fetch testing", () => {
    beforeEach(() => {
        fetchResponse = [{name: "Fetch #1"}, {name: "Fetch #2"}]
        moxios.install()
        moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
            status: 200,
            response: fetchResponse
        })
    })
    
    afterEach(() => {
        moxios.uninstall()
        wrapped.unmount()
    })
    
    it("can fetch a list of comments, and display them", (done) => {
        wrapped = mount(
            <Root>
                <App/>
            </Root>
        )
        
        wrapped.find(".fetch-cooments").simulate("click")
    
        moxios.wait(() => {
            wrapped.update()
            expect(wrapped.find("li").length).toEqual(fetchResponse.length)
            done()
        })
    })
})  

let comments

beforeEach(() => {
    comments = ["one", "two", "three"]
})

it("Adding and deleting from list work", () => {
    wrapped = mount(
        <Root>
            <App/>
        </Root>
    )
    
    comments.forEach((comment, index) => {
        wrapped.find("textarea").simulate("change", {target:{value: comment}})
        expect(wrapped.find("textarea").prop("value")).toEqual(comment)
        wrapped.find("form").simulate("submit")
        wrapped.update()
        expect(wrapped.find("textarea").prop("value")).toEqual("")
        expect(wrapped.find("li").length).toEqual(index + 1)
    })

    wrapped.find(".delete-comments").simulate("click")
    wrapped.update()
    expect(wrapped.find("li").length).toEqual(0)
})