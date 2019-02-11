import React, { Component } from 'react';
import Employee from './Employee';

const halApiRoot = '/api';
const fetchHeaders = { headers: { 'Content-Type': 'application/hal+json' } };
const genericNetworkResponseNotOkMessage = 'Network response was not ok.';
const pageSize = 2;

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, employees: [] };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(halApiRoot, fetchHeaders)
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

          let res = employeesContainedLinkHref.split('{?page,size,sort}');
          let employeesLink = res[0];
          // TODO save employeesLink in state
          let pagedEmployeesUrl = employeesLink + '?size=' + pageSize;
          return fetch(pagedEmployeesUrl, fetchHeaders);
        } else {
          throw new Error(
            'HAL API root object may not be a Resource Object as it has no _links or contained employee resource links.'
          );
        }
      })
      .then(function(pagedEmployeesFetchResponse) {
        if (pagedEmployeesFetchResponse.ok) {
          return pagedEmployeesFetchResponse.json();
        }
        throw new Error(genericNetworkResponseNotOkMessage);
      })
      .then(pagedEmployeeResponseData => {
        console.log(pagedEmployeeResponseData);

        if (pagedEmployeeResponseData.page !== undefined) {
          // this can be used for validation and user feedback and driving logic:
          // {size: 2, totalElements: 5, totalPages: 3, number: 0}
          // the _links can be saved for fetching we need to
        }

        this.setState({
          employees: pagedEmployeeResponseData._embedded.employees,
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
