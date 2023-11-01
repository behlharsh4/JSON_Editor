import React, { useEffect, useState } from "react";
import AutoCompleteModal from "./AutoCompleteModal";

const getCaretCoordinates = (element) => {
  const valueString = element.value.substr(0, element.selectionStart);
  const lastLine = valueString.split("\n").pop();

  const pre = document.createElement("pre");
  pre.innerText = valueString;

  const span = document.createElement("span");
  span.innerText = lastLine;

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(pre);
  body.appendChild(span);

  const lineHeight = (pre.getBoundingClientRect().height || 16) + 10;
  const left = span.getBoundingClientRect().width + 25;
  const top = lineHeight - element.scrollTop;

  window.requestAnimationFrame(() => {
    body.removeChild(pre);
    body.removeChild(span);
  });

  return {
    top,
    left
  };
};

const AutoCompleteWrapper = ({ children, list, className, style }) => {
  const [autoCompleteState, setAutoCompleteState] = useState({
    status: false,
    value: "",
    style: {},
    list: []
  });

  const [selectorList, setSelectorList] = useState({});

  useEffect(() => {
    let obj = {};
    Object.keys(list).forEach((key) => {
      obj[key.at(-1)] = {
        endsWith: key.slice(0, -1),
        list: list[key]
      };
    });
    setSelectorList(obj);
  }, [list]);

  const checkKey = (keyPressed, value) => {
    const selector = selectorList[keyPressed];
    if (selector && (!selector.endsWith || value.endsWith(selector.endsWith))) {
      return selector.list;
    }
    return false;
  };

  const onBlur = () => {
    setAutoCompleteState({
      status: false,
      value: "",
      style: {}
    });
  };

  const onKeyDown = (e) => {
    let acValue = {
      status: false,
      value: "",
      style: {}
    };
    let list = checkKey(e.key, e.target.value);

    if (list && list.length > 0) {
      acValue.status = true;
      acValue.value = e;
      acValue.stringValue =
        e.target.value.slice(0, e.target.selectionStart) +
        e.key +
        e.target.value.slice(e.target.selectionStart);
      acValue.style = getCaretCoordinates(e.target);
      acValue.position = e.target.selectionStart + 1;
      acValue.list = list;
    }
    setAutoCompleteState(acValue);
  };

  const onKeyUp = (e) => {
    let acValue = {};
    let list;
    let split;
    let startPos = e.target.selectionStart;
    let valueStr = e.target.value.slice(0, startPos);
    let delimiter = "";
    if (valueStr.includes("this.") || valueStr.includes("$")) {
      if (valueStr.lastIndexOf("this.") > valueStr.lastIndexOf("$")) {
        delimiter = ".";
      } else {
        delimiter = "$";
      }
      split = valueStr.split(delimiter).at(-1);

      if (split) {
        try {
          list = checkKey(delimiter, delimiter === "." ? "this" : "");
          list = list.filter((li) =>
            li.toLowerCase().includes(split.toLowerCase())
          );
        } catch {}
      }
    }

    if (list && list.length > 0) {
      let endPos = startPos + split.length - 1;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Check if the previous character is not the delimiter
        if (startPos > 0 && e.target.value[startPos - 1] !== delimiter) {
          // Do not update autoCompleteState
          return;
        }
      }
      acValue.status = true;
      acValue.value = e;
      acValue.stringValue =
        e.target.value.substring(0, startPos - split.length) +
        e.target.value.substring(endPos - split.length + 1);
      acValue.style = getCaretCoordinates(e.target);
      acValue.position = e.target.selectionStart - split.length;
      acValue.list = list;
      setAutoCompleteState(acValue);
    }
  };

  const clickHandler = (selected, state) => {
    let e = state.value;
    let value = state.stringValue;
    let valueString =
      value.substring(0, state.position) +
      selected +
      value.substring(state.position);
    e.target.value = valueString;
    children.props.onChange(e, true);
    let position = state.position + selected.length;
    setTimeout(() => {
      e.target.focus();
      e.target.setSelectionRange(position, position);
    }, 1);
  };

  return (
    <div className={`AutoCompleteWrapper ${className}`} style={style}>
      {React.cloneElement(children, {
        onBlur: onBlur,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp
      })}
      {autoCompleteState.status ? (
        <AutoCompleteModal
          list={autoCompleteState.list || []}
          onClick={clickHandler}
          state={autoCompleteState}
        />
      ) : null}
    </div>
  );
};

export default AutoCompleteWrapper;
