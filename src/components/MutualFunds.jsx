import React from "react";
import {DropdownButton, Dropdown, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import history from './history';

function MutualFunds() {
  return (
<div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Mutual Fund</h1>
            <DropdownButton id="dropdown-basic-button" title="Filter Mutual Fund By">
              <Dropdown.Item eventKey="1">Fund Symbol</Dropdown.Item>
              <Dropdown.Item eventKey="2">Region</Dropdown.Item>
              <Dropdown.Item eventKey="3">Fund Long Name</Dropdown.Item>
              <Dropdown.Item eventKey="4">Fund Family</Dropdown.Item>
            </DropdownButton>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email"/>
              </Form.Group>
              </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MutualFunds;
