var projects = [];
var projectId = 0;

class Project {
  constructor(name, text) {
    this.name = name;
    this.text = text;
    this.sprints = [];
  }
}


var sprintId = 0;

var users = { '1': 'Radu', '2': 'Alex' };

var comments = [];
var commentsId = 0;

var issues = [];
var issuesId = 0;

const status = [
  "New",
  "In progress",
  "Feedback",
  "Rework",
  "Resolved",
  "Ready for Testing"
];

//add user after searching for unique ID(to make sure is not registered allready)
const addUser = () => {
  let id = document.getElementById('employeeId').value;
  let name = document.getElementById('employeeName').value;

  if (isNaN(id)) {
    window.alert("Employee Number must be....a number");
  }
  else if (id in users) {
    window.alert("User already exists!");
  } else {
    users[id] = name;
    window.alert("User added succesfuly!");
  }
};

const addProject = () => {
  projects[projectId] = [];
  projectId++;
  updateprojectNames();
};

class Issue {
  constructor(type, name, sprint, createdBy, assignee, description, tasks, comment) {
    this.id = issues.length;
    this.type = type;
    this.name = name;
    this.sprint = sprint.id;
    this.createdBy = createdBy.name;
    this.assignee = users[assignee];
    this.description = description;
    this.status = "New";
    this.tasks = tasks;
    this.comment = comment;
    this.updatedAt;
    this.createdAt = new Date();
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  };
}

document.getElementById("issueID").value = issuesId;

let updateprojectNames = () => {
  //updates the little number on the 'Projects' button
  var projectNames = Object.keys(projects);
  document.getElementById('projectBadge').innerHTML = projectNames.length;

  //adds the projects to the dropdown menu under 'Add sprint to project...'
  let sprintTo = document.getElementById('dropdown-menu');
  let last = projects.length - 1;
  let option = `<a id="p-${last}"class="dropdown-item" href="#">Project Number - ${Object.keys(projects)[last]}</a>`;
  sprintTo.insertAdjacentHTML('beforeend', option);
}

let updateAll = () => {
  let createdBy = document.getElementById('createdBy');
  let assignedTo = document.getElementById('assignedTo');
  let sprint = document.getElementById('sprint');
  let project = document.getElementById('project');
  let second = [createdBy, assignedTo, sprint, project];

  let oldcreatedBy = createdBy.childNodes;
  let oldassignedTo = assignedTo.childNodes;
  let oldsprint = sprint.childNodes;
  let oldproject = project.childNodes;
  let toRemove = [oldassignedTo, oldcreatedBy, oldproject, oldsprint];

  for (let i; i < toRemove.length; i++) {
    for (let i; i < toRemove[i].length; i++) {
      console.log('remoe');
      toRemove[i].remove();
    }
  }
}

window.onload = () => {
  document.getElementById('addUser').addEventListener('click', addUser);
  document.getElementById('addProjectBtn').addEventListener('click', addProject);
  updateAll();
}

let createdBy = document.getElementById('createdBy');
for (let i; i < users.length; i++) {
  console.log('sssss');
  let item = document.createElement('option');
  item.innerHTML = users[i];
  createdBy.insertAdjacentHTML('beforeend', item);
  console.log(item);
}