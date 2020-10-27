import React, { useEffect, useState } from "react";
import AddItem from "../AddItem/AddItem";
import HomeButton from "../HomeButton/HomeButton";
import GenericItem from "../GenericItem/GenericItem";

export default function GenericList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (props.apiEndpoint) setItems(Object.values(props.apiEndpoint));
  }, [props.apiEndpoint]);

  return (
    <>
      <HomeButton />
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i}>
            <GenericItem
              apiEndpoint={props.apiEndpoint}
              contextPath={props.contextPath}
              dbUrl={props.dbUrl}
              label={item}
            />
          </div>
        ))
      ) : (
        <p>Nothing on the list yet</p>
      )}
      <hr />
      <AddItem
        contextPath={props.contextPath}
        dbUrl={props.dbUrl}
        stateLength={props.stateLength}
      />
    </>
  );
}
