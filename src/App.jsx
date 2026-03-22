import { useEffect, useState } from 'react'
import './App.css'

const nameList = ["John", "Doe"]

const John = () => {
  return <p>John</p>
}

const Doe = () => {
  return <p>Doe</p>
}

function App() {
  // Event Handler
  // const handlingClick = (params) => {
  //   alert(params)
  // }

  // return (
  //   <>
  //     <h1>Counter: 0</h1>
  //     <button onClick={() => handlingClick("Hallo Guys")}>Click Me</button>
  //   </>
  // )

  // State
  const [counter, setCounter] = useState(0)
  const [counter2, setCounter2] = useState(0)
  const handlingClick = () => {
    setCounter(counter + 1)
  }
  const handlingClick2 = () => {
    setCounter2(counter2 + 1)
  }

  useEffect(() => {
    console.log("Component App Mounted")
    return () => {
      console.log("Component App Unmounted")
    }
  }, [])

  useEffect(() => {
    console.log("Counter 1 updated:", counter)
  }, [counter])

  useEffect(() => {
    console.log("Counter 2 updated:", counter2)
  }, [counter2])

  return (
    <>
      {/* Conditional Rendering */}
      <h1>Counter: {counter} {counter % 2 ? <John /> : <Doe />}</h1>
      <button onClick={handlingClick}>Click Me</button>

      <h1>Counter: {counter2} {counter2 % 2 ? <John /> : <Doe />}</h1>
      <button onClick={handlingClick2}>Click Me</button>

      {/* List Rendering */}
      <h1>Name List</h1>
      {
        nameList.map((name) => (
          <p>{name}</p>
        ))
      }
    </>
  )
}

export default App
