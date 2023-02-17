import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Bar,
  Label,
} from "recharts";

function Breakpoint(sp_Sc, sp_Lc, mp, ml) {
  const x1 = Number(sp_Lc);
  const x2 = Number(sp_Sc);
  const y1 = Number(ml);
  const y2 = Number(mp);

  const x = x1 + (x2 - x1) * (y1 / (y2 + y1));

  return x.toFixed(2);
}

export default function Rechart(props) {
  const [data, setData] = useState([]);
  const breakEvenPoint = Breakpoint(
    props.sp_Sc,
    props.sp_Lc,
    props.mp,
    props.ml
  );

  useEffect(() => {
    setData([
      {
        price: 0,
        Expiration: -0,
        Prior: 0,
      },
      {
        price: 0,
        Expiration: -0,
        Prior: 0,
      },
      {
        price: NaN,
        Expiration: 0,
        Prior: 0,
      },
      {
        price: 0,
        Expiration: 0,
        Prior: 0,
      },
      {
        price: 0,
        Expiration: 0,
        Prior: 0,
      },
    ]);
    if (props.option === "bull_call") {
      setData([
        {
          price: Number((props.sp_Lc * 0.8).toFixed(2)),
          Expiration: -Number(props.ml),
          Prior: Number(props.mp) * 0.01,
        },
        {
          price: Number(props.sp_Lc),
          Expiration: -Number(props.ml),
          Prior: Number(props.mp) * 0.01,
        },
        {
          price: breakEvenPoint,
          Expiration: 0,
          Prior: Number(props.mp) * 0.01,
        },
        {
          price: Number(props.sp_Sc),
          Expiration: Number(props.mp),
          Prior: Number(props.mp) * 0.01,
        },
        {
          price: Number((props.sp_Sc * 1.2).toFixed(2)),
          Expiration: Number(props.mp),
          Prior: Number(props.mp) * 0.01,
        },
      ]);
    } else if (props.option === "bear_call") {
      setData([
        {
          price: Number((props.sp_Lc * 0.8).toFixed(2)),
          Expiration: Number(props.mp),
          Prior: Number(props.ml),
        },
        {
          price: Number(props.sp_Sc),
          Expiration: Number(props.mp),
          Prior: Number(props.mp / 2),
        },
        {
          price: breakEvenPoint,
          Expiration: 0,
          Prior: Number(props.ml / 2),
        },
        {
          price: Number(props.sp_Lc),
          Expiration: -Number(props.ml),
          Prior: Number(props.ml / 2),
        },
        {
          price: Number((props.sp_Sc * 1.2).toFixed(2)),
          Expiration: -Number(props.ml),
          Prior: Number(props.mp),
        },
      ]);
    }
  }, [props.option, props.mp]);

  const mp = Number(props.mp);
  const ml = Number(props.ml);

  const gradientGreen = ((mp - ml * 0.1) / (mp + ml)) * 100;
  const gradientRed = 100 - ((ml * 0.9) / (mp + ml)) * 100;

  return (
    <div className="chartBox">
      <ComposedChart
        className="container"
        width={1200}
        height={600}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          axisLine={false}
          type="number"
          dataKey="price"
          width={150}
          domain={["dataMin", "dataMax"]}
          allowDataOverflow={true}
          hide
        />
        <YAxis
          dataKey="Expiration"
          domain={[(dataMin) => dataMin * 1.4, (dataMax) => dataMax * 1.4]}
        />
        <Tooltip />
        <ReferenceLine
          x={breakEvenPoint}
          stroke="green"
          strokeDasharray="5 5"
          strokeWidth={0.5}
        >
          {/* <Label
            value={breakEvenPoint}
            position={{ x: breakEvenPoint, y: 0 }}
            style={{ fill: "green" }}
          /> */}
        </ReferenceLine>
        <ReferenceLine
          x={Number(props.sp_Sc)}
          stroke="red"
          strokeDasharray="5 5"
          strokeWidth={0.5}
        >
          {/* <Label
            value={Number(props.sp_Sc)}
            position={{ x: Number(props.sp_Sc), y: 0 }}
            style={{ fill: "red" }}
          /> */}
        </ReferenceLine>
        <ReferenceLine
          x={Number(props.sp_Lc)}
          stroke="blue"
          strokeDasharray="5 5"
          strokeWidth={0.5}
        >
          {/* <Label
            value={Number(props.sp_Lc)}
            position={{ x: Number(props.sp_Lc), y: 0 }}
            style={{ fill: "blue" }}
          /> */}
        </ReferenceLine>
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#51F39C" stopOpacity={1} />
            <stop offset={`${gradientGreen}%`} stopColor="white" />
            <stop offset={`${gradientRed}%`} stopColor="white" />
            <stop offset={`${100}%`} stopColor="#F35151" stopOpacity={0.96} />
            {/* <stop offset={off} stopColor="#51F39C" stopOpacity={1} />
            <stop offset={off} stopColor="#F35151" stopOpacity={0.96} /> */}
          </linearGradient>
        </defs>
        {/* <Line
          type="monotone"
          dataKey="Prior"
          stroke="#00477e"
          strokeDasharray="5 5"
        /> */}
        <Area
          dataKey="Expiration"
          stroke="blue"
          fill="url(#splitColor)"
        />
        <Bar dataKey="price" barSize={10} label={{ position: "bottom"}} opacity={0} />
        <ReferenceLine y={0} stroke="black" strokeWidth={2}>
          {/* <Label value="0" position="left" fontSize={10}/> */}
          {/* <Label
            value={Number(props.sp_Sc)}
            position={{ x: Number(props.sp_Sc), y: 20 }}
            style={{ fill: "red" }}
          />
          <Label
            value={breakEvenPoint}
            position={{ x: breakEvenPoint, y: 20 }}
            style={{ fill: "green" }}
          />
          <Label
            value={Number(props.sp_Lc)}
            position={{ x: Number(props.sp_Lc), y: 20 }}
            style={{ fill: "blue" }}
          /> */}
        </ReferenceLine>
      </ComposedChart>
    </div>
  );
}
