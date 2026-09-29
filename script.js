//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");
const attendeeList = document.getElementById("attendeeList");
let celebration = document.getElementById("celebration");

if (!celebration) {
  celebration = document.createElement("p");
  celebration.id = "celebration";
  greeting.parentNode.insertBefore(celebration, greeting.nextSibling);
}

//Track attendance
let count = 0;
const maxCount = 50;
let attendees = [];

function addAttendee(name, team, teamName) {
  const attendeeRow = document.createElement("li");
  attendeeRow.className = "attendee-row";

  const attendeeNameLabel = document.createElement("span");
  attendeeNameLabel.className = "attendee-name";
  attendeeNameLabel.textContent = name;

  const attendeeTeamLabel = document.createElement("span");
  attendeeTeamLabel.className = `attendee-team ${team}`;
  attendeeTeamLabel.textContent = teamName;

  attendeeRow.appendChild(attendeeNameLabel);
  attendeeRow.appendChild(attendeeTeamLabel);
  attendeeList.appendChild(attendeeRow);
}

function showCelebration() {
  if (count >= maxCount) {
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent,
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent,
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent,
    );
    let highestCount = waterCount;
    let winningTeams = ["Team Water Wise"];

    if (zeroCount > highestCount) {
      highestCount = zeroCount;
      winningTeams = ["Team Net Zero"];
    } else if (zeroCount === highestCount) {
      winningTeams.push("Team Net Zero");
    }

    if (powerCount > highestCount) {
      highestCount = powerCount;
      winningTeams = ["Team Renewables"];
    } else if (powerCount === highestCount) {
      winningTeams.push("Team Renewables");
    }

    celebration.classList.add("success-message");
    celebration.style.display = "block";
    celebration.innerHTML = `Congratulations! The check-in goal is reached. <strong>${winningTeams.join(" and ")}</strong> wins with ${highestCount} check-ins!`;
  }
}

const savedAttendance = localStorage.getItem("attendanceData");

if (savedAttendance) {
  const attendanceData = JSON.parse(savedAttendance);
  count = attendanceData.count;
  attendees = attendanceData.attendees;

  attendeeCount.textContent = count;
  document.getElementById("waterCount").textContent = attendanceData.waterCount;
  document.getElementById("zeroCount").textContent = attendanceData.zeroCount;
  document.getElementById("powerCount").textContent = attendanceData.powerCount;
  progressBar.style.width = Math.round((count / maxCount) * 100) + "%";

  for (let i = 0; i < attendees.length; i++) {
    addAttendee(attendees[i].name, attendees[i].team, attendees[i].teamName);
  }
}

showCelebration();

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  //Increment count
  count++;
  attendeeCount.textContent = count;
  console.log("Total check ins", count);

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Add the attendee to the list
  addAttendee(name, team, teamName);
  attendees.push({ name: name, team: team, teamName: teamName });

  localStorage.setItem(
    "attendanceData",
    JSON.stringify({
      count: count,
      waterCount: document.getElementById("waterCount").textContent,
      zeroCount: document.getElementById("zeroCount").textContent,
      powerCount: document.getElementById("powerCount").textContent,
      attendees: attendees,
    }),
  );

  //Celebrate when the attendance goal is reached
  showCelebration();

  //Show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  form.reset();
});
