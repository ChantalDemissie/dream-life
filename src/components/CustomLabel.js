import React, { Component } from 'react';
import * as V from 'victory';

const CustomLabel = props => {
  const {x, y, style} = props;
  const {fontSize} = style;

  return (
    <V.VictoryPortal>
      <V.VictoryGroup></V.VictoryGroup>
      <V.Rect fill="#fff" x={x} y={y} width="52" height={fontSize} />
      <V.VictoryLabel
        {...props}
        className="phaseLabel"
        //renderInPortal
        //dy={-20}
      />
    </V.VictoryPortal>
    // <div>
    //   {/* <V.Rect fill="#000" x={x - 1} y={y + 2} width="52" height={fontSize} /> */}
      
    // </div>
  );
}

export default CustomLabel;