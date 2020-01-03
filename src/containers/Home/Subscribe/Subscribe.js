import React from "react";

const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="subscribe-gird">
        <div className="subscribe-gird__content">
          <h2 className="heading-secondary subscribe__heading u-margin-bottom-medium ">
            Cập nhật khóa học
          </h2>
          <form className="subscribe__form">
            <input
              type="email"
              className="subscribe__input"
              placeholder="Email"
              required
              id="subcribe-email"
            />
            <label htmlFor="subcribe-email" className="subscribe__label">
              Email
            </label>
            <button className="my-button my-button-full subscribe__button">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
