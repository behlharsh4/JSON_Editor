import React, { useEffect, useRef, useState } from "react";
import obj from "./data.json";

const JSONEditor = () => {
  const [json, setJson] = useState(JSON.stringify(obj, null, 2)); // JSON content
  const [jsonTracker, setJsonTracker] = useState([]);
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(31);
  const timeoutRef = useRef(null);
  useEffect(() => {
    let split = json.split("\n");
    split = split.map((jt) => {
      let highlightedJSON = jt
        .replace(/("\w+")\s*:/g, `<span class='key'>$1</span> <span>:</span>`)
        .replace(/("[^"]*")/g, `<span class='value string'>$1</span>`)

        .replace(
          /(\btrue\b|\bfalse\b)/g,
          `<span class='value boolean'>$1</span>`
        )
        .replace(/(\bnull\b)/g, `<span class='value null'>$1</span>`)
        .replace(/(\d+)/g, `<span class='value number'>$1</span>`)
        .replace(/{/g, `<span class='l-brace'>{</span>`)
        .replace(/}/g, `<span class='r-brace'>}</span>`)
        .replace(/\[/g, `<span class='l-square'>[</span>`)
        .replace(/]/g, `<span class='r-square'>]</span>`)
        .replace(
          /<span class='key'><span class='value string'>("\w+")\s*<\/span><\/span>/g,
          '<span class="key">$1</span>'
        );
      return highlightedJSON;
    });

    setJsonTracker(split);
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    // clearTimeout(timeoutRef.current);
    // timeoutRef.current = setTimeout(() => {
    let start = parseInt(e.target.scrollTop / 15);
    setFromIndex(start);
    setToIndex(start + 31);
    // }, 10);
  };

  const render = () => {
    return jsonTracker
      .slice(fromIndex, toIndex)
      .map((highlightedJSON, index) => (
        <div
          key={index}
          className="editorLine"
          id={`line-${index}`}
          style={{ top: (index + fromIndex) * 15 }}
          dangerouslySetInnerHTML={{ __html: highlightedJSON }}
        ></div>
      ));
  };

  const onKeyDown = (e) => {
    console.log(e.target);
  };

  return (
    <>
      <div className="json-editor-container" onScroll={handleScroll}>
        <pre
          className="json-editor"
          contentEditable={true}
          suppressContentEditableWarning={true}
          style={{ minHeight: jsonTracker.length * 15 }}
          onKeyDown={onKeyDown}
        >
          {render(fromIndex, toIndex)}
        </pre>
      </div>
      {fromIndex}, {toIndex}
    </>
  );
};

export default JSONEditor;
