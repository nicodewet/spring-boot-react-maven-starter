import React, { Component } from 'react';
import Employee from './Employee';
import FetchService from './hal/FetchService';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, employees: [] };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const fetchedEmployees = await FetchService.getEmployeesFromHalApi();
      this.setState({
        employees: fetchedEmployees,
        isLoading: false
      });
    } catch (error) {
      // not good enough to just log errors
      console.log(error);
    }
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
