import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class CareersTable extends Component {

  render() {
    const careerRows = this.props.careers.map((career) => {
      const link = 'https://www.mynextmove.org/profile/summary/' + career.code;
      return (
        <tr>
          <td><a href={link} target="_blank"> {career.title}</a></td>
          <td>${career.annualMedianSalary.toLocaleString()}</td>
          <td>{career.educationRequirements.join(", ")}</td>
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
            <th>Education Requirements</th>
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