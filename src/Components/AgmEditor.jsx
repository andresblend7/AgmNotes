
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Checklist from '@editorjs/checklist'
import Code from '@editorjs/code'
import NestedList from '@editorjs/nested-list';
import Header from 'editorjs-header-with-anchor';
import Alert from 'editorjs-alert';
import ToggleBlock from 'editorjs-toggle-block';
import Table from '@editorjs/table';

import CodeBox from '@bomdi/codebox';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';


export const AgmEditor = () => {


    const editorRef = useRef(null);
    const editorInstance = useRef(null);

    useEffect(() => {
        const savedData = localStorage.getItem('agm');

        editorInstance.current = new EditorJS({
            holder: editorRef.current,
            tools: {
                // header: Header,
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4],
                        defaultLevel: 1,
                        allowAnchor: true,
                        anchorLength: 100,
                    }
                },
                alert: {
                    class: Alert,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+A',
                    config: {
                        alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                        defaultType: 'primary',
                        messagePlaceholder: 'Enter something',
                    },
                },
                Marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                  },
                toggle: {
                    class: ToggleBlock,
                    inlineToolbar: true,
                },
                delimiter: {
                    class:Delimiter,
                    
                },
                table: Table,
                list: List,
                image: SimpleImage,
                code: Code,
                codeBox: {
                    shortcut: 'CMD+SHIFT+C',
                    class: CodeBox,
                    config: {
                        themeName: 'atom-one-dark', // Optional
                        useDefaultTheme: 'dark' // Optional. This also determines the background color of the language select drop-down
                    }
                },
                nestedList: NestedList,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
            },
            autofocus: true,
            onChange: handleSave,
            data: savedData ? JSON.parse(savedData) : {}
        });

        return () => {
            editorInstance.current.isReady
                .then(() => {
                    editorInstance.current.destroy();
                })
                .catch((e) => console.error('ERROR editor cleanup', e));
        };
    }, []);


    const handleSave = () => {
        editorInstance.current.save().then((outputData) => {
            console.log('Article data: ', outputData);
            localStorage.setItem('agm', JSON.stringify(outputData));
        }).catch((error) => {
            console.log('Saving failed: ', error);
        });
    };

    function highlightText(text) {
        // Regular expression to match text within square brackets
        const regex = /\[(.*?)\]/g;
        let newText = text.replace(regex, '<span class="highlight">$1</span>');
        return newText;
    }

    return (
        <div className='page'>
            <h1 className="page-title">
                🗒️ Título página
            </h1>
            <div id="editorjs" ref={editorRef} style={{ border: '0px solid gray' }}></div>
        </div>
    )
}
