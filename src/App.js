import React, { useEffect, useState } from "react";
import './App.css';

// funzies!!!: set up pagination
// Todo: add styling, sticky search at bottom, highlight similar characters
// add logo to tab
// add title to page

function App() {

  let [query, querySet] = useState('')
  let [response, responseSet] = useState([])
  let [results, resultsSet] = useState([])


  const fetchData = (event) => {
    event.preventDefault();
    const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
    fetch(url)
      .then(response => response.json())
      .then(json => {
        responseSet(json)
      });
  }

  useEffect(() => {
    results = []
    response.filter((data) => {
      if (query == null) {
        results.push(data)
        resultsSet(results)
      }
      else if (data.city.toLowerCase().includes(query.toLowerCase()) || data.growth_from_2000_to_2013.toLowerCase().includes(query.toLowerCase()) || data.latitude.toString().includes(query) || data.longitude.toString().includes(query.toLowerCase()) || data.population.toLowerCase().includes(query.toLowerCase()) || data.rank.toLowerCase().includes(query.toLowerCase()) || data.state.toLowerCase().includes(query.toLowerCase())) {
        results.push(data)
        resultsSet(results)
      }
    }
    )
  },
    [response]
  )

  const handleInputChange = (e) => {
    querySet(e.target.value)
  }

  return (
    <div className="App">

      <form className="searchBar" onSubmit={fetchData}>
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

      <br />

      {results.length === 0 ?
        <p>no results</p>
        :
        <ul >
          {results.map((item, i) => (
            <div className="card" key={i}>
              <h3> {item.city}, {item.state}</h3>
              <li> Growth: {item.growth_from_2000_to_2013}</li>
              <li> Corrdinates ({item.latitude}, {item.longitude})</li>
              <li> Population: {item.population}</li>
              <li> Rank: {item.rank}</li>
              <br />
            </div>
          ))}

        </ul>

      }
    </div>
  );
}

export default App;
