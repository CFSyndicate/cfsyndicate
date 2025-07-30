import * as htmlToImage from "html-to-image";

const titles = [
    "The",
    "Lord",
    "Lady",
    "Sir",
    "Elder",
    "Agent",
    "Captain",
    "",
];

const adjectives = [
    "Clever",
    "Wise",
    "Silent",
    "Swift",
    "Ancient",
    "Golden",
    "Iron",
    "Stout",
    "Keen",
    "Shadow",
    "Runic",
    "Arcane",
    "Gilded",
    "Sturdy",
    "Ashen",
    "Sable",
    "Wired",
    "Digital",
    "Forged",
    "Hollow",
    "Vigilant",
    "First",
    "Last",
];

const nouns = [
    "Owl",
    "Forge",
    "Anvil",
    "Talon",
    "Feather",
    "Rune",
    "Hammer",
    "Spark",
    "Heart",
    "Wing",
    "Cinder",
    "Ember",
    "Codex",
    "Glyph",
    "Circuit",
    "Matrix",
    "Sentinel",
    "Guardian",
    "Key",
    "Core",
    "Spire",
    "Vertex",
    "Cipher",
];

export function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function mulberry32(a) {
    return function () {
        var t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function generateOwl(container, numericSeed) {
    const random = mulberry32(numericSeed);

    // --- Procedural Generation Flags ---
    const gender = numericSeed % 2 === 0 ? "Male" : "Female";
    const hasBellyPattern = random() > 0.5; // 50% chance for belly markings
    const hasRune = random() > 0.7; // 30% chance for a forehead rune
    const hasCheekBlush = random() > 0.6; // 40% chance for blush

    container.dataset.owlGender = gender;

    // --- Palettes & Colors ---
    const bodyColors = [
        "#6b4226",
        "#4b3621",
        "#8b5e3c",
        "#5c4033",
        "#42342b",
    ];
    const bellyColors = ["#f4e1c1", "#e8d3a8", "#fff2d1", "#f5deb3"];
    const maleEyeColors = ["#fff", "#f9f9f9", "#fffcf2"];
    const femaleEyeColors = ["#fff2d1", "#f5e8d3", "#fff9e3"]; // Softer for females
    const irisColors = ["#2c2c2c", "#3b2f2f", "#1b1b1b", "#4a3c2a"];
    const beakAndFeetColor = "#e09f3e";
    const blushColor = "rgba(224, 122, 95, 0.4)"; // A soft, rosy blush color

    // --- Procedural Values ---
    const eyeSize = random() * 6 + 12;
    const bodyWidthFactor = 0.8 + random() * 0.4;
    const isPuffy = random() > 0.6;
    const owlBodyColor =
        bodyColors[Math.floor(random() * bodyColors.length)];
    const wingColor = bodyColors[Math.floor(random() * bodyColors.length)];
    const bellyColor =
        bellyColors[Math.floor(random() * bellyColors.length)];
    const eyeColor = (
        gender === "Female" ? femaleEyeColors : maleEyeColors
    )[Math.floor(random() * 3)];
    const irisColor = irisColors[Math.floor(random() * irisColors.length)];

    container.dataset.owlColor = owlBodyColor;

    // --- Dynamic Dimensions ---
    const bodyRx = 40 * bodyWidthFactor;
    const bellyRx = 28 * bodyWidthFactor;
    const wingSeparation = 28 * bodyWidthFactor;
    const eyeSeparation = 18 * bodyWidthFactor;
    const earSeparation = 35 * bodyWidthFactor;
    const feetSeparation = 10 * bodyWidthFactor;

    // --- SVG Part Generation ---
    const filterAttribute = isPuffy ? 'filter="url(#puffy-filter)"' : "";

    // RESTORED: Belly pattern logic
    let bellyPatternSvg = "";
    if (hasBellyPattern) {
        const patternType = random() > 0.5 ? "spots" : "stripes";
        const patternColor = owlBodyColor;
        const spotSize = 1.5 + random() * 1;
        if (patternType === "spots") {
            bellyPatternSvg = `
                    <circle cx="${60 - bellyRx * 0.3}" cy="95" r="${spotSize}" fill="${patternColor}" opacity="0.6"/>
                    <circle cx="${60 + bellyRx * 0.3}" cy="95" r="${spotSize}" fill="${patternColor}" opacity="0.6"/>
                    <circle cx="60" cy="105" r="${spotSize}" fill="${patternColor}" opacity="0.6"/>`;
        } else {
            bellyPatternSvg = `
                    <line x1="${60 - bellyRx * 0.5}" y1="95" x2="${60 + bellyRx * 0.5}" y2="95" stroke="${patternColor}" stroke-width="2" opacity="0.6"/>
                    <line x1="${60 - bellyRx * 0.5}" y1="105" x2="${60 + bellyRx * 0.5}" y2="105" stroke="${patternColor}" stroke-width="2" opacity="0.6"/>`;
        }
    }

    const eyelashes =
        gender === "Female"
            ? `<!-- Left Eyelash -->
             <path d="M ${60 - eyeSeparation - eyeSize * 0.7},${60 - eyeSize * 0.5} C ${60 - eyeSeparation - eyeSize},${60 - eyeSize} ${60 - eyeSeparation - eyeSize * 1.3},${60 - eyeSize * 0.8}" stroke="${wingColor}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
             <!-- Right Eyelash (Fixed coordinates) -->
             <path d="M ${60 + eyeSeparation + eyeSize * 0.7},${60 - eyeSize * 0.5} C ${60 + eyeSeparation + eyeSize},${60 - eyeSize} ${60 + eyeSeparation + eyeSize * 1.3},${60 - eyeSize * 0.8}" stroke="${wingColor}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
            : "";

    // NEW: Forehead rune logic
    let runeSvg = "";
    if (hasRune) {
        const runes = [
            `<circle cx="60" cy="45" r="3" stroke="${wingColor}" stroke-width="1.5" fill="none"/>`, // Circle Rune
            `<path d="M 60 42 L 57 48 L 63 48 Z" fill="${wingColor}"/>`, // Triangle Rune
            `<path d="M 58 42 L 62 48 M 62 42 L 58 48" stroke="${wingColor}" stroke-width="2" stroke-linecap="round"/>`, // 'X' Rune
        ];
        runeSvg = runes[Math.floor(random() * runes.length)];
    }

    // NEW: Cheek blush logic
    const blushSvg = hasCheekBlush
        ? `<ellipse cx="${60 - eyeSeparation - eyeSize * 0.5}" cy="72" rx="5" ry="3" fill="${blushColor}" />
             <ellipse cx="${60 + eyeSeparation + eyeSize * 0.5}" cy="72" rx="5" ry="3" fill="${blushColor}" />`
        : "";

    // --- Final SVG Assembly ---
    const svg = `
<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bodyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="${owlBodyColor}" stop-opacity="0.7" /><stop offset="100%" stop-color="${owlBodyColor}" />
    </radialGradient>
    ${isPuffy ? `<filter id="puffy-filter"><feTurbulence type="fractalNoise" baseFrequency="${0.05 + random() * 0.05}" numOctaves="3" result="turbulence"/><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="${5 + random() * 5}" xChannelSelector="R" yChannelSelector="G"/></filter>` : ""}
  </defs>

  <!-- Body & Wings -->
  <ellipse cx="60" cy="85" rx="${bodyRx}" ry="45" fill="url(#bodyGradient)" ${filterAttribute} />
  <ellipse cx="${60 - wingSeparation}" cy="85" rx="15" ry="30" fill="${wingColor}" transform="rotate(-10 ${60 - wingSeparation} 85)" ${filterAttribute} />
  <ellipse cx="${60 + wingSeparation}" cy="85" rx="15" ry="30" fill="${wingColor}" transform="rotate(10 ${60 + wingSeparation} 85)" ${filterAttribute} />
  
  <!-- Belly & Decorations -->
  <ellipse cx="60" cy="95" rx="${bellyRx}" ry="32" fill="${bellyColor}" opacity="0.9"/>
  ${bellyPatternSvg}
  ${blushSvg}

  <!-- Face -->
  <circle cx="${60 - eyeSeparation}" cy="60" r="${eyeSize}" fill="${eyeColor}" />
  <circle cx="${60 + eyeSeparation}" cy="60" r="${eyeSize}" fill="${eyeColor}" />
  <circle cx="${60 - eyeSeparation}" cy="60" r="${eyeSize / 2}" fill="${irisColor}" />
  <circle cx="${60 + eyeSeparation}" cy="60" r="${eyeSize / 2}" fill="${irisColor}" />
  <!-- NEW: Eye Glints -->
  <circle cx="${60 - eyeSeparation + eyeSize * 0.25}" cy="${60 - eyeSize * 0.25}" r="${eyeSize * 0.15}" fill="white" />
  <circle cx="${60 + eyeSeparation + eyeSize * 0.25}" cy="${60 - eyeSize * 0.25}" r="${eyeSize * 0.15}" fill="white" />

  ${eyelashes}
  
  <polygon points="56,70 64,70 60,78" fill="${beakAndFeetColor}" />

  <!-- Head & Ears -->
  ${runeSvg}
  <polygon points="${60 - earSeparation - 10},50 ${60 - earSeparation},30 ${60 - earSeparation + 5},50" fill="${wingColor}" />
  <polygon points="${60 + earSeparation + 10},50 ${60 + earSeparation},30 ${60 + earSeparation - 5},50" fill="${wingColor}" />

  <!-- Feet -->
  <path d="M${60 - feetSeparation - 5},128 Q${60 - feetSeparation},135 ${60 - feetSeparation + 5},128" stroke="${beakAndFeetColor}" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M${60 + feetSeparation - 5},128 Q${60 + feetSeparation},135 ${60 + feetSeparation + 5},128" stroke="${beakAndFeetColor}" stroke-width="3" fill="none" stroke-linecap="round" />
</svg>`;
    container.innerHTML = svg;
}

export async function generateShareableImage(
    targetContainer,
    seed,
    shareImagePreview
) {
    const owlColorHex = targetContainer.dataset.owlColor;
    const random = mulberry32(stringToHash(seed));

    // Create a temporary element to render the final image from
    const renderNode = document.createElement("div");
    renderNode.style.width = "400px";
    renderNode.style.height = "400px";
    renderNode.style.display = "flex";
    renderNode.style.alignItems = "center";
    renderNode.style.justifyContent = "center";
    renderNode.style.padding = "40px";

    // Procedural background: a soft radial gradient
    const bgHue = (random() * 360).toFixed(0);
    const bgColor1 = `hsl(${bgHue}, 30%, 10%)`;
    const bgColor2 = `hsl(${bgHue}, 35%, 5%)`;
    renderNode.style.background = `radial-gradient(circle, ${bgColor1} 0%, ${bgColor2} 100%)`;

    // Clone the owl SVG and add a drop shadow to make it pop
    const owlSvgClone = targetContainer.querySelector("svg").cloneNode(true);
    owlSvgClone.style.filter = "drop-shadow(0 10px 15px rgba(0,0,0,0.4))";
    renderNode.appendChild(owlSvgClone);

    // Append to body to render, but keep it off-screen
    document.body.appendChild(renderNode);

    try {
        // Generate the PNG, skipping font embedding to avoid CORS issues
        const dataUrl = await htmlToImage.toPng(renderNode, {
            skipFonts: true,
        });
        shareImagePreview.src = dataUrl;
    } catch (error) {
        console.error("Image generation failed!", error);
    } finally {
        // Clean up the temporary node
        document.body.removeChild(renderNode);
    }
}

export function generateMemorableSeed() {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 999) + 1; // Increased number range
    return title ? `${title} ${adj} ${noun}-${num}` : `${adj}-${noun}-${num}`;
}

// Helper to make owls interactive (no changes here)
export function makeOwlInteractive(container) {
    let clickCount = 0;
    container.addEventListener("click", () => {
        clickCount++;
        container.classList.add("owl-shake");
        setTimeout(() => container.classList.remove("owl-shake"), 400);
        if (clickCount >= 5) {
            container.classList.add("owl-hoot");
            setTimeout(() => container.classList.remove("owl-hoot"), 1000);
            clickCount = 0;
        }
    });
}

export function forgeAndDisplay(container, stringSeed) {
    const seedDisplay = document.getElementById("current-seed-display");
    const numericSeed = stringToHash(stringSeed); // Convert string to number
    generateOwl(container, numericSeed);
    if (container === owlCanvas) {
        seedDisplay.textContent = stringSeed; // Display the memorable string
    }
}

function initializeOwlCards() {
    const owlCards = document.querySelectorAll(
        ".owl-card:not([data-initialized])"
    );

    owlCards.forEach((card) => {
        const canvas = card.querySelector(".owl-canvas");
        const likeBtn = card.querySelector(".like-btn");
        if (!canvas || !likeBtn) return;

        const seed = card.querySelector(".owl-seed").textContent;
        const owlId = likeBtn.dataset.owlId;
        const likeCountSpan = likeBtn.querySelector(".like-count");

        // 1. Generate the owl SVG for this card
        const numericSeed = stringToHash(seed);
        generateOwl(canvas, numericSeed);

        // 2. Add event listener for the like button
        likeBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            likeBtn.disabled = true;
            const heartIcon = likeBtn.querySelector("svg");
            heartIcon.classList.add("text-red-500", "animate-ping");

            try {
                const response = await fetch(
                    `https://form-handler-api.onrender.com/owls/${owlId}/like`,
                    { method: "POST" }
                );
                if (response.ok) {
                    const updatedOwl = await response.json();
                    likeCountSpan.textContent = updatedOwl.like_count;
                }
            } catch (error) {
                console.error("Failed to like owl:", error);
            } finally {
                setTimeout(() => {
                    heartIcon.classList.remove("animate-ping");
                    likeBtn.disabled = false;
                }, 500);
            }
        });

        card.dataset.initialized = "true";
    });
}

export async function fetchAndRenderOwls() {
    const gridContainer = document.getElementById("owl-grid-container");
    const loadingMessage = document.getElementById("loading-message");
    const template = document.getElementById("owl-card-template");

    try {
        const response = await fetch(
            "https://form-handler-api.onrender.com/owls/"
        );
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const owls = await response.json();
        loadingMessage.remove();

        const grid = document.createElement("div");
        grid.className =
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";

        if (owls.length === 0) {
            grid.innerHTML = `<p class="text-center text-slate-400 col-span-full">The aviary is empty. Be the first to save an owl!</p>`;
        } else {
            owls.forEach((owl) => {
                const cardClone = template.content.cloneNode(true);
                const cardElement = cardClone.querySelector(".owl-card");

                cardElement.querySelector(".owl-canvas").id = `owl-canvas-${owl.id}`;
                const seedCode = cardElement.querySelector(".owl-seed");
                seedCode.textContent = owl.seed;
                seedCode.title = owl.seed;
                cardElement.querySelector(".like-btn").dataset.owlId = owl.id;
                cardElement.querySelector(".like-count").textContent = owl.like_count;

                grid.appendChild(cardClone);
            });
        }
        gridContainer.appendChild(grid);

        // After rendering, initialize all the new cards.
        initializeOwlCards();
    } catch (error) {
        console.error("Failed to fetch and render owls:", error);
        loadingMessage.textContent =
            "The connection to the Ember Aviary is down. Please try again later.";
        loadingMessage.className =
            "text-center text-red-400 bg-red-900/50 p-4 rounded-lg";
    }
}