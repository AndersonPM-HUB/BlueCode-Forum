import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import imagenes from '../../media/carrusel'; 
import Imagenes from '../imagenes/imagenes';

export default function Carrusel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ imagenes.imagen1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imagenes.imagen2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imagenes.imagen3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
