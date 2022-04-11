import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import history from './history';

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Welcome to Mutual Fun!</h1>
            <p>
              Would you like to analyze Mutual Funds, ETFs, or both?
            </p>
            <Link to="/mutualfunds"><Button>
              Mutual Funds 
            </Button>
            </Link>
            <Link to="/etfs"><Button>
              ETFs
            </Button>
            </Link>
            <Link to="/both"><Button>
              Both
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
