import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient("https://givwicoublnihfrrqzsc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdndpY291YmxuaWhmcnJxenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjY1MzQsImV4cCI6MjA2MTUwMjUzNH0.igiFXy6gtE-H3nefXTkRCf14wkyY4_gftGhMxwbL3K4");

const GRID_SIZE = 1002 * 1002; // 1004004 pixels

const senators = [
  { name: "ABALOS, BENHUR (PFP)", color: "#6f8416", link: "https://example.com/benhur" },
  { name: "ADONIS, JEROME (MKBYN)", color: "#660c22", link: "https://example.com/jerome" },
  { name: "AMAD, WILSON (IND)", color: "#0a26ee", link: "https://example.com/wilson" },
  { name: "ANDAMO, NARS ALYN (MKBYN)", color: "#56c1fa", link: "https://example.com/narsalyn" },
  { name: "AQUINO, BAM (KNP)", color: "#060f7a", link: "https://example.com/bam" },
  { name: "ARAMBULO, RONNEL (MKBYN)", color: "#ed1d24", link: "https://example.com/ronnel" },
  { name: "ARELLANO, ERNESTO (KTPNAN)", color: "#d192ba", link: "https://example.com/ernesto" },
  { name: "BALLON, ROBERTO (IND)", color: "#36fa66", link: "https://example.com/roberto" },
  { name: "BINAY, ABBY (NPC)", color: "#efef19", link: "https://example.com/abby" },
  { name: "BONDOC, JIMMY (PDPLBN)", color: "#16e1d5", link: "https://example.com/jimmy" },
  { name: "BONG REVILLA, RAMON, JR. (LAKAS)", color: "#3bfbcd", link: "https://example.com/bong" },
  { name: "BOSITA, COLONEL (IND)", color: "#29082f", link: "https://example.com/colonel" },
  { name: "BROSAS, ARLENE (MKBYN)", color: "#f08d7b", link: "https://example.com/arlene" },
  { name: "CABONEGRO, ROY (DPP)", color: "#b0ba75", link: "https://example.com/roy" },
  { name: "CAPUYAN, ALLEN (PPP)", color: "#95692f", link: "https://example.com/allen" },
  { name: "CASIÑO, TEDDY (MKBYN)", color: "#36f22f", link: "https://example.com/teddy" },
  { name: "CASTRO, TEACHER FRANCE (MKBYN)", color: "#35f214", link: "https://example.com/france" },
  { name: "CAYETANO, PIA (NP)", color: "#61f60f", link: "https://example.com/pia" },
  { name: "D'ANGELO, DAVID (BUNYOG)", color: "#db6bfc", link: "https://example.com/david" },
  { name: "DE ALBAN, ATTORNEY ANGELO (IND)", color: "#0a0eaf", link: "https://example.com/angelo" },
  { name: "DE GUZMAN, KA LEODY (PLM)", color: "#10531e", link: "https://example.com/leody" },
  { name: "DE LA ROSA, BATO (PDPLBN)", color: "#90fd2b", link: "https://example.com/bato" },
  { name: "DORINGO, NANAY MIMI (MKBYN)", color: "#d7b46f", link: "https://example.com/mimi" },
  { name: "ESCOBAL, ARNEL (PM)", color: "#3b1957", link: "https://example.com/arnel" },
  { name: "ESPIRITU, LUKE (PLM)", color: "#925d65", link: "https://example.com/luke" },
  { name: "FLORANDA, MODY PISTON (MKBYN)", color: "#a98bb6", link: "https://example.com/mody" },
  { name: "GAMBOA, MARC LOUIE (IND)", color: "#17a417", link: "https://example.com/marc" },
  { name: "GO, BONG GO (PDPLBN)", color: "#9d3fbd", link: "https://example.com/bonggo" },
  { name: "GONZALES, NORBERTO (PDSP)", color: "#9a4e26", link: "https://example.com/norberto" },
  { name: "HINLO, JAYVEE (PDPLBN)", color: "#ec1f9a", link: "https://example.com/jayvee" },
  { name: "HONASAN, GRINGO (RP)", color: "#f7f218", link: "https://example.com/gringo" },
  { name: "JOSE, RELLY JR. (KBL)", color: "#b8a179", link: "https://example.com/relly" },
  { name: "LACSON, PING (IND)", color: "#e5ff3b", link: "https://example.com/ping" },
  { name: "LAMBINO, RAUL (PDPLBN)", color: "#b93a9b", link: "https://example.com/raul" },
  { name: "LAPID, LITO (NPC)", color: "#312e9e", link: "https://example.com/lito" },
  { name: "LEE, MANOY WILBERT (AKSYON)", color: "#70a06d", link: "https://example.com/wilbert" },
  { name: "LIDASAN, AMIRAH (MKBYN)", color: "#96e158", link: "https://example.com/amirah" },
  { name: "MARCOLETA, RODANTE (IND)", color: "#d6b579", link: "https://example.com/rodante" },
  { name: "MARQUEZ, NORMAN (IND)", color: "#734bf4", link: "https://example.com/norman" },
  { name: "MARCOS, IMEE R. (NP)", color: "#b7cd8b", link: "https://example.com/imee" },
  { name: "MARTINEZ, ERIC (IND)", color: "#6e9836", link: "https://example.com/eric" },
  { name: "MATA, DOC MARITES (IND)", color: "#5f15f3", link: "https://example.com/marites" },
  { name: "MATULA, ATTY. SONNY (WPP)", color: "#93c0c0", link: "https://example.com/sonny" },
  { name: "MAZA, LIZA (MKBYN)", color: "#8b68fc", link: "https://example.com/liza" },
  { name: "MENDOZA, HEIDI (IND)", color: "#56db9f", link: "https://example.com/heidi" },
  { name: "MUSTAPHA, SUBAIR (WPP)", color: "#3fd5ff", link: "https://example.com/subair" },
  { name: "MONTEMAYOR, JOEY (IND)", color: "#2c7b25", link: "https://example.com/joey" },
  { name: "OLIVAR, JOSE JESSIE (IND)", color: "#4fa23f", link: "https://example.com/jessie" },
  { name: "ONG, DOC WILLIE (AKSYON)", color: "#f0dced", link: "https://example.com/willie" },
  { name: "PACQUIAO, MANNY PACMAN (PFP)", color: "#f1f03b", link: "https://example.com/pacman" },
  { name: "PANGILINAN, KIKO (LP)", color: "#3fd5ff", link: "https://example.com/kiko" },
  { name: "QUIBOLOY, APOLLO (IND)", color: "#9c5c60", link: "https://example.com/apollo" },
  { name: "RAMOS, DANILO (MKBYN)", color: "#00ff1e", link: "https://example.com/danilo" },
  { name: "REVILLAME, WILLIE WIL (IND)", color: "#a4ed16", link: "https://example.com/willie" },
  { name: "RODRIGUEZ, ATTY. VIC (IND)", color: "#f28122", link: "https://example.com/vic" },
  { name: "SAHIDULLA, NUR-ANA (IND)", color: "#e1a7bc", link: "https://example.com/nurana" },
  { name: "SALVADOR, PHILLIP IPE (PDPLBN)", color: "#fd2c32", link: "https://example.com/phillip" },
  { name: "SOTTO, TITO (NPC)", color: "#62f4b4", link: "https://example.com/tito" },
  { name: "TAPADO, MICHAEL BONGBONG (PM)", color: "#535ab1", link: "https://example.com/michael" },
  { name: "TOLENTINO, FRANCIS TOL (PFP)", color: "#dc9816", link: "https://example.com/tol" },
  { name: "TULFO, BEN BITAG (IND)", color: "#16d9a7", link: "https://example.com/ben" },
  { name: "TULFO, ERWIN (LAKAS)", color: "#bb55d2", link: "https://example.com/erwin" },
  { name: "VALBUENA, MAR MANIBELA (IND)", color: "#98f281", link: "https://example.com/mar" },
  { name: "VERCELES, LEANDRO (IND)", color: "#5b55fa", link: "https://example.com/leandro" },
  { name: "VILLAR, CAMILLE (NP)", color: "#b262ea", link: "https://example.com/camille" }
];

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
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
  <button style={{ fontSize: '18px',border: 'none', background: 'transparent' }}>🌼</button>
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
