import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient("https://givwicoublnihfrrqzsc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdndpY291YmxuaWhmcnJxenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjY1MzQsImV4cCI6MjA2MTUwMjUzNH0.igiFXy6gtE-H3nefXTkRCf14wkyY4_gftGhMxwbL3K4");

const GRID_SIZE = 1002 * 1002; // 1004004 pixels

const senators = [
  { name: "ABALOS, BENHUR (PFP)", color: "#d05a1d", link: "https://2025.senateph.vote/abalos-benhur" },
  { name: "ADONIS, JEROME (MKBYN)", color: "#94df41", link: "https://2025.senateph.vote/adonis-jerome" },
  { name: "AMAD, WILSON (IND)", color: "#e49a4b", link: "https://2025.senateph.vote/amad-wilson" },
  { name: "ANDAMO, NARS ALYN (MKBYN)", color: "#a90c58", link: "https://2025.senateph.vote/andamo-nars-alyn" },
  { name: "AQUINO, BAM (KNP)", color: "#385332", link: "https://2025.senateph.vote/aquino-bam" },
  { name: "ARAMBULO, RONNEL (MKBYN)", color: "#3025b3", link: "https://2025.senateph.vote/arambulo-ronnel" },
  { name: "ARELLANO, ERNESTO (KTPNAN)", color: "#9a5b62", link: "https://2025.senateph.vote/arellano-ernesto" },
  { name: "BALLON, ROBERTO (IND)", color: "#b7706e", link: "https://2025.senateph.vote/ballon-roberto" },
  { name: "BINAY, ABBY (NPC)", color: "#e17189", link: "https://2025.senateph.vote/binay-abby" },
  { name: "BONDOC, JIMMY (PDPLBN)", color: "#3772bb", link: "https://2025.senateph.vote/bondoc-jimmy" },
  { name: "BONG REVILLA, RAMON JR. (LAKAS)", color: "#aad633", link: "https://2025.senateph.vote/bong-revilla-ramon-jr" },
  { name: "BOSITA, COLONEL (IND)", color: "#18d60a", link: "https://2025.senateph.vote/bosita-colonel" },
  { name: "BROSAS, ARLENE (MKBYN)", color: "#13c3e1", link: "https://2025.senateph.vote/brosas-arlene" },
  { name: "CABONEGRO, ROY (DPP)", color: "#7cc380", link: "https://2025.senateph.vote/cabonegro-roy" },
  { name: "CAPUYAN, ALLEN (PPP)", color: "#9e19f6", link: "https://2025.senateph.vote/capuyan-allen" },
  { name: "CASIÑO, TEDDY (MKBYN)", color: "#e569e1", link: "https://2025.senateph.vote/casino-teddy" },
  { name: "CASTRO, TEACHER FRANCE (MKBYN)", color: "#49e476", link: "https://2025.senateph.vote/castro-teacher-france" },
  { name: "CAYETANO, PIA (NP)", color: "#b431cd", link: "https://2025.senateph.vote/cayetano-pia" },
  { name: "D'ANGELO, DAVID (BUNYOG)", color: "#bfae5d", link: "https://2025.senateph.vote/dangelo-david" },
  { name: "DE ALBAN, ATTORNEY ANGELO (IND)", color: "#4b96dd", link: "https://2025.senateph.vote/de-alban-attorney-angelo" },
  { name: "DE GUZMAN, KA LEODY (PLM)", color: "#274a0c", link: "https://2025.senateph.vote/de-guzman-ka-leody" },
  { name: "DELA ROSA, BATO (PDPLBN)", color: "#5a1cd2", link: "https://2025.senateph.vote/dela-rosa-bato" },
  { name: "DORINGO, NANAY MIMI (MKBYN)", color: "#69e723", link: "https://2025.senateph.vote/doringo-nanay-mimi" },
  { name: "ESCOBAL, ARNEL (PM)", color: "#eb6261", link: "https://2025.senateph.vote/escobal-arnel" },
  { name: "ESPIRITU, LUKE (PLM)", color: "#7cf6cb", link: "https://2025.senateph.vote/espiritu-luke" },
  { name: "FLORANDA, MODY PISTON (MKBYN)", color: "#a2d23d", link: "https://2025.senateph.vote/floranda-mody-piston" },
  { name: "GAMBOA, MARC LOUIE (IND)", color: "#e87f16", link: "https://2025.senateph.vote/gamboa-marc-louie" },
  { name: "GO, BONG GO (PDPLBN)", color: "#b92337", link: "https://2025.senateph.vote/go-bong-go" },
  { name: "GONZALES, NORBERTO (PDSP)", color: "#c079cc", link: "https://2025.senateph.vote/gonzales-norberto" },
  { name: "HINLO, JAYVEE (PDPLBN)", color: "#c4b44b", link: "https://2025.senateph.vote/hinlo-jayvee" },
  { name: "HONASAN, GRINGO (RP)", color: "#6a5abf", link: "https://2025.senateph.vote/honasan-gringo" },
  { name: "JOSE, RELLY JR. (KBL)", color: "#c7f623", link: "https://2025.senateph.vote/jose-relly-jr" },
  { name: "LACSON, PING (IND)", color: "#8a398d", link: "https://2025.senateph.vote/lacson-ping" },
  { name: "LAMBINO, RAUL (PDPLBN)", color: "#15d5b5", link: "https://2025.senateph.vote/lambino-raul" },
  { name: "LAPID, LITO (NPC)", color: "#75c932", link: "https://2025.senateph.vote/lapid-lito" },
  { name: "LEE, MANOY WILBERT (AKSYON)", color: "#8c2b4d", link: "https://2025.senateph.vote/lee-manoy-wilbert" },
  { name: "LIDASAN, AMIRAH (MKBYN)", color: "#9bd4a4", link: "https://2025.senateph.vote/lidasan-amirah" },
  { name: "MARCOLETA, RODANTE (IND)", color: "#42b2c1", link: "https://2025.senateph.vote/marcoleta-rodante" },
  { name: "MARCOS, IMEE R. (NP)", color: "#f76d3c", link: "https://2025.senateph.vote/marcos-imee-r" },
  { name: "MARQUEZ, NORMAN (IND)", color: "#9f7685", link: "https://2025.senateph.vote/marquez-norman" },
  { name: "MARTINEZ, ERIC (IND)", color: "#3a86c8", link: "https://2025.senateph.vote/martinez-eric" },
  { name: "MATA, DOC MARITES (IND)", color: "#c654f2", link: "https://2025.senateph.vote/mata-doc-marites" },
  { name: "MATULA, ATTY. SONNY (WPP)", color: "#34c97f", link: "https://2025.senateph.vote/matula-atty-sonny" },
  { name: "MAZA, LIZA (MKBYN)", color: "#9c29c4", link: "https://2025.senateph.vote/maza-liza" },
  { name: "MENDOZA, HEIDI (IND)", color: "#75d96b", link: "https://2025.senateph.vote/mendoza-heidi" },
  { name: "MONTEMAYOR, JOEY (IND)", color: "#b45237", link: "https://2025.senateph.vote/montemayor-joey" },
  { name: "MUSTAPHA, SUBAIR (WPP)", color: "#5e67d3", link: "https://2025.senateph.vote/mustapha-subair" },
  { name: "OLIVAR, JOSE JESSIE (IND)", color: "#46c832", link: "https://2025.senateph.vote/olivar-jose-jessie" },
  { name: "ONG, DOC WILLIE (AKSYON)", color: "#cd2b63", link: "https://2025.senateph.vote/ong-doc-willie" },
  { name: "PACQUIAO, MANNY PACMAN (PFP)", color: "#57d7c6", link: "https://2025.senateph.vote/pacquiao-manny-pacman" },
  { name: "PANGILINAN, KIKO (LP)", color: "#a3be33", link: "https://2025.senateph.vote/pangilinan-kiko" },
  { name: "QUERUBIN, ARIEL PORFIRIO (NP)", color: "#e61f87", link: "https://2025.senateph.vote/querubin-ariel-porfirio" },
  { name: "QUIBOLOY, APOLLO (IND)", color: "#7367e5", link: "https://2025.senateph.vote/quiboloy-apollo" },
  { name: "RAMOS, DANILO (MKBYN)", color: "#71cc64", link: "https://2025.senateph.vote/ramos-danilo" },
  { name: "REVILLAME, WILLIE WIL (IND)", color: "#d01a3f", link: "https://2025.senateph.vote/revillame-willie-wil" },
  { name: "RODRIGUEZ, ATTY. VIC (IND)", color: "#4d95aa", link: "https://2025.senateph.vote/rodriguez-atty-vic" },
  { name: "SAHIDULLA, NUR-ANA (IND)", color: "#d2e134", link: "https://2025.senateph.vote/sahidulla-nur-ana" },
  { name: "SALVADOR, PHILLIP IPE (PDPLBN)", color: "#b9466a", link: "https://2025.senateph.vote/salvador-phillip-ipe" },
  { name: "SOTTO, TITO (NPC)", color: "#4baabb", link: "https://2025.senateph.vote/sotto-tito" },
  { name: "TAPADO, MICHAEL BONGBONG (PM)", color: "#8d70de", link: "https://2025.senateph.vote/tapado-michael-bongbong" },
  { name: "TOLENTINO, FRANCIS TOL (PFP)", color: "#4cdb67", link: "https://2025.senateph.vote/tolentino-francis-tol" },
  { name: "TULFO, BEN BITAG (IND)", color: "#d9905f", link: "https://2025.senateph.vote/tulfo-ben-bitag" },
  { name: "TULFO, ERWIN (LAKAS)", color: "#3e6fd7", link: "https://2025.senateph.vote/tulfo-erwin" },
  { name: "VALBUENA, MAR MANIBELA (IND)", color: "#9d45a3", link: "https://2025.senateph.vote/valbuena-mar-manibela" },
  { name: "VERCELES, LEANDRO (IND)", color: "#59f23d", link: "https://2025.senateph.vote/verceles-leandro" },
  { name: "VILLAR, CAMILLE (NP)", color: "#cb3f3f", link: "https://2025.senateph.vote/villar-camille" }
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
