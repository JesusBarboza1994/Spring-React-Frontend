import { Scatter } from "react-chartjs-2";
import { useState, useEffect } from "react";

export function Graph(values){
  const [chartdata, setChartdata] = useState({})
  // let datos = []
  const [data, setData] = useState([])
  console.log("valores", values)
  // for ( let i = 0; i< values.values.forces.length ; i++){
  //   datos.push({x: values.values.displacements[i], y: values.values.forces[i]})
    
  // }
  // setData(datos)
 
  

  useEffect(() => {
    console.log("datos almacenados",data)

    const chart = () =>{
      setChartdata({
        labels: "Data",
        datasets:[
          {
            label: "Funcion",
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 1)'
          }
        ]
      })
    }
    chart()
  
  },)
  
  return (
    <div>
      <Scatter
        data={chartdata}
        height={300}
        width={600}
        option={
          {maintainAspectRatio: true}
        }
      />
    </div>
  )

}
