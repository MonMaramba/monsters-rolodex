import React, { Component } from "react";

import { CardList } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box";
import "./App.css";

class App extends Component {
  constructor() {
    super(); // extends all functionality(like lifecycle methods, render, etc) of Component from react. Components sets the context of the this keyword to the class component
    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  }; // the arrow function automatically binds the function to the App class. No need to use bind through this.handleChange = this.handleChange.bind(this) in the constructor.

  render() {
    const { monsters, searchField } = this.state; // destructured way of declaring variables from this.state
    const filteredMonsters = monsters.filter((
      monster // creates new array to display
    ) => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={
            this.handleChange // calls class method defined above //event =>
            //this.setState({ searchField: event.target.value }) // setstate is an asynchronous function call, solution is to pass in a 2nd funciton callback
          }
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
