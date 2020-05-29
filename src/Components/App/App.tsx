import React, {
  ReactElement,
  useEffect,
  MouseEvent,
  SyntheticEvent,
  useState,
} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import { searchResult } from "../../types";
import ResultsPage from "../ResultsPage/ResultsPage";
import { apiCalls } from "../../apiCalls";

//state should be empty
//eventually state will hold the user's search term
//need another method in this function maybe that will be passed to search form

function App(): ReactElement {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const searchTerm = async (searchTerm: string) => {
    //needs to do a fetch call based on the search term and console log results
    setError(null);
    setIsLoading(true);
    // const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
    // const modifiedSearchTerm: string = searchTerm.split(" ").join("+");
    // const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=5`;

    // const data = await fetch(url)
    // let data = await apiCalls(searchTerm);
    apiCalls(searchTerm)
      .then((response) =>
        response.ok ? response.json() : setError(response.status)
      )
      .then((response) =>
        response ? setResults(response.Similar.Results) : null
      )
      .catch((err) => setError(err));
    // console.log(data)

    // if (data) setResults(data);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header />
      {error && (
        <h3 className="error">
          We're sorry, but there seems to have been an issue. Please refresh the
          page and try again. (Error code: {error})
        </h3>
      )}
      <Switch>
        <Route path="/search/:query"></Route>
        <Route exact path="/">
          <SearchForm searchTerm={searchTerm} />
        </Route>
      </Switch>
      {isLoading && <p>Finding matches...</p>}
      {results && <ResultsPage results={results} />}
    </div>
  );
}

export default App;
