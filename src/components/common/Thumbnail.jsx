import React from "react";

function Thumbnail({ type, element, history, onRemove, caption }) {
  const handleClick = (e) => {
    if (e.target.id === "image") history.push(`/${type}/${e.currentTarget.id}`);
  };

  return (
    <figure className="figure clickable" id={element._id} onClick={handleClick}>
      <div className="image-container">
        <img
          className="figure-img img-fluid rounded"
          id="image"
          src={element.image}
          alt={element.name}
          height="100"
          width="100"
        />
        {onRemove && (
          <div className="remove-top-right" onClick={() => onRemove(element)}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
        )}
      </div>
      <figcaption className="text-center">{element.name}</figcaption>
      <figcaption className="text-center">{caption}</figcaption>
    </figure>
  );
}

export default Thumbnail;
