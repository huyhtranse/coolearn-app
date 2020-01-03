import React from "react";
import { Link } from "react-router-dom";

const Minimalist = () => {
  return (
    <>
      <div className="minimalist">
        <h2 className="minimalist__heading">
          Bạn muốn tham gia giảng dạy cùng chúng tôi!
        </h2>
        <div className="minimalist__link">
          <Link to="/404">Ứng Tuyển Ngay Hôm Nay</Link>
        </div>
      </div>
    </>
  );
};

export default Minimalist;
