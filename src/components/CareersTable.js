import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class CareersTable extends Component {

  render() {
    const careerRows = this.props.careers.map((career) => {
      const link = 'https://www.mynextmove.org/profile/summary/' + career.code;
      return (
        <tr>
          <td>
            <a href={link} target="_blank"><b>{career.title}</b></a>
            <ul>
              <li>Annual Median Salary<br/><b>${career.annualMedianSalary.toLocaleString()}</b></li>
              <li>Education Requirements<br/><b>{career.educationRequirements.join(", ")}</b></li>
            </ul>
          </td>
          <td>{career.savingsTimeline}</td>
        </tr>
      );
    });

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{width: "25%"}}>Career</th>
            {/* <th>Annual Median Salary</th>
            <th>Education Requirements</th> */}
            <th style={{width: "75%"}}>Savings Timeline</th>
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