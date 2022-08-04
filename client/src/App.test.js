import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Home from "./04_components/Home/Home";
import AddActivity from "./04_components/AddActivity/AddActivity";
import Landing from "./04_components/Landing/Landing";
import Card from "./04_components/Card/Card";

configure({ adapter: new Adapter() })

describe('App', () => {
    let store
    const middlewares = []
    const mockStore = configureStore(middlewares);

    beforeEach(() => {
        store = mockStore([]);
    });

    describe('Routes', () => {
        it('It should render on the path / (Only on the path "/")', () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <Landing />
                    </MemoryRouter>
                </Provider>
            )
            expect(wrapper.find(Landing)).toHaveLength(1)
        })
        it('It should render on the path "/countries"', () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/countries']}>
                        <Home />
                    </MemoryRouter>
                </Provider>
            )
            expect(wrapper.find(Home)).toHaveLength(1)
        })
        it('It should render on the path "/countries/:id"', () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/countries/:id']}>
                        <Card />
                    </MemoryRouter>
                </Provider>
            )
            expect(wrapper.find(Card)).toHaveLength(1)
        })
      })
})