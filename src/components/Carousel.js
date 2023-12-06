import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const divStyle = {
  position: "relative",
  height: "400px",
  width: "100%",
  overflow: "hidden",
  cursor: "pointer",
};

const spanStyle = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  background: "rgba(0, 0, 0, 0.8)",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "10px",
  textAlign: "center",
  color: "white",
  zIndex: "999",
};

const Carousel = ({ data }) => {
  function handleClick(url) {
    window.open(url, "_blank");
  }

  const slideProperties = {
    duration: 3000,
    transitionDuration: 500,
  };

  return (
    <div>
      {data && data.length > 0 && (
        <Slide {...slideProperties}>
          {data.map((news, index) => {
            if (news.urlToImage) {
              return (
                <div key={index} onClick={() => handleClick(news.url)}>
                  <div
                    style={{
                      ...divStyle,
                      backgroundImage: `url(${news.urlToImage})`,
                    }}
                  >
                    <span style={spanStyle}> {news.title} </span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </Slide>
      )}
    </div>
  );
};

export default Carousel;
