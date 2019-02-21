import React from 'react';
import { create } from 'react-test-renderer';
import EmployeeList from './EmployeeList';
import fetchMock from 'fetch-mock';

/**
 * As a caveat remember that browser end-to-end tests are out of scope here and a seperate tool will be required
 * for that. This Jest based test case is intended to be used for unit tests of our logic and your components
 * rather than the DOM quirks.
 *
 * The reasoning behind this caveat is that While Jest provides browser globals such as window thanks to jsdom,
 * they are only approximations of the real browser behavior.
 *
 * READ this page if you are unfamiliar with react-test-renderer:
 *
 * https://reactjs.org/docs/test-renderer.html
 */
describe('EmployeeList component', () => {
  it('state remains in loading when erroneous response sent from server', async () => {
    fetchMock.get('/api', {});

    // Create a TestRenderer instance with the passed React element. It doesn’t use the real DOM, but it still
    // fully renders the component tree into memory so you can make assertions about it.
    const component = create(<EmployeeList />);
    // Return the instance corresponding to the root element, if available. This will not work if the root
    // element is a function component because they don’t have instances.
    const instance = component.getInstance();

    await instance.componentDidMount();

    // When testing React components we shouldn't care about the internal state. We're interested in testing what the
    // user should see. So, the two assertions below are INCORRECT but I'm leaving them here as an example of what not
    // to do.
    expect(instance.state.isLoading === true);
    expect(instance.state.employees === []);

    // Now lets do things the CORRECT way, that is testing what the user should see.
    const testInstance = component.root;
    expect(testInstance.findByType('p').children).toEqual(['Loading...']);
  });
});
