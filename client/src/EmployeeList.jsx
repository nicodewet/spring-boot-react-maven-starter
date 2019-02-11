import React, { Component } from 'react';
import Employee from './Employee';

const root = '/api';
const fetchHeaders = { headers: { 'Content-Type': 'application/hal+json' } };
const genericNetworkResponseNotOkMessage = 'Network response was not ok.';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, employees: [] };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(root, fetchHeaders)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(genericNetworkResponseNotOkMessage);
      })
      .then(function(halRootDocumentData) {
        if (
          halRootDocumentData._links !== undefined &&
          halRootDocumentData._links['employees'] !== undefined
        ) {
          let employeesContainedLinkHref =
            halRootDocumentData._links['employees'].href;
          console.log(employeesContainedLinkHref);
          let res = employeesContainedLinkHref.split('{?page,size,sort}');
          // this only works if the page size is less than the total number of employees
          return fetch(res[0], fetchHeaders);
        } else {
          throw new Error(
            'HAL API root object may not be a Resource Object as it has no _links or contained employee resource links.'
          );
        }
      })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(genericNetworkResponseNotOkMessage);
      })
      .then(data => {
        console.log(data);
        this.setState({
          employees: data._embedded.employees,
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        );
      });
  }

  render() {
    const { employees, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const employeesRows = employees.map(employee => (
      <Employee key={employee._links.self.href} employee={employee} />
    ));

    return (
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
          </tr>
          {employeesRows}
        </tbody>
      </table>
    );
  }
}
export default EmployeeList;
