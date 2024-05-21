
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

  const netRunRate = (teamRuns / teamOvers) - (opponentRuns / opponentOvers);

  // Return formatted net run rate
  return netRunRate;
}
let form = document.getElementById("nrr")
//form.addEventListener('change',handleform)
function handleform() {
var form = document.forms["NRRDATA"];

for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i];
    if (field.type == "button"){
      continue;
    }
    if (field.value === "") {
        field.style.border = "2px solid red";
        field.style.borderRadius = "15px";
        return; // or handle the validation error in another way
    } else {
        field.style.border = "2px solid #fff";
        field.style.borderRadius = "15px";
    }
}

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
function oversToBalls(overs) {
  // Split the overs into whole and fractional parts
  let parts = overs.toString().split(".");
  let whole = parseInt(parts[0]);
  let fraction = parseInt(parts[1]) || 0;
  // Multiply the whole part by 6 and add the fraction
  let balls = whole * 6 + fraction;
  // Return the result as a number
  return balls;
}// Example usage
function handlecompare() {
  document.getElementById('bl').style.display = "inline-block";
  document.getElementById('bt').style.display = "inline-block";
    form2 = document.forms["TeamAData"]
    target = form2["target"].value
    var form = document.forms["TeamAData"];

for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i];

    if (field.value === "") {
        field.style.border = "2px solid red";
        field.style.borderRadius = "15px";
        return; // or handle the validation error in another way
    } else {
        field.style.border = "2px solid #fff";
        field.style.borderRadius = "15px";
    }
}

    form = document.forms["TeamAData"]
    TeamARuns = form["teamaruns"].value, TeamAOvers = form["teamaovers"].value, TeamARunsAgainst = form["teamarunsagainst"].value, TeamAOversAgainst=form["teamaoversagainst"].value
    TeamBRuns = form["teambruns"].value;
    TeamBOvers = form["teambovers"].value;
    TeamBRunsAgainst = form["teambrunsagainst"].value;
    TeamBOversAgainst = form["teamboversagainst"].value;
    totalovers = form["TotalOvers"].value
    var checkbox = document.getElementById("checkmark");
    TeamANRR = calculateNetRunRate(TeamARuns,TeamAOvers,TeamARunsAgainst, TeamAOversAgainst)
    TeamBNRR = calculateNetRunRate(TeamBRuns,TeamBOvers,TeamBRunsAgainst, TeamBOversAgainst)
    if(TeamANRR > TeamBNRR) {
        document.getElementById("ifteamabatfirst").innerHTML = "Team As NRR is already better than Team B's"
          document.getElementById("ifteamabowlfirst").innerHTML = ""
    }else {
      
    if(checkbox.checked) {
        form2 = document.forms["TeamAData"]
        target = form2["target"].value
        if(target =="") {
            return 
        }
        batfTeamARuns= parseInt(TeamARuns) + parseInt(target), batfTeamAOvers = parseFloat(TeamAOvers) + parseFloat(totalovers), batfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers), batfTeamARunsAgainst = parseInt(TeamARunsAgainst)
        bowlfTeamBRuns = parseInt(TeamBRuns) , bowlfTeamBOvers= parseFloat(TeamBOvers) + parseFloat(totalovers), bowlfTeamBRunsAgainst = parseInt(TeamBRunsAgainst) + parseInt(target), bowlfTeamBOversAgainst= parseFloat(TeamBOversAgainst) + parseFloat(totalovers)
        runs = parseInt(target) +1
        stopvalueifbatfirst = ""
        while (runs > 0){
        run = runs
            TeamANRR = calculateNetRunRate(batfTeamARuns, batfTeamAOvers ,  batfTeamARunsAgainst + run, batfTeamAOversAgainst)
            TeamBNRR  = calculateNetRunRate(bowlfTeamBRuns + run, bowlfTeamBOvers , bowlfTeamBRunsAgainst, bowlfTeamBOversAgainst)
            if (TeamANRR > TeamBNRR) {
            if(runs >= parseInt(target)) {
                stopvalueifbatfirst += "Not possible"
                document.getElementById("ifteamabatfirst").innerHTML = "If Team A bat first then it will not be possible to get over Team B's NRR"
                
                break
            } else {
            outp= "If Team A bats first and gives the target of " + (parseInt(target)+1).toString() + " Then they will have to stop the opposing team in order get their NRR abover Team B before " + run.toString() 
            document.getElementById("ifteamabatfirst").innerHTML = outp
            stopvalueifbatfirst += run
            break;}
            }
            runs --;
        }
        bowlfTeamARuns = parseInt(TeamARuns) + parseInt(target)+1, bowlfTeamAOvers = parseFloat(TeamAOvers), bowlfTeamARunsAgainst  = parseInt(TeamARunsAgainst) + parseInt(target), bowlfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers)
        batfTeamBRuns = parseInt(TeamBRuns) + parseInt(target), batfTeamBOvers = parseFloat(TeamBOvers) + parseFloat(totalovers), batfTeamBRunsagainst = parseInt(TeamBRunsAgainst) + parseInt(target)+1, batfTeamBOversAgainst = parseFloat(TeamBOversAgainst)
        totaloverstoballs = oversToBalls(parseFloat(totalovers))
        stopvalueifbowlfirst = ""
        while (totaloverstoballs > 0){
        totaloverstoball = totaloverstoballs
            TeamANRR = calculateNetRunRate(bowlfTeamARuns,bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoball)), bowlfTeamARunsAgainst, bowlfTeamAOversAgainst)
            TeamBNRR = calculateNetRunRate(batfTeamBRuns,batfTeamBOvers,batfTeamBRunsagainst,batfTeamBOversAgainst + parseFloat(calculateBallsToOvers(totaloverstoball)))
            if (TeamANRR > TeamBNRR) {
            stopvalueifbowlfirst += parseFloat(calculateBallsToOvers(totaloverstoball))
            document.getElementById("ifteamabowlfirst").innerHTML = "If Team A bowl first then they will chase the target of " + (parseInt(target)+1).toString() + " in " +parseFloat(calculateBallsToOvers(totaloverstoball)).toString() 
            break;
            } else{
                document.getElementById("ifteamabowlfirst").innerHTML= "If Team A bowls first then it will not be possible get over Team B's NRR"
            }
            totaloverstoballs --;            
        }
      //
      //document.getElementById("comparison").innerHTML = `If Team A bats first and gives the target of ${target}then they will need to stop the Team B to ${stopvalueifbatfirst}!<br>If Team A bowls first they will need to chase this target of ${target} in ${stopvalueifbowlfirst}!` 
    } else{
        batfTeamARuns= parseInt(TeamARuns) + parseInt(target), batfTeamAOvers = parseFloat(TeamAOvers) + parseFloat(totalovers), batfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers), batfTeamARunsAgainst = parseInt(TeamARunsAgainst)
        runs = parseInt(target) +1
        stopvalueifbatfirst1 = "Not Possible"
        while (runs >0){
            run = runs
            TeamANRR = calculateNetRunRate(batfTeamARuns, batfTeamAOvers, batfTeamARunsAgainst + run, batfTeamAOversAgainst)
            //document.getElementById("comparison").innerHTML =TeamANRR
            TeamBNRR = calculateNetRunRate(TeamBRuns, TeamBOvers, TeamBRunsAgainst, TeamBOversAgainst)
             if (TeamANRR > TeamBNRR) {
           
            stopvalueifbatfirst1 += run
            outp= "If Team A bats first and gives the target of " + (parseInt(target)+1).toString() + " Then they will have to stop the opposing team in order get their NRR abover Team B before " + run.toString() 
            document.getElementById("ifteamabatfirst").innerHTML = outp
            break;
        } else {
            document.getElementById("ifteamabatfirst").innerHTML = "If Team A bats first then it will not be possible to get over Team B's NRR"
        }runs --;
        bowlfTeamARuns = parseInt(TeamARuns) + parseInt(target)+1, bowlfTeamAOvers = parseFloat(TeamAOvers), bowlfTeamARunsAgainst  = parseInt(TeamARunsAgainst) + parseInt(target), bowlfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers)
        totaloverstoballs = oversToBalls(parseFloat(totalovers))
        stopvalueifbowlfirst1 = ""
        while (totaloverstoballs > 0){
        totaloverstoball = totaloverstoballs
            TeamANRR = calculateNetRunRate(bowlfTeamARuns,bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoball)), bowlfTeamARunsAgainst, bowlfTeamAOversAgainst)
            TeamBNRR = calculateNetRunRate(TeamBRuns, TeamBOvers, TeamBRunsAgainst, TeamBOversAgainst)
            if (TeamANRR > TeamBNRR) {
            stopvalueifbowlfirst1 += parseFloat(calculateBallsToOvers(totaloverstoball))
            document.getElementById("ifteamabowlfirst").innerHTML = "If Team A bowl first then they will chase the target of " + (parseInt(target)+1).toString() + " in " +parseFloat(calculateBallsToOvers(totaloverstoball)).toString() 
            break;
            }else{
                document.getElementById("ifteamabowlfirst").innerHTML = "If Team A bowl first then it will not be possible to get over Team B's NRR"
            }
            totaloverstoballs --; 
           }
           //document.getElementById("comparison").innerHTML = `If Team A bats first and gives the target of ${target} then they will need to stop the Opposing Team to ${stopvalueifbatfirst1}!<br>If Team A bowls first they will need to chase this target of ${target} in ${stopvalueifbowlfirst1}!`
}
 }
}
}
function handletables() {
   mytbl = document.getElementById("batftable")
    mytbl.getElementsByTagName("tbody")[0].innerHTML= mytbl.rows[0].innerHTML
    mytb = document.getElementById("bowlftable")
    mytb.getElementsByTagName("tbody")[0].innerHTML = mytb.rows[0].innerHTML
    form2 = document.forms["TeamAData"]
    target = form2["target"].value
    var form = document.forms["TeamAData"];
    form = document.forms["TeamAData"]
    TeamARuns = form["teamaruns"].value, TeamAOvers = form["teamaovers"].value, TeamARunsAgainst = form["teamarunsagainst"].value, TeamAOversAgainst=form["teamaoversagainst"].value
    TeamBRuns = form["teambruns"].value;
    TeamBOvers = form["teambovers"].value;
    TeamBRunsAgainst = form["teambrunsagainst"].value;
    TeamBOversAgainst = form["teamboversagainst"].value;
    totalovers = form["TotalOvers"].value
    var checkbox = document.getElementById("checkmark");
    TeamANRR = calculateNetRunRate(TeamARuns,TeamAOvers,TeamARunsAgainst, TeamAOversAgainst)
    TeamBNRR = calculateNetRunRate(TeamBRuns,TeamBOvers,TeamBRunsAgainst, TeamBOversAgainst)
    if(TeamANRR > TeamBNRR) {
      return
    }else {
      
    if(checkbox.checked) {
        form2 = document.forms["TeamAData"]
        target = form2["target"].value
        if(target =="") {
            return 
        }
        batfTeamARuns= parseInt(TeamARuns) + parseInt(target), batfTeamAOvers = parseFloat(TeamAOvers) + parseFloat(totalovers), batfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers), batfTeamARunsAgainst = parseInt(TeamARunsAgainst)
        bowlfTeamBRuns = parseInt(TeamBRuns) , bowlfTeamBOvers= parseFloat(TeamBOvers) + parseFloat(totalovers), bowlfTeamBRunsAgainst = parseInt(TeamBRunsAgainst) + parseInt(target), bowlfTeamBOversAgainst= parseFloat(TeamBOversAgainst) + parseFloat(totalovers)
        runs = parseInt(target) +1
        stopvalueifbatfirst = ""

        while (runs > 0){
        run = runs
            TeamANRR = calculateNetRunRate(batfTeamARuns, batfTeamAOvers ,  batfTeamARunsAgainst + run, batfTeamAOversAgainst)
            TeamBNRR  = calculateNetRunRate(bowlfTeamBRuns + run, bowlfTeamBOvers , bowlfTeamBRunsAgainst, bowlfTeamBOversAgainst)
            table = document.getElementById("batftable")
            row = table.insertRow(-1)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML= runs
            cell2.innerHTML= TeamANRR.toFixed(3)
            cell3.innerHTML=TeamBNRR.toFixed(3)
            if (runs == 0){
              break;
            }
            runs = runs - 1 ;
        }
        bowlfTeamARuns = parseInt(TeamARuns) + parseInt(target)+1, bowlfTeamAOvers = parseFloat(TeamAOvers), bowlfTeamARunsAgainst  = parseInt(TeamARunsAgainst) + parseInt(target), bowlfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers)
        batfTeamBRuns = parseInt(TeamBRuns) + parseInt(target), batfTeamBOvers = parseFloat(TeamBOvers) + parseFloat(totalovers), batfTeamBRunsagainst = parseInt(TeamBRunsAgainst) + parseInt(target)+1, batfTeamBOversAgainst = parseFloat(TeamBOversAgainst)
        totaloverstoballs = oversToBalls(parseFloat(totalovers))
        stopvalueifbowlfirst = ""
        while (totaloverstoballs > 0){
        totaloverstoball = totaloverstoballs
            TeamANRR = calculateNetRunRate(bowlfTeamARuns,bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoball)), bowlfTeamARunsAgainst, bowlfTeamAOversAgainst)
            TeamBNRR = calculateNetRunRate(batfTeamBRuns,batfTeamBOvers,batfTeamBRunsagainst,batfTeamBOversAgainst + parseFloat(calculateBallsToOvers(totaloverstoball)))
            table = document.getElementById("bowlftable")
            row = table.insertRow(-1)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML= calculateBallsToOvers(totaloverstoball)
            cell2.innerHTML= TeamANRR.toFixed(3)
            cell3.innerHTML=TeamBNRR.toFixed(3)
            if (totaloverstoballs === 0){ break;}
            totaloverstoballs --;
        }
    } else{
        batfTeamARuns= parseInt(TeamARuns) + parseInt(target), batfTeamAOvers = parseFloat(TeamAOvers) + parseFloat(totalovers), batfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers), batfTeamARunsAgainst = parseInt(TeamARunsAgainst)
        runs = parseInt(target) +1
        stopvalueifbatfirst1 = "Not Possible"
        while (runs > 0){
        run = runs
            TeamANRR = calculateNetRunRate(batfTeamARuns, batfTeamAOvers ,  batfTeamARunsAgainst + run, batfTeamAOversAgainst)
            TeamBNRR  = calculateNetRunRate(TeamBRuns, TeamBOvers , TeamBRunsAgainst, TeamBOversAgainst)
            table = document.getElementById("batftable")
            row = table.insertRow(-1)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML= runs
            cell2.innerHTML= TeamANRR.toFixed(3)
            cell3.innerHTML=TeamBNRR.toFixed(3)
            if (runs === 0){
              break;
            }
            runs --;
        }
        bowlfTeamARuns = parseInt(TeamARuns) + parseInt(target)+1, bowlfTeamAOvers = parseFloat(TeamAOvers), bowlfTeamARunsAgainst  = parseInt(TeamARunsAgainst) + parseInt(target), bowlfTeamAOversAgainst = parseFloat(TeamAOversAgainst) + parseFloat(totalovers)
        totaloverstoballs = oversToBalls(parseFloat(totalovers))
        stopvalueifbowlfirst1 = ""
        while (totaloverstoballs > 0){
        totaloverstoball = totaloverstoballs
            TeamANRR = calculateNetRunRate(bowlfTeamARuns,bowlfTeamAOvers + parseFloat(calculateBallsToOvers(totaloverstoball)), bowlfTeamARunsAgainst, bowlfTeamAOversAgainst)
            TeamBNRR = calculateNetRunRate(TeamBRuns,TeamBOvers,TeamBRunsAgainst,TeamBOversAgainst)
            table = document.getElementById("bowlftable")
            row = table.insertRow(-1)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML= calculateBallsToOvers(totaloverstoball)
            cell2.innerHTML= TeamANRR.toFixed(3)
            cell3.innerHTML=TeamBNRR.toFixed(3)
            if (totaloverstoballs === 0){ break;}
            totaloverstoballs --;
        }
}
 }
}

function setCookie(name, value, expiredays) {
  // Use localStorage.setItem to store the value with the name as the key
  localStorage.setItem(name, value);
}

function getCookie(name) {
  // Use localStorage.getItem to retrieve the value with the name as the key
  return localStorage.getItem(name);
}

function formonestoreValues() {
  form = document.forms["NRRDATA"]
  let urlParams = new URLSearchParams(window.location.search);
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    
    
    // Check if the element is not a button or a fieldset
    if (element.type !== "button" && element.type !== "fieldset") {
        // Access the field name and value
        var fieldName = element.name;
        var fieldValue = element.value;
        if (fieldValue !== ""){
            setCookie(fieldName, fieldValue, 3)
            urlParams.set(fieldName,fieldValue)
            
        }
    }

  }
   window.history.replaceState(null, '', urlParams.toString())
}

function formtwostoreValues() {
  form = document.forms["TeamAData"]
  let urlParams = new URLSearchParams(window.location.search);
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    // Check if the element is not a button or a fieldset
    if (element.type !== "fieldset") {
        // Access the field name and value
        var fieldName = element.name;
        var fieldValue = element.value;
        
        if (fieldName == "checkmark"){
            setCookie(fieldName, element.checked, 3)
            urlParams.set(fieldName,element.checked)
            
        }
        if (fieldValue !== "" && fieldName !== "checkmark"){
            setCookie(fieldName, fieldValue, 3)
            urlParams.set(fieldName,fieldValue)
        }
    }
  }
  window.history.replaceState(null, '', urlParams.toString())
      
}


function loadValues(){
    form1 = document.forms["NRRDATA"]
    form2 = document.forms["TeamAData"]
    const urlParams = new URLSearchParams(window.location.search);
    for (var i = 0; i < form1.elements.length; i++) {
    var element = form1.elements[i];

    // Check if the element is not a button or a fieldset
    if (element.type !== "button" && element.type !== "fieldset") {
        // Access the field name and value
        var fieldName = element.name;
        var fieldValue = urlParams.get(fieldName) || getCookie(fieldName);
        if (fieldValue){
            element.value = fieldValue
        }
    }
  }
    for (var i = 0; i < form2.elements.length; i++) {
    var element = form2.elements[i];

    // Check if the element is not a button or a fieldset
    if (element.type !== "fieldset") {
        // Access the field name and value
        var fieldName = element.name;
        var fieldValue = urlParams.get(fieldName) || getCookie(fieldName);
        if (element.name == "checkmark"){
            if (fieldValue=="true"){
                element.click();
            }
        }
        if (fieldValue){
            element.value = fieldValue
        }
    }
    
}}
function showbatfDiv() {
  if (document.getElementById('batfirsttable').style.display === "block"){
    document.getElementById('batfirsttable').style.display = "none";
    document.getElementById('bt').innerText = "Show Table +"
    
  }else{
    document.getElementById('bt').innerText = "Hide Table -"
   document.getElementById('batfirsttable').style.display = "block";}
}
function showbowlfDiv() {
  if (document.getElementById('bowlfirsttable').style.display === "block"){
    document.getElementById('bowlfirsttable').style.display = "none";
    document.getElementById('bl').innerText = "Show Table +"
  }else{
    
  document.getElementById('bl').innerText = "Hide Table -"
   document.getElementById('bowlfirsttable').style.display = "block";}
}
