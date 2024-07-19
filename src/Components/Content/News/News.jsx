import React from 'react';
import './News.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const News = () => {
    const navigate = useNavigate();
    // const Data = [
    //     {
    //         id: "1",
    //         image: "https://wallpapers.com/images/hd/diamonds-background-9wzbbafui52z97mp.jpg",
    //         text: "BỘ SƯU TẬP NHẪN KIM CƯƠNG",
    //         description: "Đẳng cấp & Tinh tế đến từng chi tiết"
    //     },
    //     {
    //         id: "2",
    //         image: "https://wallpapers.com/images/hd/diamonds-background-9wzbbafui52z97mp.jpg",
    //         text: "KIM CƯƠNG GIA",
    //         description: "Kim cương thiên nhiên, nhập khẩu chính ngạch"
    //     }
    // ]
    return (
    <>
    <div className='news-title'>
        <h1>Dịch vụ khách hàng</h1>
    </div>
    <div className="news">
        <div className="news-image">
            <img src={'https://wallpapers.com/images/hd/diamonds-background-9wzbbafui52z97mp.jpg'} alt="news" />
        </div>
        <div className="news-text">
            <h2>BỘ SƯU TẬP NHẪN KIM CƯƠNG</h2>
            <p>Đẳng cấp & Tinh tế đến từng chi tiết</p>
            <button onClick={() => navigate(`Service1`)} className="news-button">THAM KHẢO GIÁ</button>
        </div>
    </div>
    <div className="news">
        <div className="news-image">
            <img src={'https://wallpapers.com/images/hd/diamonds-background-9wzbbafui52z97mp.jpg'} alt="news" />
        </div>
        <div className="news-text">
            <h2>KIM CƯƠNG GIA</h2>
            <p>Kim cương thiên nhiên, nhập khẩu chính ngạch</p>
            <button onClick={() => navigate(`Service2`)} className="news-button">THAM KHẢO GIÁ</button>
        </div>
    </div>
    </>
  );
};

export default News;
