import { getSprings } from "./services/spring-service";

function App() {

  function getAllSprings(event){
    event.preventDefault();
    const springs = getSprings()
    console.log(springs)
  }

  return (
    <>
      <h1>My Frontend for the Spring Design</h1>
      <button onClick={getAllSprings}>Click!</button>
    </>
  );
}

export default App;
