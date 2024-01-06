const {noralizeURL} = require('./crawl.js');

const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = noralizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
    
})


test('normalizeURL trailing backslash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = noralizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
    
})


test('normalizeURL capital', ()=>{
    const input = 'https://BLOG.boot.dev/path/'
    const actual = noralizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
    
})

test('normalizeURL strip http', ()=>{
    const input = 'http://BLOG.boot.dev/path/'
    const actual = noralizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
    
})


