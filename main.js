var projects = [];
var projectId = 0;

class Project {
  constructor(id) {
    this.name = id;
    this.sprints = [];
    projectId++;
  }
}

class Sprint {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.issues = [];
  }
}

let addSprint = (e) => {
  const projectID = parseInt(e.target.id.slice(-1));
  const projectSprint = projects[projectID].sprints;
  const newSprint = new Sprint(projectSprint.length, sprintId);
  projectSprint.push(newSprint);


  let sprint = document.getElementById('sprint');
  const el = document.createElement('OPTION');
  el.innerHTML = `${newSprint.id}`;
  sprint.appendChild(el);
}

var sprintId = 0;

var users = { '1': 'Radu', '2': 'Alex', '3': 'Maria' };

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

  try {
    if (isNaN(id)) {
      window.alert("Employee Number must be....a number");
    }
    else if (id in users) {
      window.alert("User already exists!");
    } else {
      users[id] = name;
      window.alert("User added succesfuly!");
    }
  }
  finally {
    const el = document.createElement('OPTION');
    el.innerHTML = `${name} - ${id}`;
    createdBy.appendChild(el);
  }
};

const addProject = () => {
  projects[projectId] = new Project(projectId);
  updateprojectNames();
  console.log(projects);

  let project = document.getElementById('project');
  const el = document.createElement('OPTION');
  el.innerHTML = `${projects[projectId - 1].name}`;
  project.appendChild(el);

};

class Issue {
  constructor(type, name, sprint, createdBy, assignee, description, comment) {
    const id = issuesId;
    issuesId++;
    this.type = type;
    this.name = name;
    this.sprint = sprint.id;
    this.createdBy = createdBy.name;
    this.assignee = users[assignee];
    this.description = description;
    this.status = "New";
    this.tasks = [];
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
  sprintTo.lastChild.addEventListener('click', addSprint);
}

let updateAll = () => {
  let createdBy = document.getElementById('createdBy');
  let assignedTo = document.getElementById('assignedTo');


  for (const [id, name] of Object.entries(users)) {
    const el = document.createElement('OPTION');
    el.innerHTML = `${name} - ${id}`;
    createdBy.appendChild(el);
  }

  for (const [id, name] of Object.entries(users)) {
    const el = document.createElement('OPTION');
    el.innerHTML = `${name} - ${id}`;
    assignedTo.appendChild(el);
  }
}

let addIssue = () => {
  const type = document.getElementById('issueType');
  const typeVal = type.options[type.selectedIndex].text;

  const created = document.getElementById('createdBy');
  const createdVal = created.options[created.selectedIndex].text;

  const assign = document.getElementById('assignedTo');
  const assignVal = assign.options[assign.selectedIndex].text;

  const sprint = document.getElementById('sprint');
  const sprintVal = sprint.options[sprint.selectedIndex].value;

  const project = document.getElementById('project');
  const projectVal = project.options[project.selectedIndex].value;

  const description = document.getElementById('description').value;
  const comment = document.getElementById('comment').value;
  const name = document.getElementById('name').value;

  issues.push(window['issue' + issuesId] = new Issue(typeVal, name, sprintVal, createdVal, assignVal, description, comment));
  console.log(issues);
}

window.onload = () => {
  document.getElementById('addUser').addEventListener('click', addUser);
  document.getElementById('addProjectBtn').addEventListener('click', addProject);
  document.getElementById('addIssue').addEventListener('click', addIssue);
  updateAll();
}