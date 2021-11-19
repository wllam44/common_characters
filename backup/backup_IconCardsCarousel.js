/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect }  from 'react';
import IconCard from '../../components/cards/IconCard';
import { NavLink } from 'react-router-dom';
import GlideComponent from '../../components/carousel/GlideComponent';
import AppConfig from '../../constants/app-config.json';
import axios from 'axios';

const IconCardsCarousel = ({ className = 'icon-cards-row' }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `${AppConfig.cmsApiUrl}/v1/dashboard/list`;
    console.log(url);
    async function fetchData() {
      console.log('load');
    axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept' : 'application/json'
        }
      })
        .then((res) => {
            console.log(res)
        return res.data;
        })
        .then((data) => {
            console.log(data)
          setData([
            { 
              title: 'dashboards.shops', 
              icon: 'iconsminds-shop', 
              value: data.shopCount,
              url: '/app/tenants/shop',
            },
            { 
              title: 'dashboards.dinings', 
              icon: 'iconsminds-chopsticks', 
              value: data.diningCount,
              url: '/app/tenants/dining',
            },
            {
              title: 'dashboards.year-round-offer',
              icon: 'simple-icon-present',
              value: data.yearRoundOfferCount,
              url: '/app/rewards/year-round-offer',
            },
            {
              title: 'dashboards.coupon',
              icon: 'simple-icon-credit-card',
              value: data.couponCount,
              url: '/app/rewards/coupon',
            },
            {
              title: 'dashboards.exclusive-offer',
              icon: 'simple-icon-present',
              value: data.exclusiveOfferCount,
              url: '/app/rewards/exclusive-offer',
            },
            {
              title: 'dashboards.physical-gift',
              icon: 'simple-icon-present',
              value: data.physicalGiftCount,
              url: '/app/rewards/physical-gift',
            },
            {
              title: 'dashboards.free-parking',
              icon: 'simple-icon-directions',
              value: data.freeParkingCount,
              url: '/app/rewards/free-parking',
            },
          ])
        });
    }
    fetchData();
  },[]);

  useEffect(() => {
    let url = `http://localhost:3000/cms/v1/tag/testAPI`;
    console.log(url);
    async function fetchData() {
      console.log('load');
      axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept' : 'application/json',
            'Authorization' : 'developer'
        },
        withCredentials: true
      })
        .then((res) => {
          console.log(res)
          return res.data;
        })
        .then((data) => {
          console.log(data)
        });
    }
    fetchData();
  },[]);

  return (
    <div className={className}>
      {data.length >0 ? 
      <GlideComponent
        settings={{
          gap: 5,
          perView: 7,
          type: 'slider',
          breakpoints: {
            320: { perView: 3 },
            576: { perView: 4 },
            1600: { perView: 5 },
            1800: { perView: 7 },
          },
          hideNav: true,
          bound: true,
        }}
      >
        { 
        data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <NavLink to={`${item.url}`}>
                <IconCard {...item} className="mb-4" />
              </NavLink>
            </div>
          );
        })}
      </GlideComponent>: null}
    </div>
  );
};
export default IconCardsCarousel;
