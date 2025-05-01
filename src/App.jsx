import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient("https://givwicoublnihfrrqzsc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdndpY291YmxuaWhmcnJxenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjY1MzQsImV4cCI6MjA2MTUwMjUzNH0.igiFXy6gtE-H3nefXTkRCf14wkyY4_gftGhMxwbL3K4");

const GRID_SIZE = 1002 * 1002; // 1004004 pixels

const senators = [
  { name: "ABALOS, BENHUR (PFP)", color: "#d05a1d" },
  { name: "ADONIS, JEROME (MKBYN)", color: "#94df41" },
  { name: "AMAD, WILSON (IND)", color: "#e49a4b" },
  { name: "ANDAMO, NARS ALYN (MKBYN)", color: "#a90c58" },
  { name: "AQUINO, BAM (KNP)", color: "#385332" },
  { name: "ARAMBULO, RONNEL (MKBYN)", color: "#3025b3" },
  { name: "ARELLANO, ERNESTO (KTPNAN)", color: "#9a5b62" },
  { name: "BALLON, ROBERTO (IND)", color: "#b7706e" },
  { name: "BINAY, ABBY (NPC)", color: "#e17189" },
  { name: "BONDOC, JIMMY (PDPLBN)", color: "#3772bb" },
  { name: "BONG REVILLA, RAMON JR. (LAKAS)", color: "#aad633" },
  { name: "BOSITA, COLONEL (IND)", color: "#18d60a" },
  { name: "BROSAS, ARLENE (MKBYN)", color: "#13c3e1" },
  { name: "CABONEGRO, ROY (DPP)", color: "#7cc380" },
  { name: "CAPUYAN, ALLEN (PPP)", color: "#9e19f6" },
  { name: "CASIÑO, TEDDY (MKBYN)", color: "#e569e1" },
  { name: "CASTRO, TEACHER FRANCE (MKBYN)", color: "#49e476" },
  { name: "CAYETANO, PIA (NP)", color: "#b431cd" },
  { name: "D'ANGELO, DAVID (BUNYOG)", color: "#bfae5d" },
  { name: "DE ALBAN, ATTORNEY ANGELO (IND)", color: "#4b96dd" },
  { name: "DE GUZMAN, KA LEODY (PLM)", color: "#274a0c" },
  { name: "DELA ROSA, BATO (PDPLBN)", color: "#5a1cd2" },
  { name: "DORINGO, NANAY MIMI (MKBYN)", color: "#69e723" },
  { name: "ESCOBAL, ARNEL (PM)", color: "#eb6261" },
  { name: "ESPIRITU, LUKE (PLM)", color: "#7cf6cb" },
  { name: "FLORANDA, MODY PISTON (MKBYN)", color: "#a2d23d" },
  { name: "GAMBOA, MARC LOUIE (IND)", color: "#e87f16" },
  { name: "GO, BONG GO (PDPLBN)", color: "#b92337" },
  { name: "GONZALES, NORBERTO (PDSP)", color: "#c079cc" },
  { name: "HINLO, JAYVEE (PDPLBN)", color: "#c4b44b" },
  { name: "HONASAN, GRINGO (RP)", color: "#6a5abf" },
  { name: "JOSE, RELLY JR. (KBL)", color: "#c7f623" },
  { name: "LACSON, PING (IND)", color: "#8a398d" },
  { name: "LAMBINO, RAUL (PDPLBN)", color: "#15d5b5" },
  { name: "LAPID, LITO (NPC)", color: "#75c932" },
  { name: "LEE, MANOY WILBERT (AKSYON)", color: "#8c2b4d" },
  { name: "LIDASAN, AMIRAH (MKBYN)", color: "#9bd4a4" },
  { name: "MARCOLETA, RODANTE (IND)", color: "#42b2c1" },
  { name: "MARCOS, IMEE R. (NP)", color: "#f76d3c" },
  { name: "MARQUEZ, NORMAN (IND)", color: "#9f7685" },
  { name: "MARTINEZ, ERIC (IND)", color: "#3a86c8" },
  { name: "MATA, DOC MARITES (IND)", color: "#c654f2" },
  { name: "MATULA, ATTY. SONNY (WPP)", color: "#34c97f" },
  { name: "MAZA, LIZA (MKBYN)", color: "#9c29c4" },
  { name: "MENDOZA, HEIDI (IND)", color: "#75d96b" },
  { name: "MONTEMAYOR, JOEY (IND)", color: "#b45237" },
  { name: "MUSTAPHA, SUBAIR (WPP)", color: "#5e67d3" },
  { name: "OLIVAR, JOSE JESSIE (IND)", color: "#46c832" },
  { name: "ONG, DOC WILLIE (AKSYON)", color: "#cd2b63" },
  { name: "PACQUIAO, MANNY PACMAN (PFP)", color: "#57d7c6" },
  { name: "PANGILINAN, KIKO (LP)", color: "#a3be33" },
  { name: "QUERUBIN, ARIEL PORFIRIO (NP)", color: "#e61f87" },
  { name: "QUIBOLOY, APOLLO (IND)", color: "#7367e5" },
  { name: "RAMOS, DANILO (MKBYN)", color: "#71cc64" },
  { name: "REVILLAME, WILLIE WIL (IND)", color: "#d01a3f" },
  { name: "RODRIGUEZ, ATTY. VIC (IND)", color: "#4d95aa" },
  { name: "SAHIDULLA, NUR-ANA (IND)", color: "#d2e134" },
  { name: "SALVADOR, PHILLIP IPE (PDPLBN)", color: "#b9466a" },
  { name: "SOTTO, TITO (NPC)", color: "#4baabb" },
  { name: "TAPADO, MICHAEL BONGBONG (PM)", color: "#8d70de" },
  { name: "TOLENTINO, FRANCIS TOL (PFP)", color: "#4cdb67" },
  { name: "TULFO, BEN BITAG (IND)", color: "#d9905f" },
  { name: "TULFO, ERWIN (LAKAS)", color: "#3e6fd7" },
  { name: "VALBUENA, MAR MANIBELA (IND)", color: "#9d45a3" },
  { name: "VERCELES, LEANDRO (IND)", color: "#59f23d" },
  { name: "VILLAR, CAMILLE (NP)", color: "#cb3f3f" }
]

function App() {
  const [selected, setSelected] = useState([]);
  const [pixels, setPixels] = useState([]); // Store all placed pixels
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Track the offset for panning
  const [usedCoords, setUsedCoords] = useState(new Set());
  const canvasRef = useRef(null);

  const handleChange = (name) => {
    const alreadySelected = selected.includes(name);
    if (alreadySelected) {
      setSelected(selected.filter((s) => s !== name));
    } else if (selected.length < 12) {
      setSelected([...selected, name]);
    }
  };

  const handleVote = async () => {
    const newPixels = [];
    const newCoords = new Set();
  
    // Loop through the selected senators
    selected.forEach((senatorName) => {
      const senator = senators.find((s) => s.name === senatorName);
  
      let x, y, key;
      // Generate unique coordinates
      do {
        x = Math.floor(Math.random() * 1000);
        y = Math.floor(Math.random() * 1000);
        key = `${x},${y}`;
      } while (usedCoords.has(key) || newCoords.has(key)); // Prevent duplicates in the same batch
  
      // Add coordinates to the new batch
      newCoords.add(key);
      newPixels.push({ senator_name: senatorName, x, y, color: senator.color });
    });
  
    // Insert the votes into Supabase
    const { data, error } = await supabase.from("votes").insert(newPixels);
  
    if (error) {
      console.error("Error saving votes:", error);
    } else {
      console.log("Votes saved:", data);
    }
  
    // Update local state with the new votes and coordinates
    setPixels((prev) => [...prev, ...newPixels]);
    setUsedCoords((prev) => new Set([...prev, ...newCoords]));
    setSelected([]); // Clear selection after voting
  };  

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel * 1.1); // Zoom in by 10%
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel / 1.1); // Zoom out by 10%
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      // Update the offset to move the canvas
      setOffset((prevOffset) => ({
        x: prevOffset.x + dx,
        y: prevOffset.y + dy,
      }));

      // Update dragStart to current mouse position
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    // Save current context state
    ctx.save();
  
    // Reset any transformations (e.g., scaling or rotation)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Clear canvas to prepare for drawing new pixels
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Set background color to white
    ctx.fillStyle = "#ffffff"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Apply zoom level if any
    ctx.scale(zoomLevel, zoomLevel);

    ctx.scale(zoomLevel, zoomLevel);

    // Apply pan offset (move canvas view)
    ctx.translate(offset.x, offset.y);
  
    // Check if we need to fetch pixels from Supabase
    if (!pixels.length) {
      const { data, error } = await supabase.from("votes").select("*");
      
      if (error) {
        console.error("Error fetching pixels from Supabase:", error);
      } else {
        // Update state with the fetched pixels if needed
        setPixels(data);
      }
    }
  
    // Render each pixel onto the canvas
    pixels.forEach((pixel) => {
      ctx.fillStyle = pixel.color;
      ctx.fillRect(pixel.x, pixel.y, 1, 1); // Draw each pixel with the color from the database
    });
  
    // Restore previous context state (e.g., any transformations that were applied)
    ctx.restore();
  };  

  useEffect(() => {
    const fetchPixels = async () => {
      // Fetch pixels from Supabase only once when component mounts or if you want to refresh it
      const { data, error } = await supabase.from("votes").select("*");
  
      if (error) {
        console.error("Error fetching pixels from Supabase:", error);
      } else {
        // Update state with the fetched pixels
        setPixels(data);
      }
    };
  
    // Run fetchPixels only once when the component is mounted
    fetchPixels();
  
    // Set canvas width and height, and draw it
    const canvas = canvasRef.current;
    canvas.width = 1002;
    canvas.height = 1002;
    drawCanvas();
  
  }, [pixels, zoomLevel, offset]);  // The dependency array ensures this effect runs when pixels or zoomLevel change  
  
  return (
    <div className="app">
      <h1>Practice Your Right to Vote</h1>
      <p>Select exactly 12 senators. Each vote adds a pixel to the grid.</p>
<div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
  <a href="/daisy.txt" target="_blank" rel="noopener noreferrer">
    <button style={{ fontSize: '18px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
      🌼
    </button>
  </a>
</div>

                                                                          
      <div className="senator-list">
        {senators.map((senator, i) => (
          <label key={i} className="senator-item">
            <input
              type="checkbox"
              checked={selected.includes(senator.name)}
              onChange={() => handleChange(senator.name)}
            />
            <span>{i + 1}. </span>
            <a href={senator.link} target="_blank" rel="noreferrer">
              {senator.name}
            </a>
          </label>
        ))}
      </div>

      <button
  disabled={selected.length !== 12 || pixels.length + 12 > GRID_SIZE}
  onClick={handleVote}
  className="vote-button"
>
        Submit Vote
      </button>

      {/* Show message when grid is full */}
{pixels.length + 12 >= GRID_SIZE && (
  <p className="full-grid-message">The grid is full! No more votes allowed.</p>
)}

      {/* Zoom controls */}
      <div className="zoom-controls">
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <p>{pixels.length} / {GRID_SIZE} pixels placed</p>
      {/* Canvas */}
      <div className="canvas-box">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Stops dragging when mouse leaves the canvas
        ></canvas>
      </div>
    </div>
  );
}

export default App;
