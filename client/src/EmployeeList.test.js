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
 */
describe('EmployeeList component', () => {
  it('shows a list of employees', async () => {
    fetchMock.get('/api', {});

    // Create a TestRenderer instance with the passed React element. It doesn’t use the real DOM, but it still
    // fully renders the component tree into memory so you can make assertions about it.
    const component = create(<EmployeeList />);
    // Return the instance corresponding to the root element, if available. This will not work if the root
    // element is a function component because they don’t have instances.
    const instance = component.getInstance();
    await instance.componentDidMount();
    //
    console.log(instance.state); // << HERE IS THE SNITCH!
  });
});
