import { createSprings, getSprings } from "./services/spring-service";
import Input from "./components/Input";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MyResponsiveScatterPlot } from "./scatter";
import * as tf from '@tensorflow/tfjs'
import { input } from "@tensorflow/tfjs";

const Form = styled.form`
  width: 500px;
`

function App() {
  const [spring, setSpring] = useState(null)
  const [points, setPoints] = useState([{
    "id":"Forces",
    "data":[]
  }])

  

  async function predict(){
    console.log("inicio de carga...")
    const model = await tf.loadLayersModel('model.json');
    // Hacer una predicción
    const inputTensor = tf.tensor2d([[20, 167, 0, 0]]);
    const outputTensor = model.predict(inputTensor);
    const prediction = outputTensor.dataSync()[0];
    console.log(prediction)

  // fetch('/prueba.json')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));
 }

  const [data, setData] = useState({
    "alambre": 0,
    "diam": 0,
    "vueltas": 0,
    "longitud": 0,
    "luz1": 0,
    "luz2": 0,
    "diam_int1":0,
    "diam_int2":0,
    "extremo1": "",
    "extremo2": "",
    "vuelta_red1":0,
    "vuelta_red2":0,
    "grado":2
  })

  function getAllSprings(event){
    event.preventDefault();
     getSprings().then()
    
  }

  function createSpring(event){
    event.preventDefault();
    createSprings(data).then((response)=>{
      setSpring(response)
      console.log(response)
    })
  }

  useEffect(() => {
    let datos = []
    if (spring) {
      spring.forces[0].displacements.forEach((point, index) =>{
        datos.push({"x":parseFloat(point), "y":parseFloat(spring.forces[0].forces[index])} )
      })
    }
    setPoints([{
      "id":"Forces",
      "data":datos
    }])
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
        <Input label="Alambre" type="decimal" id="alambre" name="alambre" onSetValue={onSetValue}/>
        <Input label="D. Externo" type="decimal" id="diam" name="diam" onSetValue={onSetValue}/>
        <Input label="Vueltas" type="decimal" id="vueltas" name="vueltas" onSetValue={onSetValue}/>
        <Input label="Longitud" type="decimal" id="longitud" name="longitud" onSetValue={onSetValue}/>
        <Input label="Luz 1" type="decimal" id="luz1" name="luz1" onSetValue={onSetValue}/>
        <Input label="Luz 2" type="decimal" id="luz2" name="luz2" onSetValue={onSetValue}/>
        <Input label="Diametro interior 1" type="decimal" id="diam_int1" name="diam_int1" onSetValue={onSetValue}/>
        <Input label="Diametro interior 2" type="decimal" id="diam_int2" name="diam_int2" onSetValue={onSetValue}/>
        <Input label="Extremo 1" type="text" id="extremo1" name="extremo1" onSetValue={onSetValue}/>
        <Input label="Extremo 2" type="text" id="extremo2" name="extremo2" onSetValue={onSetValue}/>
        <Input label="Vuelta reducida 1" type="decimal" id="vuelta_red1" name="vuelta_red1" onSetValue={onSetValue}/>
        <Input label="Vuelta reducida 2" type="decimal" id="vuelta_red2" name="vuelta_red2" onSetValue={onSetValue}/>
        <Input label="Grado" type="number" id="grado" name="grado" onSetValue={onSetValue}/>
        <button>Create</button>
      </Form>
      <button onClick={console.log(points)}>Click!</button>
      { 
        points[0].data.length !== 0 ?
          <div style={{height:"700px", width:"100%"}}>
            <MyResponsiveScatterPlot data={points}/>        
          </div>
        :
        null
      }
      <button onClick={predict}>Predict</button>
    </>
  );
}

export default App;
