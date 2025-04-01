import { Card, Button } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import { useState } from 'react';

const Home = () => {
  const banners1 = [
    { src: '/banners/banner_1.jpg', description: 'Mô tả cho Banner 1' },
    { src: '/banners/banner_2.jpg', description: 'Mô tả cho Banner 2' },
    { src: '/banners/banner_3.jpg', description: 'Mô tả cho Banner 3' },
  ];
  const banners2 = [
    { src: '/banners/banner_3.jpg', description: 'Mô tả cho Banner 1' },
    { src: '/banners/banner_1.jpg', description: 'Mô tả cho Banner 2' },
    { src: '/banners/banner_2.jpg', description: 'Mô tả cho Banner 3' },
  ];
  const banners3 = [
    { src: '/banners/banner_2.jpg', description: 'Mô tả cho Banner 1' },
    { src: '/banners/banner_3.jpg', description: 'Mô tả cho Banner 2' },
    { src: '/banners/banner_1.jpg', description: 'Mô tả cho Banner 3' },
  ];

  const notifications = [
    'Thông báo 1: Hệ thống đang hoạt động.',
    'Thông báo 2: Bảo trì vào cuối tuần.',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
  <div className="Home-menu">
    <div style={{ flex: 2, border: '1px solid #ccc', padding: '10px' }}>
      <h3>Hình ảnh hoạt động của Phòng Kỹ thuật - Công nghệ</h3>
      <div className="banner-slider1">
        <Slider {...settings}>
          {banners1.map((banner, index) => (
            <div key={index}>
              <img 
                src={banner.src} 
                alt={`Banner ${index + 1}`}
                className="banner-image1" // Sử dụng class mới
              />
              <p style={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}>
                {banner.description} {/* Mô tả cho banner */}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1, marginRight: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Thông báo chung</h3>
          {notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))}
        </div>
        <div style={{ flex: 2, border: '1px solid #ccc', padding: '10px' }}>
          <h3>Hoạt động trong tuần</h3>
          <div className="banner-slider2">
            <Slider {...settings}>
              {banners2.map((banner, index) => (
                <div key={index}>
                  <img 
                    src={banner.src} 
                    alt={`Banner ${index + 1}`}
                    className="banner-image2" // Sử dụng class mới
                  />
                  <p style={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
                    {banner.description} {/* Mô tả cho banner */}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div style={{ flex: 2, border: '1px solid #ccc', padding: '10px' }}>
          <h3>Lịch công tác, lịch trực</h3>
          <div className="banner-slider3">
            <Slider {...settings}>
              {banners3.map((banner, index) => (
                <div key={index}>
                  <img 
                    src={banner.src} 
                    alt={`Banner ${index + 1}`}
                    className="banner-image3" // Sử dụng class mới
                  />
                  <p style={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
                    {banner.description} {/* Mô tả cho banner */}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;