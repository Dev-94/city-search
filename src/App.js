import React, { useEffect, useState } from "react";
import './App.css';

// Issue: results only show last orbject in array of objects recieved as response
// Issue: submit has to be clicked twice to show results, first click is to fetch data

function App() {

  let [query, querySet] = useState('')
  let [results, resultsSet] = useState([])
  let [response, responseSet] = useState([])


  const fetchData = (event) => {
    event.preventDefault();
    const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
    fetch(url)
      .then(response => response.json())
      .then(json => {
        responseSet(json)
      });
    response.filter((data) => {
      if (query == null) {
        console.log(query, data)
        resultsSet(data)
      }
      else if (data.city.toLowerCase().includes(query.toLowerCase())) {
        console.log(query, data)
        resultsSet(data)
      }

    })
  }

  const handleInputChange = (e) => {
    querySet(e.target.value)
  }

  return (
    <div className="App">

      <form onSubmit={fetchData}>
        <label>
          query:
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h4>search results for "{query}"</h4>
      <hr />

      search results:
      <br />

      <li> {results.city} </li>
      <li> {results.growth_from_2000_to_2013}</li>
      <li> {results.latitude}</li>
      <li> {results.longitude}</li>
      <li> {results.population}</li>
      <li> {results.rank}</li>
      <li> {results.state}</li>

    </div>
  );
}

export default App;
