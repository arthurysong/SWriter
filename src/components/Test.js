import React, { useState } from 'react'
import Editor from 'rich-markdown-editor';

const Test = () => {
    const [value, setValue] = useState("Blah blah blah");

    console.log(value);
    return <div>
        <Editor defaultValue={"meow"} value={value} />
        <button onClick={() => setValue("")}>Button 1</button>
        <button onClick={() => setValue("Rawr")}>Button 2</button>
    </div>
}

export default Test
