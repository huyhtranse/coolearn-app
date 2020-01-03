import React, { useState } from "react";
import devices from "../../../assets/img/hhh.png";

import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";

const Info = () => {
  const [point, setPoint] = useState(false);
  return (
    <div className="info">
      <div className="info__content">
        <div className="info__content--user">
          <p>
            {!point ? (
              <CountUp end={25413} duration={2.25} separator=",">
                {({ countUpRef, start }) => (
                  <div>
                    <span ref={countUpRef} className="info__number" /> Học viên
                    <Waypoint onEnter={start} />
                  </div>
                )}
              </CountUp>
            ) : (
              <>
                <span className="info__number">25,413</span> Học viên
              </>
            )}
          </p>
          <p>
            {!point ? (
              <CountUp end={2154} duration={2.75} separator="">
                {({ countUpRef, start }) => (
                  <div>
                    <span
                      ref={countUpRef}
                      className="info__number info__number-2"
                    />{" "}
                    Khóa học
                    <Waypoint onEnter={start} />
                  </div>
                )}
              </CountUp>
            ) : (
              <>
                <span className="info__number info__number-2">2154</span> Khóa
                học
              </>
            )}
          </p>
          <p>
            {!point ? (
              <CountUp end={11523} duration={3} separator=",">
                {({ countUpRef, start }) => (
                  <div>
                    <span
                      ref={countUpRef}
                      className="info__number info__number-3"
                    />{" "}
                    Bài học
                    <Waypoint onEnter={start} />
                  </div>
                )}
              </CountUp>
            ) : (
              <>
                <span className="info__number info__number-3">11,523</span> Bài
                học
              </>
            )}
          </p>
        </div>
        <div className="info__content--top">
          <div className="info__content--phoneimg">
            <img src={devices} alt="hinh dien thoai" />
          </div>
          <div className="info__content--main-info">
            <div className="info__content--main-title">
              <span>Học mọi lúc & mọi nơi!</span>
              <p>
                Học ngay trên web.
                <br />
                Có mặt trên mọi nền tảng.
                <br />
                Có thể học bất kỳ nơi nào bạn muốn.
                <br />
                Đơn giản và tận hưởng niềm vui
              </p>
            </div>
          </div>
        </div>
      </div>
      <Waypoint
        onEnter={() => {
          setTimeout(() => {
            setPoint(true);
          }, 3000);
        }}
      />
    </div>
  );
};

export default Info;
