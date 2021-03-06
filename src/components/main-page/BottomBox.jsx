import React, { Fragment } from "react";
import Thumbnail from "../common/Thumbnail";

function BottomBox({ element, cocktails, type }) {
  return (
    <>
      {type === "cocktail" && (
        <>
          <h5 className="card-title mb-3">Preparation</h5>
          <ol>
            {element.preparation &&
              element.preparation.map((step) => (
                <li key={element.preparation.indexOf(step)}>{step}</li>
              ))}
          </ol>
        </>
      )}
      {type === "ingredient" && (
        <>
          <h5 className="card-title mb-3">
            Cocktails you can make with {element.name}
          </h5>
          {cocktails &&
            cocktails.map((cocktail) => (
              <Fragment key={cocktail._id}>
                <Thumbnail type="cocktails" item={cocktail} size="100" />
              </Fragment>
            ))}
        </>
      )}
    </>
  );
}

export default BottomBox;
