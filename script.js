function calculateNetRunRate(teamRuns, teamOvers, opponentRuns, opponentOvers) {
  // Handle decimal part of overs
  teamRuns = teamRuns.toString(), teamOvers = teamOvers.toString(), opponentRuns= opponentRuns.toString(),opponentOvers= opponentOvers.toString()
  let teamOversDecimal = parseFloat(String(teamOvers).split(".")[1]) || 0;
  let opponentOversDecimal = parseFloat(String(opponentOvers).split(".")[1]) || 0;
  // Adjust overs if decimal part is greater than 5
  while (teamOversDecimal > 5) {
    teamOvers += 1;
    teamOversDecimal = 6 - teamOversDecimal;
  }
  while (opponentOversDecimal > 5) {
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
  return netRunRate;
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
    document.getElementById("result").innerHTML = NRR.toFixed(3);
    
}
function calculateBallsToOvers(balls) {
  // Handle negative or zero balls
  if (balls <= 0) {
    return "Invalid number of balls. Must be positive.";
  }

  // Calculate whole overs
  const wholeOvers = Math.floor(balls / 6);

  // Calculate remaining balls
  const remainingBalls = balls % 6;

  // Return result as a string
  return `${wholeOvers}.${remainingBalls}`;
}

// Example usage
let balls = 34;
let result = calculateBallsToOvers(balls);
console.log(result); // Output: 7 overs and 1 ball
function oversToBalls(overs) {
  // Split the overs into whole and fractional parts
  let parts = overs.toString().split(".");
  let whole = parseInt(parts[0]);
  let fraction = parseInt(parts[1]) || 0;
  // Multiply the whole part by 6 and add the fraction
  let balls = whole * 6 + fraction;
  // Return the result as a number
  return balls;
}


// Example usage
let overs = 5.4; // Can handle decimal overs
let ball = oversToBalls(overs);
console.log(ball); // Output: 42.6 (decimal due to decimal input)
function handlecompare() {
    form2 = document.forms["Target"]
    target = form2["target"].value
    form = document.forms["TeamAData"]
    TeamARuns = form["teamaruns"].value, TeamAOvers = form["teamaovers"].value, TeamARunsAgainst = form["teamarunsagainst"].value, TeamAOversAgainst=form["teamaoversagainst"].value
    TeamBRuns = form["teambruns"].value;
    TeamBOvers = form["teambovers"].value;
    TeamBRunsAgainst = form["teambrunsagainst"].value;
    TeamBOversAgainst = form["teamboversagainst"].value;
    totalovers = form["TotalOvers"].value
    var checkbox = document.getElementById("checkmark");
    console.log(TeamARuns,TeamAOvers,TeamARunsAgainst, TeamAOversAgainst)
    TeamANRR = calculateNetRunRate(TeamARuns,TeamAOvers,TeamARunsAgainst, TeamAOversAgainst)
    TeamBNRR = calculateNetRunRate(TeamBRuns,TeamBOvers,TeamBRunsAgainst, TeamBOversAgainst)
    if(TeamANRR > TeamBNRR) {
        document.getElementById("comparison").innerHTML = "Team As NRR is already better than Team B's"
    }else {
    if(checkbox.checked) {
        form2 = document.forms["Target"]
        target = form2["target"].value
        if(target =="") {
            return 
        }
        batfTeamARuns= parseInt(TeamARuns) + parseInt(target), batfTeamAOvers = parseFloat(TeamAOvers) + parseFloat(totalovers), batfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers), batfTeamARunsAgainst = parseInt(TeamARunsAgainst)
        bowlfTeamBRuns = parseInt(TeamBRuns) , bowlfTeamBOvers= parseFloat(TeamBOvers) + parseFloat(totalovers), bowlfTeamBRunsAgainst = parseInt(TeamBRunsAgainst) + parseInt(target), bowlfTeamBOversAgainst= parseFloat(TeamBOversAgainst) + parseFloat(totalovers)
        runs = parseInt(target) +1
        stopvalueifbatfirst = ""
        while (runs > 0){
            TeamANRR = calculateNetRunRate(batfTeamARuns, batfTeamAOvers ,  batfTeamARunsAgainst + runs, batfTeamAOversAgainst)
            TeamBNRR  = calculateNetRunRate(bowlfTeamBRuns + runs, bowlfTeamBOvers , bowlfTeamBRunsAgainst, bowlfTeamBOversAgainst)
            if (TeamANRR > TeamBNRR) {
            if(runs >= parseInt(target)) {
                stopvalueifbatfirst += "Not possible"
                break
            } else {
            stopvalueifbatfirst += runs
            break;}
            }
            runs --;
        }
        bowlfTeamARuns = parseInt(TeamARuns) + parseInt(target)+1, bowlfTeamAOvers = parseFloat(TeamAOvers), bowlfTeamARunsAgainst  = parseInt(TeamARunsAgainst) + parseInt(target), bowlfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers)
        batfTeamBRuns = parseInt(TeamBRuns) + parseInt(target), batfTeamBOvers = parseFloat(TeamBOvers) + parseFloat(totalovers), batfTeamBRunsagainst = parseInt(TeamBRunsAgainst) + parseInt(target)+1, batfTeamBOversAgainst = parseFloat(TeamBOversAgainst)
        totaloverstoballs = oversToBalls(parseFloat(totalovers))
        stopvalueifbowlfirst = ""
        while (totaloverstoballs > 0){
            TeamANRR = calculateNetRunRate(bowlfTeamARuns,bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoballs)), bowlfTeamARunsAgainst, bowlfTeamAOversAgainst)
            console.log(bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoballs)))
            TeamBNRR = calculateNetRunRate(batfTeamBRuns,batfTeamBOvers,batfTeamBRunsagainst,batfTeamBOversAgainst + parseFloat(calculateBallsToOvers(totaloverstoballs)))
            if (TeamANRR > TeamBNRR) {
            stopvalueifbowlfirst += parseFloat(calculateBallsToOvers(totaloverstoballs))
            break;
            }
            totaloverstoballs --;            
        }
      document.getElementById("comparison").innerHTML = `If Team A bats first and gives the target of ${target}then they will need to stop the Team B to ${stopvalueifbatfirst}!<br>If Team A bowls first they will need to chase this target of ${target} in ${stopvalueifbowlfirst}!` 
    } else{
        batfTeamARuns= parseInt(TeamARuns) + parseInt(target), batfTeamAOvers = parseFloat(TeamAOvers) + parseFloat(totalovers), batfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers), batfTeamARunsAgainst = parseInt(TeamARunsAgainst)
        runs = parseInt(target) +1
        stopvalueifbatfirst = ""
        while (runs >0){
            TeamANRR = calculateNetRunRate(batfTeamARuns, batfTeamAOvers, batfTeamARunsAgainst + runs, batfTeamAOversAgainst)
            TeamBNRR = calculateNetRunRate(TeamBRuns, TeamBOvers, TeamBRunsAgainst, TeamBOversAgainst)
             if (TeamANRR > TeamBNRR) {
            if(runs >= parseInt(target)) {
                stopvalueifbatfirst += "Not possible"
                break
            } else {
            stopvalueifbatfirst += runs
            break;}
        } runs --;
        
        
    
        bowlfTeamARuns = parseInt(TeamARuns) + parseInt(target)+1, bowlfTeamAOvers = parseFloat(TeamAOvers), bowlfTeamARunsAgainst  = parseInt(TeamARunsAgainst) + parseInt(target), bowlfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers)
        totaloverstoballs = oversToBalls(parseFloat(totalovers))
        stopvalueifbowlfirst = ""
        while (totaloverstoballs > 0){
            TeamANRR = calculateNetRunRate(bowlfTeamARuns,bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoballs)), bowlfTeamARunsAgainst, bowlfTeamAOversAgainst)
            TeamBNRR = calculateNetRunRate(TeamBRuns, TeamBOvers, TeamBRunsAgainst, TeamBOversAgainst)
            if (TeamANRR > TeamBNRR) {
            stopvalueifbowlfirst += parseFloat(calculateBallsToOvers(totaloverstoballs))
            break;
            }
            totaloverstoballs --; 
           }
           document.getElementById("comparison").innerHTML = `If Team A bats first and gives the target of ${target}then they will need to stop the Opposing Team to ${stopvalueifbatfirst}!<br>If Team A bowls first they will need to chase this target of ${target} in ${stopvalueifbowlfirst}!`
}
 }
}
}