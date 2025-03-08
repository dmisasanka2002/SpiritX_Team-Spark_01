import { useState } from 'react'
import './App.css'
import {Button} from 'antd'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p>click the button and you will be able to see increment the count</p>
         <Button type='primary' onClick={() => setCount(count+1)}> count ({count})</Button>
      </div>
    </>
  )
}

export default App
