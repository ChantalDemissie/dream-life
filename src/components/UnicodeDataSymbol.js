import React from 'react';

class UnicodeDataSymbol extends React.Component {
  render() {
    const {x, y, symbol} = this.props;
    return (
      <text x={x - 10} y={y} fontSize={15}>
        {symbol}
      </text>
    );
  }
}

export default UnicodeDataSymbol;