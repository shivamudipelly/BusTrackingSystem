import React from 'react';
import { Link } from 'react-router-dom';
import '../css/bus.css';
import imageUrl from '../images/bus.jpeg';
const Card = ({ imgSrc, routeNo }) => {
  return (
    <div className="card">
      <img src={imgSrc} alt="Route" style={{ width: '100%' }} />
      <div className="contain">
        <h4><b>Route {routeNo}</b></h4>
        <Link className='link-button' to={`/user/map/${routeNo}`} >Track Location</Link>
      </div>
    </div>
  );
}


export default function Bus() {



  const cardsData = [
    { imgSrc: imageUrl, routeNo: 1 },
    { imgSrc: imageUrl, routeNo: 2 },
    { imgSrc: imageUrl, routeNo: 3 },
    { imgSrc: imageUrl, routeNo: 4 },
    { imgSrc: imageUrl, routeNo: 5 },
    { imgSrc: imageUrl, routeNo: 6 },
    { imgSrc: imageUrl, routeNo: 7 },
    { imgSrc: imageUrl, routeNo: 8 },
    { imgSrc: imageUrl, routeNo: 9 },
    { imgSrc: imageUrl, routeNo: 10 }
  ];


  return (
    <div className='bus-container'>
      {cardsData.map((card, index) => (
        <Card
          key={index}
          imgSrc={card.imgSrc}
          routeNo={card.routeNo}
        />
      ))}
    </div>
  )
}


