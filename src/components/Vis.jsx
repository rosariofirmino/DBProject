import React, {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import history from './history';
import LineSeries from "reaviz";
import Line from "reaviz";
import LineChart from "reaviz";
import Datatable from "./datatable";
import {timeFormatDefaultLocale} from 'd3-time-format';
timeFormatDefaultLocale({
    date        : '%d-%m-%Y',
});
require ("es6-promise").polyfill();
require ("isomorphic-fetch");
function Vis() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{
    fetch("http://localhost:3001/api")
      .then((result)=> result.json())
      .then((json) => setData(json));
  }, []);
  return (
<div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light"> Resulting Table: </h1>
              {data.tuples?.map((postDetail,index)=>(
                <div key={index}>
                <p>{postDetail.date}:{postDetail.measurement}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vis;
