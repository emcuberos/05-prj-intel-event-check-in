//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");
const attendeeList = document.getElementById("attendeeList");

//Track attendance
let count = 0
const maxCount = 50;

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions [0].text;

  console.log(name, team, teamName);

  //Increment count
  count++
  attendeeCount.textContent = count;
  console.log("Total check ins", count);

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById (team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Add the attendee to the list
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

  //Celebrate when the attendance goal is reached
  if (count === maxCount) {
    const waterCount = parseInt(document.getElementById("waterCount").textContent);
    const zeroCount = parseInt(document.getElementById("zeroCount").textContent);
    const powerCount = parseInt(document.getElementById("powerCount").textContent);
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

    greeting.classList.add("success-message");
    greeting.style.display = "block";
    greeting.innerHTML = `Congratulations! The check-in goal is reached. <strong>${winningTeams.join(" and ")}</strong> wins with ${highestCount} check-ins!`;
  }

  //Show welcome message
  const message = `Welcome, ${name} from ${teamName}`;
  console.log(message);

  form.reset();
});