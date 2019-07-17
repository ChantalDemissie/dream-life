import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class CareersTable extends Component {

  render() {
    const careerRows = this.props.careers.map((career) => {
      return (
        <tr>
          <td>{career.title}</td>
          <td>${career.annualMedianSalary.toLocaleString()}</td>
          <td>{career.savingsTimeline}</td>
        </tr>
      );
    });

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Career</th>
            <th>Annual Median Salary</th>
            <th>Savings Timeline Chart</th>
          </tr>
        </thead>
        <tbody>
          {careerRows}
        </tbody>
      </Table>
    );
  }

}

export default CareersTable;