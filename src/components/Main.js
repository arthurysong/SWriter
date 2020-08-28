import React from 'react'
import './Main.scss';
import MdEditor from 'react-markdown-editor-lite';
import Markdown from 'markdown-to-jsx';

const Main = () => {
    return <div className="main">
        <MdEditor 
            renderHTML={(text) => <Markdown >{text}</ Markdown>}/>
        {/* <MdEditor 
            value={editorText}
            renderHTML={(text) => <Markdown >{text}</ Markdown>} 
            onChange={({ html, text }) => {
                setEditorText(text)
                setFiles(produce(files, draft => { draft[fileIndex].content = text }))
            }}/> */}
    </div>
}

export default Main
