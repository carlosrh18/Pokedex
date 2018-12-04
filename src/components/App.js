import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';
import axios from 'axios'
import Suggestions from './Suggestions'



class App extends Component {    //Esta clase representa a toda la aplicacion

constructor() {
    super();
    this.state = {
      pokemon: {},
      query: '',
      results: []
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  getInfo = () => {                            //Obtenemos el json con Axios para la barra de busqueda
   // console.log(`https://pokeapi.co/api/v2/pokemon/${this.state.query}`);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.query}`)
      .then(({ data }) => {
        const pokemon = new Pokemon(data);
        
        this.setState({ pokemon });
        this.setState({data})
        
        this.setState({
          results: data
      

        })
      })


  }

handleInputChange = () => {
  //console.log(this.search.value)
    this.setState({
      query: this.search.value.toLowerCase()    //Toma el valor del input y lo convierte a minusculas

    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        
          //alert('Esta funcionando');
          this.getInfo()
        
      } 
      else if (!this.state.query) {
      }      
    })
  }





handleOnClick(id) {
    fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`,{ mode: 'cors'})  //Obtenemos el json con fetch para el evento onclick
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);
        //console.log(pokemon);
        this.setState({ pokemon });
      })
      .catch(err => console.log(err));

      console.log(this.state.pokemon);
  }


 render() {           //Muestra los componentes de la aplicacion usando tag enclosures

    return (

     <div className="App">


         <form>
        <input 
          placeholder="Buscar Pokemon..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />

        <Suggestions results={this.state.results}/>
      </form>
        <PokeList handleOnClick={this.handleOnClick} />
        <DetailView pokemon={this.state.pokemon} />



      </div>
    );
  }
}

export default App;   //Exporta la aplicacion para hacerla visible