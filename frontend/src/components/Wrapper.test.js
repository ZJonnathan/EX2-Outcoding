import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import ReactDOM from 'react-dom'
import Wrapper from './Wrapper';
import jsdom from 'jsdom'
import assert from 'assert'

describe('<Wrapper />', () => {
    it('Rendering', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Wrapper />, div)
    })
})