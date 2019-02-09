import React, { Component } from 'react';
import Employee from './Employee';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, employees: [] };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(data =>
        this.setState({
          employees: data._embedded.employees,
          isLoading: false
        })
      );
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
