import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient("https://givwicoublnihfrrqzsc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdndpY291YmxuaWhmcnJxenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjY1MzQsImV4cCI6MjA2MTUwMjUzNH0.igiFXy6gtE-H3nefXTkRCf14wkyY4_gftGhMxwbL3K4");

const GRID_SIZE = 1002 * 1002; // 1004004 pixels

const senators = [
  { name: "ABALOS, BENHUR (PFP)", color: "#d05a1d", link: "https://web.facebook.com/photo/?fbid=1040221381472363&set=pcb.1040224864805348" },
  { name: "ADONIS, JEROME (MKBYN)", color: "#94df41", link: "https://web.facebook.com/photo?fbid=1040221368139031&set=pcb.1040224864805348" },
  { name: "AMAD, WILSON (IND)", color: "#e49a4b", link: "https://web.facebook.com/photo?fbid=1040221394805695&set=pcb.1040224864805348" },
  { name: "ANDAMO, NARS ALYN (MKBYN)", color: "#a90c58", link: "https://web.facebook.com/photo?fbid=1040221408139027&set=pcb.1040224864805348" },
  { name: "AQUINO, BAM (KNP)", color: "#385332", link: "https://web.facebook.com/photo/?fbid=1040221444805690&set=pcb.1040224864805348" },
  { name: "ARAMBULO, RONNEL (MKBYN)", color: "#3025b3", link: "https://web.facebook.com/photo/?fbid=1040221321472369&set=pcb.1040224864805348" },
  { name: "ARELLANO, ERNESTO (KTPNAN)", color: "#9a5b62", link: "https://web.facebook.com/photo/?fbid=1040221454805689&set=pcb.1040224864805348" },
  { name: "BALLON, ROBERTO (IND)", color: "#b7706e", link: "https://web.facebook.com/photo/?fbid=1040221344805700&set=pcb.1040224864805348" },
  { name: "BINAY, ABBY (NPC)", color: "#e17189", link: "https://web.facebook.com/photo/?fbid=1040221384805696&set=pcb.1040224864805348" },
  { name: "BONDOC, JIMMY (PDPLBN)", color: "#3772bb", link: "https://web.facebook.com/photo/?fbid=1040221528139015&set=pcb.1040224864805348" },
  { name: "BONG REVILLA, RAMON JR. (LAKAS)", color: "#aad633", link: "https://web.facebook.com/photo/?fbid=1040221544805680&set=pcb.1040224864805348" },
  { name: "BOSITA, COLONEL (IND)", color: "#18d60a", link: "https://web.facebook.com/photo/?fbid=1040221711472330&set=pcb.1040224864805348" },
  { name: "BROSAS, ARLENE (MKBYN)", color: "#13c3e1", link: "https://web.facebook.com/photo/?fbid=1040221578139010&set=pcb.1040224864805348" },
  { name: "CABONEGRO, ROY (DPP)", color: "#7cc380", link: "https://web.facebook.com/photo/?fbid=1040236664804168&set=pcb.1040224864805348" },
  { name: "CAPUYAN, ALLEN (PPP)", color: "#9e19f6", link: "https://web.facebook.com/photo/?fbid=1040221608139007&set=pcb.1040224864805348" },
  { name: "CASIÑO, TEDDY (MKBYN)", color: "#e569e1", link: "https://web.facebook.com/photo/?fbid=1040221614805673&set=pcb.1040224864805348" },
  { name: "CASTRO, TEACHER FRANCE (MKBYN)", color: "#49e476", link: "https://web.facebook.com/photo?fbid=1045795560914945&set=pcb.1045799570914544" },
  { name: "CAYETANO, PIA (NP)", color: "#b431cd", link: "https://web.facebook.com/photo?fbid=1045795297581638&set=pcb.1045799570914544" },
  { name: "D'ANGELO, DAVID (BUNYOG)", color: "#bfae5d", link: "https://web.facebook.com/photo?fbid=1045795317581636&set=pcb.1045799570914544" },
  { name: "DE ALBAN, ATTORNEY ANGELO (IND)", color: "#4b96dd", link: "https://web.facebook.com/photo?fbid=1045795237581644&set=pcb.1045799570914544" },
  { name: "DE GUZMAN, KA LEODY (PLM)", color: "#274a0c", link: "https://web.facebook.com/photo/?fbid=1045795257581642&set=pcb.1045799570914544" },
  { name: "DELA ROSA, BATO (PDPLBN)", color: "#5a1cd2", link: "https://web.facebook.com/photo/?fbid=1045795294248305&set=pcb.1045799570914544" },
  { name: "DORINGO, NANAY MIMI (MKBYN)", color: "#69e723", link: "https://web.facebook.com/photo/?fbid=1045795200914981&set=pcb.1045799570914544" },
  { name: "ESCOBAL, ARNEL (PM)", color: "#eb6261", link: "https://web.facebook.com/photo/?fbid=1045795204248314&set=pcb.1045799570914544" },
  { name: "ESPIRITU, LUKE (PLM)", color: "#7cf6cb", link: "https://web.facebook.com/photo/?fbid=1045797794248055&set=pcb.1045799570914544" },
  { name: "FLORANDA, MODY PISTON (MKBYN)", color: "#a2d23d", link: "https://web.facebook.com/photo/?fbid=1045795424248292&set=pcb.1045799570914544" },
  { name: "GAMBOA, MARC LOUIE (IND)", color: "#e87f16", link: "https://web.facebook.com/photo/?fbid=1045795457581622&set=pcb.1045799570914544" },
  { name: "GO, BONG GO (PDPLBN)", color: "#b92337", link: "https://web.facebook.com/photo/?fbid=1045795494248285&set=pcb.1045799570914544" },
  { name: "GONZALES, NORBERTO (PDSP)", color: "#c079cc", link: "https://web.facebook.com/photo/?fbid=1045795480914953&set=pcb.1045799570914544" },
  { name: "HINLO, JAYVEE (PDPLBN)", color: "#c4b44b", link: "https://web.facebook.com/photo/?fbid=1045795304248304&set=pcb.1045799570914544" },
  { name: "HONASAN, GRINGO (RP)", color: "#6a5abf", link: "https://web.facebook.com/photo/?fbid=1045795244248310&set=pcb.1045799570914544" },
  { name: "JOSE, RELLY JR. (KBL)", color: "#c7f623", link: "https://web.facebook.com/photo/?fbid=1045795537581614&set=pcb.1045799570914544" },
  { name: "LACSON, PING (IND)", color: "#8a398d", link: "https://web.facebook.com/photo/?fbid=1045795580914943&set=pcb.1045799570914544" },
  { name: "LAMBINO, RAUL (PDPLBN)", color: "#15d5b5", link: "https://web.facebook.com/photo/?fbid=1052358976925270&set=pcb.1052360130258488" },
  { name: "LAPID, LITO (NPC)", color: "#75c932", link: "https://web.facebook.com/photo?fbid=1052358993591935&set=pcb.1052360130258488" },
  { name: "LEE, MANOY WILBERT (AKSYON)", color: "#8c2b4d", link: "https://web.facebook.com/photo?fbid=1052359100258591&set=pcb.1052360130258488" },
  { name: "LIDASAN, AMIRAH (MKBYN)", color: "#9bd4a4", link: "https://web.facebook.com/photo?fbid=1052359170258584&set=pcb.1052360130258488" },
  { name: "MARCOLETA, RODANTE (IND)", color: "#42b2c1", link: "https://web.facebook.com/photo/?fbid=1052359190258582&set=pcb.1052360130258488" },
  { name: "MARCOS, IMEE R. (NP)", color: "#f76d3c", link: "https://web.facebook.com/photo/?fbid=1052359226925245&set=pcb.1052360130258488" },
  { name: "MARQUEZ, NORMAN (IND)", color: "#9f7685", link: "https://web.facebook.com/photo/?fbid=1052359200258581&set=pcb.1052360130258488" },
  { name: "MARTINEZ, ERIC (IND)", color: "#3a86c8", link: "https://web.facebook.com/photo/?fbid=1052359180258583&set=pcb.1052360130258488" },
  { name: "MATA, DOC MARITES (IND)", color: "#c654f2", link: "https://web.facebook.com/photo/?fbid=1052359143591920&set=pcb.1052360130258488" },
  { name: "MATULA, ATTY. SONNY (WPP)", color: "#34c97f", link: "https://web.facebook.com/photo/?fbid=1052359246925243&set=pcb.1052360130258488" },
  { name: "MAZA, LIZA (MKBYN)", color: "#9c29c4", link: "https://web.facebook.com/photo/?fbid=1052359263591908&set=pcb.1052360130258488" },
  { name: "MENDOZA, HEIDI (IND)", color: "#75d96b", link: "https://web.facebook.com/photo/?fbid=1052359296925238&set=pcb.1052360130258488" },
  { name: "MONTEMAYOR, JOEY (IND)", color: "#b45237", link: "https://web.facebook.com/photo/?fbid=1052359370258564&set=pcb.1052360130258488" },
  { name: "MUSTAPHA, SUBAIR (WPP)", color: "#5e67d3", link: "https://web.facebook.com/photo/?fbid=1123410426480169&set=pcb.1121612846659927" },
  { name: "OLIVAR, JOSE JESSIE (IND)", color: "#46c832", link: "https://web.facebook.com/photo/?fbid=1052359513591883&set=pcb.1052360130258488" },
  { name: "ONG, DOC WILLIE (AKSYON)", color: "#cd2b63", link: "https://web.facebook.com/photo/?fbid=1052359416925226&set=pcb.1052360130258488" },
  { name: "PACQUIAO, MANNY PACMAN (PFP)", color: "#57d7c6", link: "https://web.facebook.com/photo/?fbid=1052359423591892&set=pcb.1052360130258488" },
  { name: "PANGILINAN, KIKO (LP)", color: "#a3be33", link: "https://web.facebook.com/photo/?fbid=1064182722409562&set=pcb.1063640365797131" },
  { name: "QUERUBIN, ARIEL PORFIRIO (NP)", color: "#e61f87", link: "https://web.facebook.com/photo?fbid=1063860432441791&set=pcb.1063640365797131" },
  { name: "QUIBOLOY, APOLLO (IND)", color: "#7367e5", link: "https://web.facebook.com/photo?fbid=1063860475775120&set=pcb.1063640365797131" },
  { name: "RAMOS, DANILO (MKBYN)", color: "#71cc64", link: "https://web.facebook.com/photo?fbid=1063860552441779&set=pcb.1063640365797131" },
  { name: "REVILLAME, WILLIE WIL (IND)", color: "#d01a3f", link: "https://web.facebook.com/photo/?fbid=1063860529108448&set=pcb.1063640365797131" },
  { name: "RODRIGUEZ, ATTY. VIC (IND)", color: "#4d95aa", link: "https://web.facebook.com/photo/?fbid=1063860542441780&set=pcb.1063640365797131" },
  { name: "SAHIDULLA, NUR-ANA (IND)", color: "#d2e134", link: "https://web.facebook.com/photo/?fbid=1063860642441770&set=pcb.1063640365797131" },
  { name: "SALVADOR, PHILLIP IPE (PDPLBN)", color: "#b9466a", link: "https://web.facebook.com/photo/?fbid=1063860609108440&set=pcb.1063640365797131" },
  { name: "SOTTO, TITO (NPC)", color: "#4baabb", link: "https://web.facebook.com/photo/?fbid=1063860629108438&set=pcb.1063640365797131" },
  { name: "TAPADO, MICHAEL BONGBONG (PM)", color: "#8d70de", link: "https://web.facebook.com/photo/?fbid=1063860699108431&set=pcb.1063640365797131" },
  { name: "TOLENTINO, FRANCIS TOL (PFP)", color: "#4cdb67", link: "https://web.facebook.com/photo/?fbid=1063860705775097&set=pcb.1063640365797131" },
  { name: "TULFO, BEN BITAG (IND)", color: "#d9905f", link: "https://web.facebook.com/photo/?fbid=1063860722441762&set=pcb.1063640365797131" },
  { name: "TULFO, ERWIN (LAKAS)", color: "#3e6fd7", link: "https://web.facebook.com/photo/?fbid=1063860812441753&set=pcb.1063640365797131" },
  { name: "VALBUENA, MAR MANIBELA (IND)", color: "#9d45a3", link: "https://web.facebook.com/photo/?fbid=1063860825775085&set=pcb.1063640365797131" },
  { name: "VERCELES, LEANDRO (IND)", color: "#59f23d", link: "https://web.facebook.com/photo/?fbid=1063860845775083&set=pcb.1063640365797131" },
  { name: "VILLAR, CAMILLE (NP)", color: "#cb3f3f", link: "https://web.facebook.com/photo/?fbid=1063860909108410&set=pcb.1063640365797131" }
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
