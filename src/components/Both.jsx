import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import history from './history';

function Both() {
  return (
<div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Mutual Funds</h1>
            <p>
                Filter Mutual Fund By
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Both;
