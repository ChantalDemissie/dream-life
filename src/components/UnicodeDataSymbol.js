import React from 'react';

class UnicodeDataSymbol extends React.Component {
  render() {
    const {x, y, symbol} = this.props;
    const cat = "😻";
    return (
      <text x={x - 10} y={y} fontSize={15}>
        {/* {cat} */}
        {symbol}
      </text>
    );
  }
}

export default UnicodeDataSymbol;