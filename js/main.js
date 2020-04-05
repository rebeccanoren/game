(function () {

  var bv = new Bideo();
  bv.init({
    // Video element
    videoEl: document.querySelector('#background_video'),

    // Container element
    container: document.querySelector('body'),

    // Resize
    resize: true,

    // autoplay: false,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    // Array of objects containing the src and type
    // of different video formats to add
    src: [{
        src: 'night.mp4',
        type: 'video/mp4'
      },
      {
        src: 'night.webm',
        type: 'video/webm;codecs="vp8, vorbis"'
      }
    ],

    // What to do once video loads (initial frame)
    onLoad: function () {
      document.querySelector('#video_cover').style.display = 'none';
    }
  });
}());


// Tippy
tippy('[data-tippy-content]', {
  theme: 'tooltip',
  content: "Hejehej",
  animation: 'scale',
});

// Pass the button, the tooltip, and some options, and Popper will do the
// magic positioning for you:


// import Typed from 'typed.js';

let head = document.querySelector(".head")
let name = document.querySelector(".name")
head.addEventListener("click", introInput)

function introInput() {
  head.classList.add("slide-top")
  setTimeout(function () {
    head.remove();
  }, 1500);
  setTimeout(function () {
    write();
  }, 2000);
  setTimeout(function () {
    input();
  }, 8000);
  head.remove()
}

function remove() {
  head.remove()
}

function write() {
  let div = document.createElement("div");
  document.querySelector('.name').appendChild(div);

  var typewriter = new Typewriter(div, {
    loop: false
  });

  typewriter.pauseFor(0)
    .typeString("Hey stranger, what's your name?")
    .pauseFor(2500)
    .start()
}

function input() {
  let input = document.createElement("input");
  input.type = "text";
  input.className = "player-name"
  input.placeholder = "Enter your name"
  const playerName = ""
  document.querySelector('.name').appendChild(input).classList.add("scale-up-bottom");
  input.addEventListener("input", addButton, {
    once: true
  })


  function addButton() {
    let buttonStart = document.createElement("button");
    buttonStart.id = "next"
    buttonStart.innerHTML = "NEXT";
    document.querySelector('.name').appendChild(buttonStart).classList.add("scale-up-bottom")
    buttonStart.addEventListener("click", function () {
      input.value = playerName
      console.log(playerName)
      name.classList.add("slide-top")
      setTimeout(function () {
        startGame();
      }, 3500);

    })

  }
}

// function slideTop() {
//   let buttonNext = document.querySelector("#next")
//   let name = document.querySelector(".name")
//   buttonNext.addEventListener("click", name.classList.add("slide-top"))
//   console.log("Hej")
// }

// slideTop()
// Game functionality

const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById('option-buttons')

//Håller koll på spelet
let state = {}

function startGame() {
  document.querySelector(".questions-container").classList.remove("hidden");
  document.querySelector(".name").remove()
  state = {}
  showTextNode(1)
}

function reStart() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerHTML = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button")
      button.innerText = option.text
      // lägg till styling här
      button.addEventListener("click", () => selectOption(option))
      optionButtonsElement.appendChild(button)

    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return reStart()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}


const textNodes = [{
    id: 1,
    text: "You find yourself out partying with your friends. What will you order at the bar?",
    options: [{
        text: "Margarita 🍸",
        setState: {
          margarita: true
        },
        nextText: 2
      },
      {
        text: "Water please 💦",
        setState: {
          water: true
        },
        nextText: 2
      },
      {
        text: "Beer 🍺",
        setState: {
          water: true
        },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "Nice choice! What do you do next?",
    options: [{
        text: "Go dance",
        setState: {
          dance: true,
        },
        nextText: 3
      },
      {
        text: "Look for Maya",
        setState: {
          lookForMaya: true,
        },
        nextText: 3
      },
    ]
  },

  {
    id: 3,
    text: "On your way there you see a girl crying, what do you do?",
    options: [{
        text: "Comfort the girl",
        // requiredState: (currentState) => currentState.margarita,
        setState: {
          margarita: false,
        },
        nextText: 4
      },
      {
        text: "You walk past her",
        setState: {
          water: false
        },
        nextText: 4
      },
    ]
  },

  {
    id: 4,
    text: "You come back to the bar and Maya is still missing.",
    options: [{
        text: "Continue search for Maya",
        requiredState: (currentState) => currentState.lookForMaya,
        nextText: 5
      },
      {
        text: "Go back to the dancefloor",
        requiredState: (currentState) => currentState.dance,
        nextText: 5
      },
      {
        text: "Go to the dancefloor",
        requiredState: (currentState) => !currentState.dance,
        nextText: 5
      },
      {
        text: "Look for Maya",
        requiredState: (currentState) => !currentState.lookForMaya,
        nextText: 5
      },
    ]
  },
  {
    id: 5,
    text: "The story is currently under construction 🤪",
    options: [{
      text: "Play again!",
      nextText: -1
    }]
  },

]