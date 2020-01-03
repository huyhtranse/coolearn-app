import React from "react";
import ImgReplace from "../../../../assets/img/img_replace.PNG";

const TestimonialItem = props => {
  const addDefaultSrc = ev => {
    ev.target.src = ImgReplace;
  };

  return (
    <div className="testimonials__item">
      <div className={`testimonials__text ${props.animation}`}>
        <p>{props.text}</p>
      </div>
      <div className={`testimonials__info ${props.animationInfo}`}>
        <img
          src={props.picture}
          alt="testimonial__img"
          className="testimonials__img"
          onError={addDefaultSrc}
        />
        <p className="testimonials__user">{props.name}</p>
        <p className="testimonials__locate">{props.locate}</p>
      </div>
    </div>
  );
};

export default TestimonialItem;
