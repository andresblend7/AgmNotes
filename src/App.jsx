import { useState } from 'react'
import './App.css'
import { AgmEditor } from './Components/AgmEditor'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="sidebar">
        <div className="brand">
          {'<AGM/>'} Notes
        </div>
        <ul className='ul-sidebar'>
          <li>📱 Nequi</li>
          <li>
            🗓️ Personal tasks
            <ul>
              <li>Junio</li>
              <li>Julio</li>
              <li>Agosto</li>
            </ul>
          </li>
          <li>🟨 Banitsmo</li>
          <li>🏦 Modulares AVAL</li>
          <li>💸 Facturación</li>
        </ul>
      </div>
      <div className="content">
        <AgmEditor></AgmEditor>
      </div>


    </>
  )
}

export default App
