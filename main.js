document.getElementById('bugInputForm').addEventListener('submit', saveBug);

function saveBug(e){
    var bugDesc = document.getElementById('bugDescInput').value;
    var bugSignificance = document.getElementById('bugSignificanceInput').value;
    var bugAssignedTo = document.getElementById('bugAssignedToInput').value;
    var bugId = chance.guid();
    var bugStatus = 'Open';

    var bug_obj = {
        id: bugId,
        description: bugDesc,
        significance: bugSignificance,
        assignedTo: bugAssignedTo,
        status: bugStatus
    }

    if(localStorage.getItem('bugs')==null){
        var bugs_ar = [];
        bugs_ar.push(bug_obj);
        localStorage.setItem('bugs',JSON.stringify(bugs_ar))
    }
    else{
        var bugs_ar = JSON.parse(localStorage.getItem('bugs'));
        bugs_ar.push(bug_obj);
        localStorage.setItem('bugs',JSON.stringify(bugs_ar))
    }
    document.getElementById('buginputForm').reset();

    fetchBugs();

    e.preventDefault();

}
function setStatusClosed(id) {
    var bugs_ar = JSON.parse(localStorage.getItem('bugs'));
  
    for (var i = 0; i < bugs_ar.length; i++) {
      if (bugs_ar[i].id == id) {
        bugs_ar[i].status = 'Closed';
      }
    }
  
    localStorage.setItem('bugs', JSON.stringify(bugs_ar));
  
    fetchBugs();
  }
  
  function deleteBug(id) {
    var bugs_ar = JSON.parse(localStorage.getItem('bugs'));
  
    for (var i = 0; i < bugs_ar.length; i++) {
      if (bugs_ar[i].id == id) {
        bugs_ar.splice(i, 1);
      }
    }
  
    localStorage.setItem('bugs', JSON.stringify(bugs_ar));
  
    fetchBugs();
  }



  function fetchBugs(){
    var bugs = JSON.parse(localStorage.getItem('bugs'));
    var bugsList = document.getElementById('bugsList');

    bugsList.innerHTML = '';

    for(var i = 0; i < bugs.length; i++){
        var id = bugs[i].id;
        var desc = bugs[i].description;
        var significance = bugs[i].significance;
        var assignedTo = bugs[i].assignedTo;
        var status = bugs[i].status;

        bugsList.innerHTML +=   '<div class="card card-body bg-light mt-4">'+
                                '<h6>Bug ID : ' + id + '</h6>'+
                                '<h5><span class="badge badge-primary">' + status + '</span></h>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><i class="fas fa-exclamation-circle"></i> ' + significance + '</p>'+
                                '<p><i class="fas fa-user"></i> ' + assignedTo + '</p>'+
                                '<div><a href="#" onclick ="setStatusClosed(\''+id+'\')" class="btn btn-warning" style="margin-right: 2px" >Close</a><a href="#" onclick ="deleteBug(\''+id+'\')" class="btn btn-danger mr-auto">Delete</a></div>' + 
                                // '<a href="#" onclick ="deleteBug(\''+id+'\')" class="btn btn-danger mr-auto">Delete</a> '+ 
                                '</div>';
    }
}   
