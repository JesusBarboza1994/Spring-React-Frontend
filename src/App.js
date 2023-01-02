import { createSprings, getSprings } from "./services/spring-service";
import Input from "./components/Input";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Graph } from "./components/Graph-scatter";


const Form = styled.form`
  width: 500px;
`

function App() {
  const [spring, setSpring] = useState({})
  const [data, setData] = useState({
    "alambre": 0,
    "diam": 0,
    "vueltas": 0,
    "longitud": 0,
    "luz1": 0,
    "luz2": 0
  })
  let datos = [];

  function getAllSprings(event){
    event.preventDefault();
     getSprings().then(console.log)
    
  }

  function createSpring(event){
    event.preventDefault();
    createSprings(data).then((response)=>{
      setSpring(response)
    })
  }

  useEffect(() => {
    if(Object.keys(spring).length !== 0){
      for ( let i = 0; i< spring.forces.forces.length ; i++){
        datos.push({x: spring.forces.displacements[i], y: spring.forces.forces[i]})
      }
    }
    console.log("datos",datos)
  }, [spring])
  

  function onSetValue(event){
    event.preventDefault();
    const {name, value} = event.target
    setData({...data, [name]:value})
    console.log(data)
  }


  return (
    <>
      <h1>My Frontend for the Spring Design</h1>
      <Form onSubmit={createSpring}>
        <Input label="Alambre" type="number" id="alambre" name="alambre" onSetValue={onSetValue}/>
        <Input label="D. Externo" type="number" id="diam" name="diam" onSetValue={onSetValue}/>
        <Input label="Vueltas" type="number" id="vueltas" name="vueltas" onSetValue={onSetValue}/>
        <Input label="Longitud" type="number" id="longitud" name="longitud" onSetValue={onSetValue}/>
        <Input label="Luz 1" type="number" id="luz1" name="luz1" onSetValue={onSetValue}/>
        <Input label="Luz 2" type="number" id="luz2" name="luz2" onSetValue={onSetValue}/>
        <button>Create</button>
      </Form>
      <button onClick={getAllSprings}>Click!</button>
      { datos.length === 0 ? "" : <Graph values={datos}/> }   
    </>
  );
}

export default App;
