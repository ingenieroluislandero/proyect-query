import React, { Component } from 'react';
import uid from 'uid';
import Plotly from 'plotly.js';
const para =[];
const valor =[];
class App extends Component{

    constructor() {
        super();
        this.state = {
          departamento: '',
          edad: '',
          sexo:'',
           parametros:[],
          info: []
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.findInfo = this.findInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClean = this.handleClean.bind(this)
        
       
      }
      handleClean(){
        document.getElementById("dep").value = "";
        document.getElementById("edad").value = "";
      }
     
      handleClick(){
       console.log("funciona")
       fetch(`/api/info/${this.state.departamento}` , {
        method: 'POST',
        body: JSON.stringify({
          departamento: this.state.departamento
          }),
        headers: {
         'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
          //console.log(data)
          this.setState({parametros: data});
          console.log(data);
          
         data.map(data =>{
           para.push(data.arma_empleada);
           valor.push(parseInt(data.COUNT_arma_empleada));
         })
          const datos = [{
            x: para,
            y: valor,
            type: "linear"
          }];
          Plotly.newPlot("grafico",datos);
          //console.log(info.arma_empleada)
          this.setState({departamento: '', edad: '', sexo: ''});
          
        });
       
       
      
      }

      handleChange(e) {
        console.log(e.target.value)
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      }
     
    findInfo(e){
      e.preventDefault();
    if(this.state.departamento){
      
      fetch('/api/info' , {
        method: 'POST',
        body: JSON.stringify({
          departamento: this.state.departamento,
          edad: this.state.edad,
          sexo: this.state.sexo
        }),
        headers: {
         'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
          //console.log(data)
          this.setState({info: data});
          this.handleClean()
         //console.log(info.arma_empleada)
         
          this.setState({ edad: '', sexo: ''});
          
        });
    }
    }


    render(){
        return(
            <div>
             
                <div className="container">
                    <div className="row">
                        <div className="col s6">
                          <div className="card">
                            <div className="card-content">
                            <form onSubmit={this.findInfo}>
                                <div className="row">
                                
                                  <div className="input-field col s12">
                                      <input id="dep" name="departamento" onChange={this.handleChange} type="text" placeholder="departamento" required/>
                                   </div>
                                   <div className="input-field col s12">
                                      <input id="edad" name="edad"  onChange={this.handleChange} type="number" max="120" min="0" placeholder="Edad" required/>
                                   </div>
                                   <div>
                                   <p>
                                      <label>
                                        <input name="sexo" checked={this.state.sexo === "MASCULINO"} value="MASCULINO" type="radio" onChange={this.handleChange} />
                                        <span>MASCULINO</span>
                                      </label>
                                    </p>
                                    <p>
                                      <label>
                                        <input name="sexo" checked={this.state.sexo === "FEMENINO"} value="FEMENINO" type="radio" onChange={this.handleChange} />
                                        <span>FEMENINO</span>
                                      </label>
                                    </p>
                                   </div>

                                    <button type="submit" className="btn light-blue darken-4" style={{margin: '4px'}}>
                                     Buscar
                                   </button>
                                </div>
                            </form>
                            
                            </div>
                            </div>
                            <div className="card">
                                <div className="card-content">
                                  <div className="row">
                                      
                                      <button  onClick={this.handleClick} className="btn light-blue darken-4" style={{margin: '4px'}}>
                                        ver Graficos</button>
                                  </div>
                                  
                                        <div id="grafico" className="card">
                                          

                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col s6">
                        <table>
                          <thead>
                            <tr>
                              <th>departamento</th>
                              <th>municipio</th>
                              <th>arma_empleada</th>
                              <th>edad</th>
                              <th>sexo</th>
                              <th>estado</th>
                              <th>cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                              {
                                this.state.info.map(info => {
                                  return(
                                    <tr key={uid(20)}>
                                      <td>{info.departamento}</td>
                                      <td>{info.municipio}</td>
                                      <td>{info.arma_empleada}</td>
                                      <td>{info.edad}</td>
                                      <td>{info.sexo}</td>
                                      <td>{info.estado_civil}</td>
                                      <td>{info.cantidad}</td>
                                    </tr>
                                  )
                                })
                              }
                          </tbody>
                        </table>
                        </div>

                    </div>

                </div>

            </div>
        )
    }

}
export default App;