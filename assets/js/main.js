document.addEventListener('DOMContentLoaded',function(){
  var menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',function(){navLinks.classList.toggle('open');menuBtn.classList.toggle('open');});
    navLinks.addEventListener('click',function(e){if(e.target.tagName==='A'){navLinks.classList.remove('open');menuBtn.classList.remove('open');}});
  }
  var header=document.getElementById('header');
  if(header){window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>40);});}
});

// ===== Live Kp Index (Header Pill + Footer Widget) =====
(async function() {
  // Grab all possible target elements
  const headerVal = document.getElementById('kpPillValue');
  const headerDot = document.getElementById('kpPillDot');
  const footerVal = document.getElementById('footerKpValue');
  const footerDot = document.getElementById('footerKpDot');

  // Exit if none of the widgets exist on this page
  if (!headerVal && !footerVal) return;

  try {
    const response = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json');
    if (!response.ok) throw new Error("Network error");
    const rawData = await response.json();

    const rows = Array.isArray(rawData[0]) ? rawData.slice(1) : rawData;
    const nowStr = new Date().toISOString().split('T')[0];

    let todayMax = 0;
    let found = false;
    rows.forEach(row => {
      const timeTag = Array.isArray(row) ? row[0] : row.time_tag;
      const kp = parseFloat(Array.isArray(row) ? row[1] : row.kp);
      if (timeTag && !isNaN(kp) && timeTag.startsWith(nowStr)) {
        found = true;
        if (kp > todayMax) todayMax = kp;
      }
    });

    if (!found) {
      for (const row of rows) {
        const kp = parseFloat(Array.isArray(row) ? row[1] : row.kp);
        if (!isNaN(kp)) { todayMax = kp; break; }
      }
    }

    const kpVal = Math.round(todayMax);

    // Determine NOAA colour
    let color = "#A4D65E"; // Green (Quiet)
    if (kpVal === 5) color = "#FCE300";      // Yellow (G1)
    else if (kpVal === 6) color = "#FFB300"; // Amber (G2)
    else if (kpVal === 7) color = "#F68D2E"; // Orange (G3)
    else if (kpVal === 8) color = "#E52418"; // Red (G4)
    else if (kpVal >= 9) color = "#B71212";  // Dark Red (G5)

    // Update Header Pill (if it exists)
    if (headerVal && headerDot) {
      headerVal.textContent = kpVal;
      headerVal.style.color = color;
      headerDot.style.background = color;
      headerDot.style.boxShadow = `0 0 8px ${color}`;
    }

    // Update Footer Widget (if it exists)
    if (footerVal && footerDot) {
      footerVal.textContent = kpVal;
      footerVal.style.color = color;
      footerDot.style.background = color;
      footerDot.style.boxShadow = `0 0 8px ${color}`;
    }

  } catch (error) {
    console.error("Kp fetch failed:", error);
    if (headerVal) headerVal.textContent = "–";
    if (footerVal) footerVal.textContent = "–";
  }
})();
