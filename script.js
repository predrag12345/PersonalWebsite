window.addEventListener("DOMContentLoaded", () => {
  // tsparticles inicijalizacija
  tsParticles.load("tsparticles", {
      fullScreen: { enable: true },
      background: {
          color: "#0d0d1a"
      },
      fpsLimit: 60,
      particles: {
          number: {
              value: 80,
              density: {
                  enable: true,
                  area: 800
              }
          },
          color: { value: "#00ffcc" },
          shape: { type: "circle" },
          opacity: {
              value: 0.6,
              random: true
          },
          size: {
              value: 3,
              random: true
          },
          links: {
              enable: true,
              distance: 150,
              color: "#00ffcc",
              opacity: 0.4,
              width: 1
          },
          move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: "bounce"
          }
      },
      interactivity: {
          events: {
              onHover: {
                  enable: true,
                  mode: "grab"
              },
              resize: true
          },
          modes: {
              grab: {
                  distance: 140,
                  links: {
                      opacity: 0.6
                  }
              }
          }
      },
      detectRetina: true
  });

  // scroll funkcija
  window.scrollToElement = function (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }

    // Automatsko zatvaranje sidebar menija ako je otvoren
    const sidebar = document.getElementById('sidebarMenu');
    if (sidebar && sidebar.style.display === 'flex') {
        sidebar.style.display = 'none';
    }
};


  window.toggleSidebar = function () {
    const sidebar = document.getElementById('sidebarMenu');
    if (sidebar) {
        sidebar.style.display = (sidebar.style.display === 'flex') ? 'none' : 'flex';
    }
};

  // krugovi i linije u mapi
const map = document.getElementById('mapContainer');

function createWavyPath(p1, p2, waveCount = 5, amplitude = 10) {
    const dx = (p2.x - p1.x) / waveCount;
    const dy = (p2.y - p1.y) / waveCount;
    let path = `M ${p1.x},${p1.y}`;

    for (let i = 1; i <= waveCount; i++) {
        const x = p1.x + dx * i;
        const y = p1.y + dy * i;

        const offsetX = (dy / Math.sqrt(dx * dx + dy * dy)) * amplitude * (i % 2 === 0 ? 1 : -1);
        const offsetY = (-dx / Math.sqrt(dx * dx + dy * dy)) * amplitude * (i % 2 === 0 ? 1 : -1);

        const cx = p1.x + dx * (i - 0.5) + offsetX;
        const cy = p1.y + dy * (i - 0.5) + offsetY;

        path += ` Q ${cx},${cy} ${x},${y}`;
    }

    return path;
}

if (map) {
    const numCircles = 6;
    const mapHeight = map.offsetHeight;
    const mapWidth = map.offsetWidth;
    const topOffset = 250; // <- povećaj ovu vrednost za više prostora
    const spacing = (mapHeight + topOffset) / (numCircles + 1);
    const sidePadding = mapWidth * 0.25;
    const circles = [];

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "svg-lines");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    map.appendChild(svg);

    // Add character portrait & animation layer
    const portrait = document.createElement('img');
    portrait.src = 'img/portrait.png';
    portrait.id = 'portrait';
    portrait.className = 'avatar';
    map.appendChild(portrait);

    const animFrame = document.createElement('img');
    animFrame.id = 'animFrame';
    animFrame.className = 'avatar-frame';
    map.appendChild(animFrame);

    // Add circle images
    const circleImgs = [];

    for (let i = 0; i < numCircles; i++) {
        const y = spacing * (i + 1);
        let x;

        if (i === 0 || i === numCircles - 1) {
            x = (mapWidth / 2) - 25;
        } else {
            x = (i % 2 === 0) ? sidePadding : (mapWidth - sidePadding - 50);
        }

// Krug pozadina (circle div)
const circle = document.createElement('div');
circle.className = 'circle';
circle.style.top = `${y}px`;
circle.style.left = `${x}px`;
map.appendChild(circle);

// Gornja slika (circle-img)
const img = document.createElement('img');
img.src = `img/circle${i + 1}.png`;
img.className = 'circle-img';
img.style.top = `${y-145}px`;
img.style.left = `${x-60}px`;
img.style.opacity = '0';
map.appendChild(img);


        circleImgs.push(img);
        circles.push({ x: x + 25, y: y + 25 }); // center of 50x50 image
    }

    // Draw curved lines
    for (let i = 0; i < circles.length - 1; i++) {
        const p1 = circles[i];
        const p2 = circles[i + 1];

        const curve = document.createElementNS(svgNS, "path");
        const pathData = createWavyPath(p1, p2, 1, Math.floor(Math.random() * 50) + window.innerWidth < 400 ? 10 : 35);
        curve.setAttribute("d", pathData);
        curve.setAttribute("class", "line");

        svg.appendChild(curve);
    }

    // Text element
    const storyText = document.createElement('div');
    storyText.id = 'storyText';
    storyText.style.position = 'absolute';
    storyText.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    storyText.style.color = 'white';
    storyText.style.padding = '10px';
    storyText.style.borderRadius = '8px';
    storyText.style.maxWidth = '450px';
    storyText.style.fontFamily = 'Roboto, sans-serif';
    storyText.style.transition = 'top 0.5s ease, left 0.5s ease, opacity 0.5s';
    storyText.style.opacity = '0';
    storyText.style.zIndex = '4';
    map.appendChild(storyText);
    map.style.paddingBottom = (window.innerWidth < 450 ? (45) : 20) + 'vh';
  

    const storyTexts = [
        "Name: Predrag Budrak <br> Story: I am a creative and sociable person with strong problem-solving skills. I thrive in team environments and enjoy building amazing things. My approach to challenges ensures that no problem goes unsolved. As a tech enthusiast, I’m always eager to expand my knowledge and improve my skills in order to create innovative tech solutions. <br> I've always been passionate about IT, and what follows is a glimpse into my journey so far.",
        "Hobbies: Basketball – Member of BC “Joker” (2010–2016) and BC “Podgorica” (2016–2020). Currently playing in student leagues and recreational 3x3 tournaments. <br> Guitar – Playing guitar in my free time and as a member of the band ETF Overdrive. <br> Rubik’s Cube – Solving 2x2, 3x3, 4x4, and gear cube puzzles. <br> Story: Being interested in a wide range of activities—from music and film to sports—has helped me develop various hobby-related skills. I’m always motivated to explore and master new abilities that I find exciting.",
        "School: High School for Electro-Technical Studies \"Vaso Aligrudić\", Podgorica <br> Title: Computer Electrotechnician <br> Projects: DjeeBus, SmartPolice, Perjanik (Mobile apps) <br> Awards: Luča A diploma (Top-performing student in elementary and high school) <br> 1st place in the M:tel App Contest 2018 & 2019 (National and Balkan level) <br> 1st place at the national competition Energy in the Wire (Fundamentals of Electrical Engineering) <br> Story: High school was my first real encounter with programming and structured problem-solving. My friends and I were tech geeks—building our own PCs, creating electronic projects, setting up a radio station, websites, and mobile apps. The school provided a well-rounded education in electrical engineering, telecommunications, and computer science. It also encouraged us to participate in various competitions and hackathons, where we grew our knowledge and passion for creating cool, functional technology.",
        "University: Faculty of Electrical Engineering, University of Montenegro <br> Title: BSc in Electronics, Telecommunications, and Computer Engineering <br> Awards: Student Award from the Fund for Quality and Talent <br> Internship: Mobile Application Engineering Intern at VegaIT <br> Certificates: Oracle Academy – Java Foundations, Java Fundamentals, Database Design <br> Project: Smart Farm System (dignest.me) <br> While high school opened the doors to electrical engineering and IT, university shaped me into an engineer. Through a lot of hard work, tasks, projects, labs – and a whole lot of writing – I developed a deep scientific understanding of electromagnetics, telecommunications, electronics, and computer engineering. This experience expanded my mathematical knowledge, improved existing skills, and gave me a more realistic, structured, and problem-oriented mindset that continues to guide me.",
        "University: Faculty of Electrical Engineering, University of Montenegro <br> Title: MSc in Computer Science (Currently attending) <br> Awards: NASA International Space Apps Challenge 2024 – Local winners and global nominees (Seismic Detection Across the Solar System) <br> Organization: EESTEC LC Podgorica – Vice-chairperson for IT <br> Story: I’m currently pursuing my MSc in Computer Science, diving deeper into topics such as neural networks, adaptive systems, heuristic optimization, algorithm theory, information theory, and coding. The combination of formal education and self-driven learning has opened the door to the fascinating world of AI and ML. I’m actively working on labs and projects that are helping me build practical skills in these fields.",
        "Story: What’s next? This is just the beginning. I’m continuing to learn, build, and grow. Many exciting steps lie ahead – to be continued..."
    ];

    let currentIndex = 0;
let lastDirection = 'right';
let movingDown = true;

function moveTo(index) {
    
    const pos = circles[index];
    portrait.style.top = `${pos.y - 70}px`;
    portrait.style.left = `${pos.x - 25}px`;

    portrait.style.opacity = 1;
    animFrame.style.display = 'none';

    // Samo trenutni circle-img je vidljiv
    circleImgs.forEach((img, i) => {
        img.style.opacity = i === index ? '1.0' : '0';
    });

    // Story text
    storyText.style.opacity = '0';
  
    setTimeout(() => {
        storyText.innerHTML = storyTexts[index];

        const textWidth = (window.innerWidth < 450 ? (window.innerWidth-10) : 450);        
        const leftBase = pos.x - textWidth / 2;
        const windowWidth = window.innerWidth;

        let left = leftBase;
        if (leftBase < 10) left = 10;
        if (left + textWidth > windowWidth - 10) left = windowWidth - textWidth - 10;

        storyText.style.width = `${textWidth}px`;
        storyText.style.left = `${left}px`;
        storyText.style.top = `${pos.y + 35}px`;
        storyText.style.opacity = '1';

       
        updateNavButtonsPosition(pos.x, pos.y);


    }, 100);
}

function updateNavButtonsPosition(x, y) {
    const navButtons = document.getElementById('navButtons');
    if (!navButtons) return;

        if(currentIndex == 0){
            navButtons.style.left = `${x - 90}px`; // centriraj grubo
            navButtons.style.top = `${y - 200}px`; 
        }
        else if (currentIndex < 3 && currentIndex > 0) {
        // Gornja polovina (krugovi 0, 1, 2)
            navButtons.style.left = `${x - 90}px`; // centriraj grubo
            navButtons.style.top = `${y - 180}px`;  // iznad avatara
    } else {
        navButtons.style.left = `${x - 90}px`; 
        navButtons.style.top = `${y - 220}px`;  
    }

}

function animateWalk(callback) {

    const toIndex = movingDown ? currentIndex + 1 : currentIndex - 1;

    const from = circles[currentIndex];
    const to = circles[toIndex];

    if (!from || !to) {
        callback();
        return;
    }

    let frames;
    if (to.x < from.x) {
        frames = ['img/left1.png', 'img/left2.png'];
    } else if (to.x > from.x) {
        frames = ['img/right1.png', 'img/right2.png'];
    } else {
        frames = (lastDirection === 'left')
            ? ['img/left1.png', 'img/left2.png']
            : ['img/right1.png', 'img/right2.png'];
    }

    if (to.x !== from.x) {
        lastDirection = (to.x < from.x) ? 'left' : 'right';
    }

    const pathIndex = Math.min(currentIndex, toIndex);
    const path = svg.querySelectorAll("path")[pathIndex];

    if (!path) {
        callback();
        return;
    }

    const totalLength = path.getTotalLength();
    let frameIndex = 0;
    let progress = movingDown ? 0 : totalLength;
    const step = (window.innerWidth < 400 ? 30 : 40)   * (movingDown ? 1 : -1);

    animFrame.style.display = 'block';
    portrait.style.opacity = 0;
    animFrame.src = frames[frameIndex];

    const interval = setInterval(() => {
        const point = path.getPointAtLength(progress);
        animFrame.style.left = `${point.x - 25}px`;
        animFrame.style.top = `${point.y - 70}px`;

        frameIndex = (frameIndex + 1) % frames.length;
        animFrame.src = frames[frameIndex];

        progress += step;

        const finished = movingDown ? progress >= totalLength : progress <= 0;
        if (finished) {
            clearInterval(interval);
            animFrame.style.display = 'none';
            portrait.style.opacity = 1;
            callback();
        }
    }, 100);
}




    moveTo(currentIndex);

document.getElementById('leftArrow').addEventListener('click', () => {
    if (currentIndex > 0) {
        movingDown = false;
        storyText.style.opacity = '0';
        animateWalk(() => {
            currentIndex--;
            moveTo(currentIndex);
        });
    }
});

document.getElementById('rightArrow').addEventListener('click', () => {
    if (currentIndex < circles.length - 1) {
        movingDown = true;
        storyText.style.opacity = '0';
        animateWalk(() => {
            currentIndex++;
            moveTo(currentIndex);
        });
    }
});


}



   const skillTable = document.getElementById("skillHackEffect");
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            startHackerEffect(skillTable);
        }
    }, { threshold: 0.5 });

    observer.observe(skillTable);

function startHackerEffect(table) {

    if (window.innerWidth > 1000) { 

        const chars = "01";
        const rows = Array.from(table.getElementsByTagName("tr"));

        rows.forEach((row, rowIndex) => {
            const cells = row.children;
            Array.from(cells).forEach((cell, cellIndex) => {
                const original = cell.textContent;
                const length = original.length;
                let iterations = 0;

                const interval = setInterval(() => {
                    let result = "";

                    for (let i = 0; i < length; i++) {
                        if (i < iterations) {
                            result += original[i]; // otkriven karakter
                        } else {
                            result += chars[Math.floor(Math.random() * chars.length)];
                        }
                    }

                    cell.textContent = result;
                    cell.classList.add("hack-text");

                    iterations += 1;
                    if (iterations > length) {
                        clearInterval(interval);
                        cell.textContent = original;
                        cell.classList.remove("hack-text");

                        // Ručni reset fonta da se izbegne fallback na iOS
                        cell.style.fontFamily = "'Roboto', sans-serif";
                    }
                }, 10 + rowIndex * 10 + cellIndex * 5);
            });
        });

    } 


else {
    const rows = Array.from(table.getElementsByTagName("tr"));

    rows.forEach((row, rowIndex) => {
        const cells = row.children;
        Array.from(cells).forEach((cell, cellIndex) => {
            const original = cell.textContent;
            const length = original.length;
            let iterations = 0;

            const interval = setInterval(() => {
                let result = "";

                for (let i = 0; i < length; i++) {
                    if (i === iterations - 1) {
                        // Tekući karakter – zeleni
                        result += `<span style="color: #00ff00;">${original[i]}</span>`;
                    } else if (i < iterations) {
                        // Ranije ispisani – zeleni (privremeno)
                        result += `<span style="color: #00ff00;">${original[i]}</span>`;
                    } else {
                        // Još neispisani – nevidljivi ali prostor drže
                        result += `<span style="visibility: hidden;">${original[i]}</span>`;
                    }
                }

                cell.innerHTML = result;
                cell.classList.add("hack-text");

                iterations++;
                if (iterations > length) {
                    clearInterval(interval);
                    // Kada se sve završi, prikaži ceo tekst u beloj boji
                    cell.innerHTML = `<span style="color: white;">${original}</span>`;
                    cell.classList.remove("hack-text");
                    cell.style.fontFamily = "'Roboto', sans-serif";
                }
            }, 10 + rowIndex * 10 + cellIndex * 5);
        });
    });
}








}

















});
