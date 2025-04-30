import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient("https://givwicoublnihfrrqzsc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdndpY291YmxuaWhmcnJxenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjY1MzQsImV4cCI6MjA2MTUwMjUzNH0.igiFXy6gtE-H3nefXTkRCf14wkyY4_gftGhMxwbL3K4");

export const supabase = createClient(supabaseUrl, supabaseKey);

const GRID_SIZE = 1002 * 1002; // 1004004 pixels

const senators = [
  { name: "ABALOS, BENHUR (PFP)", color: "#6f8416", link: "https://en.wikipedia.org/wiki/Benhur_Abalos"},
  { name: "ADONIS, JEROME (MKBYN)", color: "#660c22", link: "https://en.wikipedia.org/wiki/Jerome_Adonis" },
  { name: "AMAD, WILSON (IND)", color: "#0a26ee", link: "https://www.rappler.com/people/p77743701-wilson-amad/" },
  { name: "ANDAMO, NARS ALYN (MKBYN)", color: "#56c1fa", link: "https://www.facebook.com/NarsAlynAndamo/" },
  { name: "AQUINO, BAM (KNP)", color: "#060f7a", link: "https://web.senate.gov.ph/senators/sen_bio/aquino_bam_bio.asp" },
  { name: "ARAMBULO, RONNEL (MKBYN)", color: "#ed1d24", link: "https://en.wikipedia.org/wiki/Ronnel_Arambulo" },
  { name: "ARELLANO, ERNESTO (KTPNAN)", color: "#d192ba", link: "https://www.rappler.com/people/p16263797-ernesto-arellano/" },
  { name: "BALLON, ROBERTO (IND)", color: "#36fa66", link: "https://en.wikipedia.org/wiki/Roberto_Ballon" },
  { name: "BINAY, ABBY (NPC)", color: "#efef19", link: "https://en.wikipedia.org/wiki/Abigail_Binay" },
  { name: "BONDOC, JIMMY (PDPLBN)", color: "#16e1d5", link: "https://en.wikipedia.org/wiki/Jimmy_Bondoc" },
  { name: "BONG REVILLA, RAMON, JR. (LAKAS)", color: "#3bfbcd", link: "https://tl.wikipedia.org/wiki/Bong_Revilla" },
  { name: "BOSITA, COLONEL (IND)", color: "#29082f", link: "https://www.facebook.com/p/Col-Bosita-RSAP-Senador-ng-Masa-61566589485531/" },
  { name: "BROSAS, ARLENE (MKBYN)", color: "#f08d7b", link: "https://en.wikipedia.org/wiki/Arlene_Brosas" },
  { name: "CABONEGRO, ROY (DPP)", color: "#b0ba75", link: "https://www.facebook.com/cabonegro4senator/" },
  { name: "CAPUYAN, ALLEN (PPP)", color: "#95692f", link: "https://www.rappler.com/people/p13870911-allen-capuyan/" },
  { name: "CASIÑO, TEDDY (MKBYN)", color: "#36f22f", link: "https://en.wikipedia.org/wiki/Teodoro_Casi%C3%B1o" },
  { name: "CASTRO, TEACHER FRANCE (MKBYN)", color: "#35f214", link: "https://www.rappler.com/people/p00263645-france-castro/" },
  { name: "CAYETANO, PIA (NP)", color: "#61f60f", link: "https://en.wikipedia.org/wiki/Pia_Cayetano" },
  { name: "D'ANGELO, DAVID (BUNYOG)", color: "#db6bfc", link: "https://www.dangelodavid.com/" },
  { name: "DE ALBAN, ATTORNEY ANGELO (IND)", color: "#0a0eaf", link: "https://www.facebook.com/dealban.angelo/" },
  { name: "DE GUZMAN, KA LEODY (PLM)", color: "#10531e", link: "https://en.wikipedia.org/wiki/Leody_de_Guzman" },
  { name: "DE LA ROSA, BATO (PDPLBN)", color: "#90fd2b", link: "https://pdplaban.org.ph/ronald-dela-rosa/" },
  { name: "DORINGO, NANAY MIMI (MKBYN)", color: "#d7b46f", link: "https://en.wikipedia.org/wiki/Mimi_Doringo" },
  { name: "ESCOBAL, ARNEL (PM)", color: "#3b1957", link: "https://www.rappler.com/people/p87298399-arnel-escobal/" },
  { name: "ESPIRITU, LUKE (PLM)", color: "#925d65", link: "https://en.wikipedia.org/wiki/Luke_Espiritu" },
  { name: "FLORANDA, MODY PISTON (MKBYN)", color: "#a98bb6", link: "https://en.wikipedia.org/wiki/Mody_Floranda" },
  { name: "GAMBOA, MARC LOUIE (IND)", color: "#17a417", link: "https://www.rappler.com/people/p45832637-marc-gamboa/" },
  { name: "GO, BONG GO (PDPLBN)", color: "#9d3fbd", link: "https://en.wikipedia.org/wiki/Bong_Go" },
  { name: "GONZALES, NORBERTO (PDSP)", color: "#9a4e26", link: "https://en.wikipedia.org/wiki/Norberto_Gonzales" },
  { name: "HINLO, JAYVEE (PDPLBN)", color: "#ec1f9a", link: "https://pdplaban.org.ph/atty-jayvee-hinlo/" },
  { name: "HONASAN, GRINGO (RP)", color: "#f7f218", link: "https://web.senate.gov.ph/senators/sen_bio/honasan_gregorio_bio.asp" },
  { name: "JOSE, RELLY JR. (KBL)", color: "#b8a179", link: "https://www.rappler.com/people/p40514825-relly-jose-jr/" },
  { name: "LACSON, PING (IND)", color: "#e5ff3b", link: "https://en.wikipedia.org/wiki/Panfilo_Lacson" },
  { name: "LAMBINO, RAUL (PDPLBN)", color: "#b93a9b", link: "https://pdplaban.org.ph/atty-raul-lambino/" },
  { name: "LAPID, LITO (NPC)", color: "#312e9e", link: "https://en.wikipedia.org/wiki/Lito_Lapid" },
  { name: "LEE, MANOY WILBERT (AKSYON)", color: "#70a06d", link: "https://en.wikipedia.org/wiki/Wilbert_T._Lee" },
  { name: "LIDASAN, AMIRAH (MKBYN)", color: "#96e158", link: "https://en.wikipedia.org/wiki/Amirah_Lidasan" },
  { name: "MARCOLETA, RODANTE (IND)", color: "#d6b579", link: "https://www.congress.gov.ph/house-members/view/?member=E046&name=Marcoleta%2C+Rodante+D." },
  { name: "MARQUEZ, NORMAN (IND)", color: "#734bf4", link: "https://www.rappler.com/people/p65484824-norman-marquez/" },
  { name: "MARCOS, IMEE R. (NP)", color: "#b7cd8b", link: "https://en.wikipedia.org/wiki/Imee_Marcos" },
  { name: "MARTINEZ, ERIC (IND)", color: "#6e9836", link: "https://en.wikipedia.org/wiki/Eric_Martinez" },
  { name: "MATA, DOC MARITES (IND)", color: "#5f15f3", link: "https://www.rappler.com/people/p39971197-marites-mata/" },
  { name: "MATULA, ATTY. SONNY (WPP)", color: "#93c0c0", link: "https://www.facebook.com/SonnyGMatula/" },
  { name: "MAZA, LIZA (MKBYN)", color: "#8b68fc", link: "https://en.wikipedia.org/wiki/Liza_Maza" },
  { name: "MENDOZA, HEIDI (IND)", color: "#56db9f", link: "https://en.wikipedia.org/wiki/Heidi_Mendoza" },
  { name: "MUSTAPHA, SUBAIR (WPP)", color: "#3fd5ff", link: "https://www.rappler.com/people/p82710540-subair-mustapha/" },
  { name: "MONTEMAYOR, JOEY (IND)", color: "#2c7b25", link: "https://www.rappler.com/people/p92869356-jose-montemayor/" },
  { name: "OLIVAR, JOSE JESSIE (IND)", color: "#4fa23f", link: "https://www.rappler.com/people/p78985059-jose-jessie-olivar/" },
  { name: "ONG, DOC WILLIE (AKSYON)", color: "#f0dced", link: "https://en.wikipedia.org/wiki/Willie_Ong" },
  { name: "PACQUIAO, MANNY PACMAN (PFP)", color: "#f1f03b", link: "https://en.wikipedia.org/wiki/Manny_Pacquiao" },
  { name: "PANGILINAN, KIKO (LP)", color: "#3fd5ff", link: "https://kikopangilinan.com/category/lp-statement/" },
  { name: "QUIBOLOY, APOLLO (IND)", color: "#9c5c60", link: "https://www.fbi.gov/wanted/human-trafficking/apollo-carreon-quiboloy" },
  { name: "RAMOS, DANILO (MKBYN)", color: "#00ff1e", link: "https://en.wikipedia.org/wiki/Danilo_Ramos" },
  { name: "REVILLAME, WILLIE WIL (IND)", color: "#a4ed16", link: "https://www.rappler.com/people/p69249448-willie-revillame/" },
  { name: "RODRIGUEZ, ATTY. VIC (IND)", color: "#f28122", link: "https://en.wikipedia.org/wiki/Vic_Rodriguez_(lawyer)" },
  { name: "SAHIDULLA, NUR-ANA (IND)", color: "#e1a7bc", link: "https://en.wikipedia.org/wiki/Nur-Ana_Sahidulla" },
  { name: "SALVADOR, PHILLIP IPE (PDPLBN)", color: "#fd2c32", link: "https://www.rappler.com/people/p74740007-phillip-salvador/" },
  { name: "SOTTO, TITO (NPC)", color: "#62f4b4", link: "https://en.wikipedia.org/wiki/Tito_Sotto" },
  { name: "TAPADO, MICHAEL BONGBONG (PM)", color: "#535ab1", link: "https://www.facebook.com/michael.tapado.9/" },
  { name: "TOLENTINO, FRANCIS TOL (PFP)", color: "#dc9816", link: "https://www.facebook.com/francistolngbayan/" },
  { name: "TULFO, BEN BITAG (IND)", color: "#16d9a7", link: "https://en.wikipedia.org/wiki/Ben_Tulfo" },
  { name: "TULFO, ERWIN (LAKAS)", color: "#bb55d2", link: "https://en.wikipedia.org/wiki/Erwin_Tulfo" },
  { name: "VALBUENA, MAR MANIBELA (IND)", color: "#98f281", link: "https://www.rappler.com/people/p18485652-mar-valbuena/" },
  { name: "VERCELES, LEANDRO (IND)", color: "#5b55fa", link: "https://en.wikipedia.org/wiki/Leandro_Verceles_Jr." },
  { name: "VILLAR, CAMILLE (NP)", color: "#b262ea", link: "https://en.wikipedia.org/wiki/Camille_Villar" }
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

const handleVote = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    selected.forEach((senatorName) => {
      const senator = senators.find((s) => s.name === senatorName);
      const x = Math.floor(Math.random() * 1000);
      const y = Math.floor(Math.random() * 1000);

      ctx.fillStyle = senator.color;
      ctx.fillRect(x, y, 1, 1);
    });

    setSelected([]);
  };
  
    if (error) {
      console.error("Error saving votes:", error);
    } else {
      console.log("Votes saved:", data);
    }
  
    // Step 6: Update local state with the new votes and coordinates
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
