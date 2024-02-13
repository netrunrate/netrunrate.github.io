function calculateNetRunRate(teamRuns, teamOvers, opponentRuns, opponentOvers) {
  // Handle decimal part of overs
  let teamOversDecimal = parseFloat(String(teamOvers).split(".")[1]) || 0;
  let opponentOversDecimal = parseFloat(String(opponentOvers).split(".")[1]) || 0;
  // Adjust overs if decimal part is greater than 5
  if (teamOversDecimal > 5) {
    teamOvers += 1;
    teamOversDecimal = 6 - teamOversDecimal;
  }
  if (opponentOversDecimal > 5) {
    opponentOvers += 1;
    opponentOversDecimal = 6 - opponentOversDecimal;
  }
  teamOversDecimal = String(teamOversDecimal/6).split(".")[1];
  opponentOversDecimal = String(opponentOversDecimal/6).split(".")[1];
  teamOvers = parseFloat((String(teamOvers).split(".")[0])+ "." + String(teamOversDecimal))
  opponentOvers = parseFloat((String(opponentOvers).split(".")[0]) + "." + String(opponentOversDecimal))
  console.log(opponentOvers, teamOvers)
  // Calculate net run rate
  const netRunRate = (teamRuns / teamOvers) - (opponentRuns / opponentOvers);

  // Return formatted net run rate
  return netRunRate.toFixed(3);
}
let form = document.getElementById("nrr")
//form.addEventListener('change',handleform)
function handleform() {
    form = document.forms["NRRDATA"]
    teamruns = form["Teamruns"].value
    teamovers = form["Teamovers"].value
    runsC = form["Runsagainst"].value
    oversC = form["Oversagainst"].value
    NRR = calculateNetRunRate(teamruns, teamovers,runsC, oversC)
    document.getElementById("result").innerHTML = NRR;
    
}