import { useState, useEffect, useRef } from 'react'
import './App.css'
import { AgmEditor } from './Components/AgmEditor'

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [pageSelected, setpageSelected] = useState({name:'welcome' , id:-1});
  const [pages, setPages] = useState([]);

  const editableTitle = useRef(null);

  const addNewPage = function () {

    if (editableTitle.current) {
      setTimeout(() => {
        // Borrar el contenido del div
        editableTitle.current.innerHTML = '';
        // Enfocar el div
        editableTitle.current.focus();

        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(editableTitle, editableTitle.childNodes.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 150);
    }

    setpageSelected({name:'blank' , id:0});
  }

  const startsWithEmoji = (word) => {
    // Expresión regular para verificar si el primer carácter es un emoji
    const emojiRegex = /^\p{Emoji}/u;
    return emojiRegex.test(word);
  }


  const handleBlur = () => {
    let text = editableTitle.current.innerText;



    if (text.length < 3)
      return;
    
    text = (startsWithEmoji(text)) ? text : `🅰️ ${text}`;

    if (pages.some(x => x.name == text))
      return;

    const newPage = { 'id': uuidv4(), 'name': text }
    let newPages = [...pages, newPage];
    setPages(newPages);
    console.log({ newPages });
    editableTitle.current.innerHTML = text;

    localStorage.setItem('pages', JSON.stringify(newPages));
    setpageSelected(newPage.id);
  }
  
  const selectPage = (page)=>{
    setpageSelected(page);
  }


  useEffect(() => {
    console.log({ pageSelected });
    let actualPages = localStorage.getItem('pages');

    if (actualPages) {
      setPages(JSON.parse(actualPages));
    }

  }, [pageSelected]);


  return (
    <>
      <div className="sidebar">
        <div className="brand">
          {'<AGM/>'} Notes
        </div>
        <div className='btn-actions'>
          <span className="btn-add">
            My pages
            <span className="add-icon" onClick={addNewPage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
            </span>
          </span>
        </div>
        <ul className='ul-sidebar'>

          <li>
            🗓️ Monthly notes
            <ul>
              <li>Junio</li>
              <li>Julio</li>
              <li>Agosto</li>
              <li>Septiembre</li>
              <li>Octubre</li>
            </ul>
          </li>
          {

            pages && pages.map((page) => {
              return <li key={page.id} onClick={()=>{selectPage(page)}}>{page.name}</li>
            })

          }

        </ul>

      </div>

      <div className="content">
        <div className='page'>
          <h1 className="page-title" ref={editableTitle} onBlur={handleBlur} contentEditable='true' spellCheck='false' suppressContentEditableWarning={true}>
            {(pageSelected.name=='welcome' || pageSelected.name=='blank') ? '🏡 Bienvenido' : pageSelected.name}
          </h1>
          <AgmEditor pageKey={pageSelected.id}></AgmEditor>
        </div>
      </div>


    </>
  )
}

export default App
