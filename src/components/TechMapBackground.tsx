import { motion } from "motion/react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

// Self-hosted (public/map-data/) — same world-atlas@2 file, served from our
// own edge cache instead of a third-party CDN (saves a DNS+TLS round trip
// and removes the jsdelivr dependency/CSP entry). Deliberately not under
// /data/ — vercel.json already redirects /data/:path* to /contractor-staffing
// (legacy WordPress cleanup), which would 301 this JSON fetch in production.
const geoUrl = "/map-data/countries-110m.json";

const markers = [
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], tz: "GMT -8", offset: [-10, -15] },
  { name: "New York", coordinates: [-74.0060, 40.7128], tz: "GMT -5", offset: [15, -15] },
  { name: "São Paulo", coordinates: [-46.6333, -23.5505], tz: "GMT -3", offset: [15, 5] },
  { name: "Europe", coordinates: [-0.1276, 51.5072], tz: "GMT +0", offset: [15, -15] },
  { name: "Ukraine", coordinates: [-5.0, 28.0], lineEnd: [35.0, 48.0], tz: "GMT +2", offset: [0, 0], faded: true },
  { name: "China", coordinates: [12.0, 14.0], lineEnd: [55.0, 35.0], tz: "GMT +8", offset: [0, 0], faded: true }
];

const europeCountries = [
  "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
  "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy",
  "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
  "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway",
  "Poland", "Portugal", "Romania", "San Marino", "Serbia", "Slovakia", "Slovenia",
  "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"
];

export function TechMapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex justify-end items-center">
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      
      {/* Map Container */}
      <div className="w-full h-full max-w-[850px] absolute right-[-30%] md:right-[-15%] lg:right-[-5%] opacity-100 flex items-center top-0">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 190,
            center: [-65, 30] // Centers to show both West Coast US/Canada and Europe, shifted right
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* SVG Gradients */}
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-kaptas-green)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-kaptas-purple)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0047FF" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-kaptas-purple)" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const isBrazil = name === "Brazil";
                const isUS = name === "United States of America";
                const isCanada = name === "Canada";
                const isEurope = europeCountries.includes(name);
                
                let fillColor = "rgba(255, 255, 255, 0.02)"; // Smoother, more transparent for unhighlighted
                let fillOpacity = 1;
                let strokeColor = "rgba(255, 255, 255, 0.05)"; // Very subtle borders for Africa/Asia

                if (isBrazil) {
                  fillColor = "var(--color-kaptas-green)";
                  fillOpacity = 0.15;
                  strokeColor = "rgba(255, 255, 255, 0.2)";
                } else if (isUS || isEurope) {
                  fillColor = "var(--color-kaptas-purple)";
                  fillOpacity = 0.15;
                  strokeColor = "rgba(255, 255, 255, 0.2)";
                } else if (isCanada) {
                  fillColor = "#0047FF";
                  fillOpacity = 0.06;
                  strokeColor = "rgba(255, 255, 255, 0.2)";
                }
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    fillOpacity={fillOpacity}
                    stroke={strokeColor}
                    strokeWidth={0.75}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Connection Lines */}
          <Line
            from={markers[0].coordinates as [number, number]}
            to={markers[2].coordinates as [number, number]}
            stroke="url(#line-grad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="animate-dash opacity-90"
          />
          <Line
            from={markers[1].coordinates as [number, number]}
            to={markers[2].coordinates as [number, number]}
            stroke="url(#line-grad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="animate-dash opacity-90"
            style={{ animationDelay: "-25s" }}
          />
          <Line
            from={markers[3].coordinates as [number, number]}
            to={markers[2].coordinates as [number, number]}
            stroke="url(#line-grad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="animate-dash opacity-90"
            style={{ animationDelay: "-35s" }}
          />

          {/* Faded lines pointing East */}
          <Line
            from={markers[2].coordinates as [number, number]}
            to={markers[4].lineEnd as [number, number]}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <Line
            from={markers[2].coordinates as [number, number]}
            to={markers[5].lineEnd as [number, number]}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="4 4"
          />

          {/* Markers */}
          {markers.map(({ name, coordinates, tz, offset, faded }, i) => {
            if (faded) {
              return (
                <Marker key={name} coordinates={coordinates as [number, number]}>
                  <text
                    textAnchor="start"
                    x={offset[0]}
                    y={offset[1]}
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {name}
                  </text>
                  <text
                    textAnchor="start"
                    x={offset[0]}
                    y={offset[1] + 14}
                    fill="rgba(136, 136, 136, 0.4)"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="300"
                    letterSpacing="1"
                  >
                    {tz}
                  </text>
                </Marker>
              );
            }

            const isSP = i === 2;
            const markerColor = isSP ? "var(--color-kaptas-purple)" : "var(--color-kaptas-green)";
            
            return (
              <Marker key={name} coordinates={coordinates as [number, number]}>
                <circle r={4} fill={markerColor} filter="url(#glow)" />
                <circle 
                  r={12} 
                  fill="none" 
                  stroke={markerColor} 
                  strokeWidth={1} 
                  className="animate-ping" 
                  style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} 
                />
                <text
                  textAnchor={i === 0 ? "end" : "start"}
                x={offset[0]}
                y={offset[1]}
                fill="#fff"
                fontSize="12"
                fontWeight="bold"
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
              >
                {name}
              </text>
              <text
                textAnchor={i === 0 ? "end" : "start"}
                x={offset[0]}
                y={offset[1] + 14}
                fill="#888888"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="300"
                letterSpacing="1"
              >
                {tz}
              </text>
            </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
}
