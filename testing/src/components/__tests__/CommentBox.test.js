import React from 'react'
import {mount} from 'enzyme'
import CommentBox from 'components/CommentBox'
import Root from 'Root'

let wrapped

beforeEach(()=> {
    wrapped = mount(
        <Root>
            <CommentBox />
        </Root>
    )
})

afterEach(() => {
    wrapped.unmount()
})

it("Has a text area and a button", ()=> {
    expect(wrapped.find("textarea").length).toEqual(1)
    expect(wrapped.find("button").length).toBeGreaterThan(0)
})


describe("the text area", () => {
    let value = "new value"

    beforeEach(() => {
        wrapped.find("textarea").simulate("change", {target: {value: value}})
        wrapped.update();
    })

    it("User can type inside text area", ()=>{
        expect(wrapped.find("textarea").prop("value")).toEqual(value)
    })

    it("Text area gets empty after submitting", () => {
        wrapped.find("form").simulate("submit")
        wrapped.update()
        expect(wrapped.find("textarea").prop("value")).toEqual("")
    })
})