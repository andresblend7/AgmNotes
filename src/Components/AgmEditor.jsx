
import { useEffect, useRef, useState } from 'react';
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


export const AgmEditor = ({ pageKey }) => {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);

    useEffect(() => {

        const initializeEditor = async () => {
            const savedData = localStorage.getItem(pageKey);

            if (editorInstance.current) {
                try {
                    await editorInstance.current.isReady;
                    editorInstance.current.destroy();
                } catch (e) {
                    console.error('ERROR editor cleanup', e);
                }
            }

            editorInstance.current = new EditorJS({
                holder: editorRef.current,
                tools: {
                    header: {
                        class: Header,
                        shortcut: 'CMD+SHIFT+H',
                        config: {
                            placeholder: 'Enter a header',
                            levels: [1, 2, 3, 4],
                            defaultLevel: 1,
                            allowAnchor: true,
                            anchorLength: 100,
                        },
                    },
                    alert: {
                        class: Alert,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+A',
                        config: {
                            alertTypes: [
                                'primary',
                                'secondary',
                                'info',
                                'success',
                                'warning',
                                'danger',
                                'light',
                                'dark',
                            ],
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
                    delimiter: Delimiter,
                    table: Table,
                    list: List,
                    image: SimpleImage,
                    code: Code,
                    codeBox: {
                        shortcut: 'CMD+SHIFT+C',
                        class: CodeBox,
                        config: {
                            themeName: 'atom-one-dark', // Optional
                            useDefaultTheme: 'dark', // Optional. This also determines the background color of the language select drop-down
                        },
                    },
                    nestedList: NestedList,
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                    },
                },
                autofocus: true,
                onChange: () => handleSave(pageKey),
                data: savedData ? JSON.parse(savedData) : {},
            });
        };

        initializeEditor();

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [pageKey]);

    const handleSave = (key) => {
        if (editorInstance.current) {

            if(key=='0'){
                alert('Agregué un título a la página')
                return;
            }

            editorInstance.current
                .save()
                .then((outputData) => {
                    console.log('Article data: ', outputData);
                    console.log('Saving:', key);
                    localStorage.setItem(key, JSON.stringify(outputData));
                })
                .catch((error) => {
                    console.log('Saving failed: ', error);
                });
        }
    };

    return <div id="editorjs" spellCheck='false' ref={editorRef} style={{ border: '0px solid gray' }}></div>;
};