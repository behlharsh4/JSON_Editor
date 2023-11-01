import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import "./styles.css";
import AutoCompleteWrapper from "./AutoCompleteWrapper";
import JSON from "./JSON";
import useFetchData from "./useFetch";

export default function App() {
  // const textRef = React.useRef();
  // const [code, setCode] = React.useState(`{
  //   "one": "function add(a, b) {}"
  // }`);

  // const { apiStatus } = useFetchData(
  //   "https://jsonplaceholder.typicode.com/todos/1"
  // );

  // const { isLoading, data, error } = apiStatus;

  // const handelChange = (e) => {
  //   let value = e.target.value;
  //   console.log(e.nativeEvent.data);
  //   try {
  //     if (e.nativeEvent.data === undefined) {
  //       value = JSON.stringify(JSON.parse(value), null, 2);
  //       console.log(value);
  //     }
  //   } catch (err) {
  //     console.dir(err);
  //     // console.log(value.substr(0, 120).split("\n").length);
  //   }

  //   setCode(value);
  // };
  return (
    <>
      <div>
        <h3>Auto</h3>
        <JSON
          data={{
            name: "John",
            age: 30,
            address: {
              street: "123 Main St",
              city: "Exampleville"
            },
            hobbies: ["Reading", "Coding", "Gardening"]
          }}
        />
        {/* <AutoCompleteWrapper list={{ $: ["one", "two"] }}>
          <CodeEditor
            value={code}
            // ref={textRef}
            language="json"
            placeholder="Please enter JS code."
            onChange={handelChange}
            onKeyUp={() => console.log("fire")}
            padding={15}
            style={{
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              fontSize: 12,
              lineHeight: "20px"
            }}
          />
        </AutoCompleteWrapper> */}
        {/* {isLoading ? "true" : <>{JSON.stringify(data)}</>} */}
      </div>
    </>
  );
}
