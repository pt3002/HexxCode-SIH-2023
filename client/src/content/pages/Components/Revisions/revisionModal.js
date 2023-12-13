import React from "react";
import "./diff.css";

function RevisionModal(props) {
  const rev = props.rev[0];

  let diffRef = React.createRef();

  return (
    <div className="diff-view">
      <div className="revision-diff">
        <ol ref={diffRef}>
          {rev.diffInfo.map((op) => {
            let opSymbol = " ";
            if (op.type === "insert") {
              opSymbol = "+";
            } else if (op.type === "delete") {
              opSymbol = "-";
            }
            return (
              <li className={op.type} key={`${op.origIdx}:${op.targetIdx}`}>
                <span className="op-symbol">{opSymbol}</span>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: op.data }}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default RevisionModal;
