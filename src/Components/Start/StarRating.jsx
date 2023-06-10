import React from 'react';

function StarRating({ point }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= point) {
        stars.push(<span key={i} className="yellow-star" style={{ color: 'yellow' }}>★</span>);
      } else {
        stars.push(<span key={i} className="gray-star" style={{ color: 'gray' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
    </div>
  );
}

export default StarRating;
