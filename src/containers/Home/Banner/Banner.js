import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";

const Banner = () => {
  const [point, setPoint] = useState(false);

  return (
    <div className="ban">
      <div className="banner__icon">
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="banner__icon--playstore"></div>
        </a>
        <a
          href="https://itunes.apple.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="banner__icon--ios"></div>
        </a>
        <Link to="learnonweb">
          <div className="banner__icon--web"></div>
        </Link>
      </div>

      <div className="ban__1">
        <hr />
        <h2>Các gói ưu đãi</h2>
        <div className="banner">
          <div className="banner__item">
            <div className="banner__item__side banner__item__side--front">
              <div className="banner__item__picture banner__item__picture--1">
                &nbsp;
              </div>

              <h4 className="banner__item__heading">
                <span className=" banner__item__heading-span banner__item__heading-span--1">
                  Gói Sơ Cấp
                </span>
              </h4>

              <div className="banner__item__details">
                <ul>
                  <li>3 tháng</li>
                  <li>Tối đa 20 người</li>
                  <li>2 khóa học</li>
                </ul>
              </div>
            </div>

            <div
              className="banner__item__side 
            banner__item__side--back
            banner__item__side--back-1"
            >
              <div className="banner__item__cta">
                <div className="banner__item__price-box">
                  <p className="banner__item__price-only">Chỉ với</p>
                  <p className="banner__item__price-value">10 triệu đồng</p>
                </div>
                <Link to="signinnow" className="banner__item__btn">
                  Đăng ký ngay!
                </Link>
              </div>
            </div>
          </div>

          <div
            className={
              point ? "banner__item banner__item__animation" : "banner__item"
            }
          >
            <div className="banner__item__side banner__item__side--front">
              <div className="banner__item__picture banner__item__picture--2">
                &nbsp;
              </div>

              <h4 className="banner__item__heading">
                <span className=" banner__item__heading-span banner__item__heading-span--2">
                  Gói V.I.P
                </span>
              </h4>
              <Waypoint onEnter={() => setPoint(true)}>
                <div className="banner__item__details">
                  <ul>
                    <li>7 tháng</li>
                    <li>Tối đa 40 người</li>
                    <li>6 khóa học</li>
                  </ul>
                </div>
              </Waypoint>
            </div>

            <div
              className="banner__item__side
              banner__item__side--back banner__item__side--back-2"
            >
              <div className="banner__item__cta">
                <div className="banner__item__price-box">
                  <p className="banner__item__price-only">Chỉ với</p>
                  <p className="banner__item__price-value">30 triệu đồng</p>
                </div>
                <Link to="signinnow" className="banner__item__btn">
                  Đăng ký ngay!
                </Link>
              </div>
            </div>
          </div>

          <div className="banner__item">
            <div className="banner__item__side banner__item__side--front">
              <div className="banner__item__picture banner__item__picture--3">
                &nbsp;
              </div>

              <h4 className="banner__item__heading">
                <span className=" banner__item__heading-span banner__item__heading-span--3">
                  Gói Trung Cấp
                </span>
              </h4>

              <div className="banner__item__details">
                <ul>
                  <li>5 tháng</li>
                  <li>Tối đa 30 người</li>
                  <li>2 khóa học</li>
                </ul>
              </div>
            </div>

            <div
              className="banner__item__side 
            banner__item__side--back banner__item__side--back-3"
            >
              <div className="banner__item__cta">
                <div className="banner__item__price-box">
                  <p className="banner__item__price-only">Chỉ với</p>
                  <p className="banner__item__price-value">20 triệu đồng</p>
                </div>
                <Link to="signinnow" className="banner__item__btn">
                  Đăng ký ngay!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
