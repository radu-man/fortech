const createdBy = document.getElementById('createdBy');
const assignedTo = document.getElementById('assignedTo');
const type = document.getElementById('issueType');

const listContainer = document.getElementById('issueList');

const editComment = document.getElementById('editComment');
const editDescription = document.getElementById('editDescription');
const modalTitle = document.getElementById('issueIdForm');
const projectFormId = document.getElementById('projectForm');
const editAssign = document.getElementById('editAssign');
const editSprint = document.getElementById('editSprint');
const editStatus = document.getElementById('editStatus');

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

class Comment {
  constructor(text) {
    this.id = commentsId;
    this.text = text;
    commentsId++;
  }
}

const addProject = () => {
  projects[projectId] = new Project(projectId);
  updateprojectNames();
  console.log(projects);

  let project = document.getElementById('project');
  const el = document.createElement('OPTION');
  el.innerHTML = `${projects[projectId - 1].name}`;
  project.appendChild(el);

};

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

  const filterSprint = document.getElementById('filterSprintSelect');
  const new_sprint = document.createElement('OPTION');
  new_sprint.innerHTML = `${newSprint.name} - ${newSprint.id}`;
  filterSprint.appendChild(new_sprint);
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

  const commentText = document.getElementById('comment').value;
  const comment = new Comment(commentText);
  comments.push(comment);
  const commentRef = comments[commentsId - 1];

  const name = document.getElementById('name').value;

  //adds issue to issues list 
  issues.push(new Issue(typeVal, name, sprintVal, createdVal, assignVal, description, commentRef, projectVal));
  //adds reference from the list to each sprint in the project
  projects[projectVal].sprints[sprintVal].issues.push(issues[issuesId]);
  displayIssues(issuesId);
  issuesId++;
  document.getElementById("issueID").value = issuesId;
  console.log(projects);
}
//adds issues to list in the DOM
const displayIssues = (id) => {

  let template = `Issue (${issues[id].name}) ID: ${issues[id].id}, Type: ${issues[id].type}, created by 
                  ${issues[id].createdBy} for ${issues[id].assignee}, on sprint ${issues[id].sprint}. STATUS: ${issues[id].status}`;
  let comments = `<p>Comment: ${issues[id].comment.text}</p>`;
  let description = `<p>Description: ${issues[id].description}</p>`;

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.onclick = updateIssue;
  li.appendChild(checkbox);
  li.insertAdjacentHTML('beforeend', comments);
  li.insertAdjacentHTML('beforeend', description);
  li.appendChild(document.createTextNode(template));
  li.classList.add('list-group-item');
  listContainer.appendChild(li);
}

const updateIssue = (e) => {
  const id = e.target.id;

  editComment.value = issues[id].comment.text;
  editDescription.innerText = issues[id].description;
  modalTitle.innerText = issues[id].id;
  projectFormId.innerText = issues[id].project;


  const projectID = parseInt(issues[id].project);

  while (editAssign.firstChild) {
    editAssign.removeChild(editAssign.firstChild);
  }
  for (const [id, name] of Object.entries(users)) {
    const el = document.createElement('OPTION');
    el.innerHTML = `${name} - ${id}`;
    editAssign.appendChild(el);
  }

  while (editSprint.firstChild) {
    editSprint.removeChild(editSprint.firstChild);
  }

  const sprint = document.getElementById('editSprint');

  for (let i = 0; i < projects.length; i++) {

    for (let j = 0; j < projects[i].sprints.length; j++) {
      const el = document.createElement('OPTION');
      el.innerHTML = `${projects[i].sprints[j].id}`;
      sprint.appendChild(el);
    }
  }

  for (let i; i < projects[projectID].sprints.length; i++) {
    const el = document.createElement('OPTION');
    el.innerHTML = projects[projectID].sprints[i].id;
    editSprint.appendChild(el);
  }
}

const submitUpdate = () => {
  const updateIssueId = parseInt(document.getElementById('issueIdForm').textContent);


  const new_sprint = editSprint.options[editSprint.selectedIndex].value;
  issues[updateIssueId].comment.text = editComment.value;
  issues[updateIssueId].assignee = editAssign.options[editAssign.selectedIndex].value;
  issues[updateIssueId].description = editDescription.value;
  issues[updateIssueId].sprint = new_sprint;
  issues[updateIssueId].status = editStatus.options[editStatus.selectedIndex].value;
  issues[updateIssueId].updatedAt = new Date();

  console.log(projects);
  console.log(issues);
  const message = document.getElementById('msg');
  message.innerText = 'Updated';
}
const clearList = () => {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
}

const filterBySprint = () => {
  clearList();
  const filter = document.getElementById('filterSprintSelect');
  const val = filter.options[filter.selectedIndex].value;
  const sprint_id = parseInt(val.slice(-1));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].sprint === sprint_id.toString()) {
      displayIssues(i);
    }
  }
}

const filterByStatus = () => {
  clearList();
  const filter = document.getElementById('filterStatusSelect');
  const val = filter.options[filter.selectedIndex].value;

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].status === val) {
      displayIssues(i);
    }
  }
}

window.onload = () => {
  document.getElementById("issueID").value = issuesId;
  document.getElementById('addUser').addEventListener('click', addUser);
  document.getElementById('addProjectBtn').addEventListener('click', addProject);
  document.getElementById('addIssue').addEventListener('click', addIssue);
  document.getElementById('filterSprintBtn').addEventListener('click', filterBySprint);
  document.getElementById('filterStatusBtn').addEventListener('click', filterByStatus);
  updateAll();
}