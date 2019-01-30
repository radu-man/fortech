var projects = [];
var projectId = 0;
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
    sprintId++;
  }
}

class Issue {
  constructor(type, name, sprint, createdBy, assignee, description, comment, forProject) {
    this.id = issuesId;
    issuesId++;
    this.type = type;
    this.name = name;
    this.sprint = sprint;
    this.createdBy = createdBy;
    this.assignee = assignee;
    this.description = description;
    this.status = "New";
    this.tasks = [];
    this.comment = comment;
    this.updatedAt;
    this.createdAt = new Date();
    this.project = forProject;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  };
}

const addSprint = (e) => {
  const projectID = parseInt(e.target.id.slice(-1));
  const projectSprint = projects[projectID].sprints;
  const name = document.getElementById('sprintName').value;
  const newSprint = new Sprint(sprintId, name);
  projectSprint.push(newSprint);


  const sprint = document.getElementById('sprint');
  const el = document.createElement('OPTION');
  el.innerHTML = `${newSprint.id}`;
  sprint.appendChild(el);
}

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

      let createdBy = document.getElementById('createdBy');
      let el = document.createElement('OPTION');
      el.innerHTML = `${name} - ${id}`;
      createdBy.appendChild(el);
      window.alert("User added succesfuly!");
    }
  }
  finally {
    let assignedTo = document.getElementById('assignedTo');
    let el = document.createElement('OPTION');
    el.innerHTML = `${name} - ${id}`;
    assignedTo.appendChild(el);
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

const updateprojectNames = () => {
  //updates the number on the 'Projects' button
  var projectNames = Object.keys(projects);
  document.getElementById('projectBadge').innerHTML = projectNames.length;

  //adds the projects to the dropdown menu under 'Add sprint to project...'
  let sprintTo = document.getElementById('dropdown-menu');
  let last = projects.length - 1;
  let option = `<a id="p-${last}"class="dropdown-item" href="#">Project Number - ${Object.keys(projects)[last]}</a>`;
  sprintTo.insertAdjacentHTML('beforeend', option);
  sprintTo.lastChild.addEventListener('click', addSprint);
}

const updateAll = () => {
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

const addIssue = () => {
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

  issues.push(new Issue(typeVal, name, sprintVal, createdVal, assignVal, description, comment, projectVal));
  projects[projectVal].sprints[sprintId] = issues[issuesId - 1];
  document.getElementById("issueID").value = issuesId;
  displayIssues(issuesId - 1);
}

let displayIssues = (id) => {
  const listContainer = document.getElementById('issueList');
  let template = `Issue (${issues[id].name}) ID: ${issues[id].id}, Type: ${issues[id].type}, created by 
                  ${issues[id].createdBy} for ${issues[id].assignee}, on sprint ${issues[id].sprint}. STATUS: ${issues[id].status}`;
  let comments = `<p>Comment: ${issues[id].comment}</p>`;
  let description = `<p>Description: ${issues[id].description}</p>`;
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  li.appendChild(checkbox);
  checkbox.id = id;
  checkbox.onclick = updateIssue;
  li.insertAdjacentHTML('beforeend', comments);
  li.insertAdjacentHTML('beforeend', description);
  li.appendChild(document.createTextNode(template));
  li.classList.add('list-group-item');
  listContainer.appendChild(li);
}

const updateIssue = (e) => {
  const id = e.target.id;
  console.log(id);
  document.getElementById('editComment').value = issues[id].comment;
}

window.onload = () => {
  document.getElementById("issueID").value = issuesId;
  document.getElementById('addUser').addEventListener('click', addUser);
  document.getElementById('addProjectBtn').addEventListener('click', addProject);
  document.getElementById('addIssue').addEventListener('click', addIssue);
  updateAll();
}