import React from "react";
import {DropdownButton, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import history from './history';

function ETFs() {
  return (
<div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">ETF</h1>
            <DropdownButton id="dropdown-basic-button" title="Filter ETF By">
              <Dropdown.Item eventKey="1">Fund Symbol</Dropdown.Item>
              <Dropdown.Item eventKey="2">Region</Dropdown.Item>
              <Dropdown.Item eventKey="3">Fund Long Name</Dropdown.Item>
              <Dropdown.Item eventKey="4">Fund Family</Dropdown.Item>
              <Dropdown.Item eventKey="5">Exchange Code</Dropdown.Item>
              <Dropdown.Item eventKey="6">Exchange Name</Dropdown.Item>
            </DropdownButton>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ETFs;
