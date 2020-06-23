import React from "react";
import IngredientItem from "./IngredientItem";

function IngredientCategory({ bar, title, items, onAddRemove, history }) {
  return (
    <div className="category mb-3">
      <h4 className="category-title mb-3">{title}</h4>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
        {items.map((ing) => (
          <div key={ing._id} className="col mb-4">
            <IngredientItem
              bar={bar}
              ing={ing}
              history={history}
              onAddRemove={onAddRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default IngredientCategory;