import React, { Fragment, useContext } from "react";
import { Form } from "react-bootstrap";

import AddOrRemoveButton from "../common/AddOrRemoveButton";
import BarContext from "../../contexts/barContext";
import Thumbnail from "../common/Thumbnail";
import Star from "../common/Star";

function TopBox({
  areThereAlternatives,
  components,
  element,
  missingCount,
  type,
}) {
  const { setUseMyBar, useMyBar } = useContext(BarContext);

  return (
    <>
      {type === "cocktail" && (
        <>
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{element.name}</h5>
            <h5>
              <Star cocktail={element} />
            </h5>
          </div>
          <p className="card-text mb-2">
            <small className="text-muted">
              {missingCount === 0
                ? "You have all the ingredients in My Bar"
                : `Missing ${missingCount} from My Bar`}
            </small>
          </p>
          {areThereAlternatives && (
            <Form.Check
              id="useMyBar"
              type="checkbox"
              label="Replace ingredients with My Bar"
              onChange={() => setUseMyBar(!useMyBar)}
              checked={useMyBar}
            />
          )}
          <div className="ingredients">
            <p className="card-text my-2">Ingredients:</p>
            <div className="row">
              {components &&
                components.map((comp) => (
                  <Fragment key={comp.ingredient._id}>
                    <Thumbnail
                      item={comp.ingredient}
                      measure={comp.measure}
                      missing={comp.missing}
                      type="ingredients"
                      size="70"
                    />
                  </Fragment>
                ))}
            </div>
          </div>
        </>
      )}
      {type === "ingredient" && (
        <>
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{element.name}</h5>
            <AddOrRemoveButton ingredient={element} />
          </div>
          <p className="card-text mb-3">
            <small className="text-muted">{element.category}</small>
          </p>
          {element.alternatives && element.alternatives.length > 0 && (
            <>
              <div className="alternatives">
                <p className="card-text mb-2">You can replace it with:</p>
                {element.alternatives.map((ing) => (
                  <Fragment key={ing._id}>
                    <Thumbnail item={ing} type="ingredients" />
                  </Fragment>
                ))}
              </div>
            </>
          )}
          {element.alternatives && element.alternatives.length === 0 && (
            <p className="card-text">
              There are no replacements for this ingredient. It's one of a kind!
            </p>
          )}
        </>
      )}
    </>
  );
}

export default TopBox;
