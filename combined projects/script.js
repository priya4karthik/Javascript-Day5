
  // ===== TASK 1: STUDENT REGISTRATION =====

  let students = JSON.parse(localStorage.getItem("students")) || [];

  function renderStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
      table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.course}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">
              Delete
            </button>
          </td>
        </tr>
      `;
    });
  }

  function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
  }

  document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Inputs
    const name = studentName.value.trim();
    const email = studentEmail.value.trim();
    const course = studentCourse.value.trim();

    // Errors reset
    nameError.innerText = "";
    emailError.innerText = "";
    courseError.innerText = "";

    let valid = true;

    if (name === "") {
      nameError.innerText = "Name is required";
      valid = false;
    }

    if (email === "") {
      emailError.innerText = "Email is required";
      valid = false;
    }

    if (course === "") {
      courseError.innerText = "Course is required";
      valid = false;
    }

    if (!valid) return;

    // Save
    students.push({ name, email, course });
    localStorage.setItem("students", JSON.stringify(students));

    // Reset
    this.reset();
    renderStudents();
  });

  // Initial load
  renderStudents();

// ===============================
// TASK 2: LOGIN & LOGOUT
// ===============================

// Check login status on load
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("loggedInUser");

  if (isLoggedIn === "true" && username) {
    showLoggedIn(username);
  }
});

function showLoggedIn(username) {
  const form = document.getElementById("loginForm");
  const box = document.getElementById("loggedInBox");

  if (!form || !box) return;

  form.classList.add("d-none");
  box.classList.remove("d-none");
  document.getElementById("loggedInUser").innerText = username;
}

function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");

  document.getElementById("loginForm").classList.remove("d-none");
  document.getElementById("loggedInBox").classList.add("d-none");
}

// Login submit
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    loginUserError.innerText = "";
    loginPassError.innerText = "";

    let valid = true;

    if (!username) {
      loginUserError.innerText = "Username required";
      valid = false;
    }

    if (!password) {
      loginPassError.innerText = "Password required";
      valid = false;
    }

    if (!valid) return;

    // Fake authentication (demo)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username);

    showLoggedIn(username);
    loginForm.reset();
  });
});
// ===============================
// TASK 3: TO-DO MANAGER
// ===============================

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  const list = document.getElementById("todoList");
  if (!list) return;

  list.innerHTML = "";

  todos.forEach((todo, index) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span 
          style="cursor:pointer; ${todo.completed ? 'text-decoration:line-through;color:gray;' : ''}"
          onclick="toggleTodo(${index})">
          ${todo.text}
        </span>

        <div>
          <button class="btn btn-warning btn-sm me-1" onclick="editTodo(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const error = document.getElementById("todoError");
  const text = input.value.trim();

  error.innerText = "";

  if (!text) {
    error.innerText = "Task cannot be empty";
    return;
  }

  todos.push({ text, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));

  input.value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

// Initial render
document.addEventListener("DOMContentLoaded", renderTodos);
// ===============================
// TASK 4: NOTES APP
// ===============================

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  const list = document.getElementById("notesList");
  if (!list) return;

  list.innerHTML = "";

  notes.forEach((note, index) => {
    list.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <p class="card-text">${note}</p>
          </div>
          <div class="card-footer text-end">
            <button class="btn btn-warning btn-sm me-1" onclick="editNote(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteNote(${index})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

function addNote() {
  const textArea = document.getElementById("noteText");
  const error = document.getElementById("noteError");
  const text = textArea.value.trim();

  error.innerText = "";

  if (!text) {
    error.innerText = "Note cannot be empty";
    return;
  }

  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));

  textArea.value = "";
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function editNote(index) {
  const updated = prompt("Edit note:", notes[index]);
  if (updated !== null && updated.trim() !== "") {
    notes[index] = updated.trim();
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }
}

// Initial render
document.addEventListener("DOMContentLoaded", renderNotes);
// ===============================
// TASK 5: USER PROFILE MANAGER
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (savedProfile) {
    showProfile(savedProfile);
  }
});

document.getElementById("profileForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = profileName.value.trim();
  const email = profileEmail.value.trim();
  const phone = profilePhone.value.trim();
  const bio = profileBio.value.trim();

  profileNameError.innerText = "";
  profileEmailError.innerText = "";

  let valid = true;

  if (!name) {
    profileNameError.innerText = "Name required";
    valid = false;
  }

  if (!email) {
    profileEmailError.innerText = "Email required";
    valid = false;
  }

  if (!valid) return;

  const profile = { name, email, phone, bio };
  localStorage.setItem("userProfile", JSON.stringify(profile));

  showProfile(profile);
});

function showProfile(profile) {
  document.getElementById("profileForm").classList.add("d-none");
  document.getElementById("profilePreview").classList.remove("d-none");

  viewName.innerText = profile.name;
  viewEmail.innerText = profile.email;
  viewPhone.innerText = profile.phone || "-";
  viewBio.innerText = profile.bio || "-";
}

function editProfile() {
  const profile = JSON.parse(localStorage.getItem("userProfile"));

  if (!profile) return;

  profileName.value = profile.name;
  profileEmail.value = profile.email;
  profilePhone.value = profile.phone;
  profileBio.value = profile.bio;

  document.getElementById("profileForm").classList.remove("d-none");
  document.getElementById("profilePreview").classList.add("d-none");
}
// ===============================
// TASK 6: CONTACT MANAGEMENT
// ===============================

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function renderContacts() {
  const table = document.getElementById("contactTable");
  if (!table) return;

  table.innerHTML = "";

  contacts.forEach((contact, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email || "-"}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactName.value.trim();
    const phone = contactPhone.value.trim();
    const email = contactEmail.value.trim();

    contactNameError.innerText = "";
    contactPhoneError.innerText = "";

    let valid = true;

    if (!name) {
      contactNameError.innerText = "Name is required";
      valid = false;
    }

    if (!phone) {
      contactPhoneError.innerText = "Phone is required";
      valid = false;
    }

    if (!valid) return;

    contacts.push({ name, phone, email });
    localStorage.setItem("contacts", JSON.stringify(contacts));

    form.reset();
    renderContacts();
  });

  renderContacts();
});
// ===============================
// TASK 7: FEEDBACK COLLECTION
// ===============================

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function renderFeedbacks() {
  const list = document.getElementById("feedbackList");
  if (!list) return;

  list.innerHTML = "";

  feedbacks.forEach((item, index) => {
    list.innerHTML += `
      <li class="list-group-item">
        <strong>Rating:</strong> ${item.rating} ⭐
        <br>
        <strong>Comment:</strong> ${item.comment}
      </li>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const rating = feedbackRating.value;
    const comment = feedbackComment.value.trim();

    ratingError.innerText = "";
    commentError.innerText = "";

    let valid = true;

    if (!rating) {
      ratingError.innerText = "Rating is required";
      valid = false;
    }

    if (!comment) {
      commentError.innerText = "Comment is required";
      valid = false;
    }

    if (!valid) return;

    feedbacks.push({ rating, comment });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    form.reset();
    renderFeedbacks();
  });

  renderFeedbacks();
});
// ===============================
// TASK 8: EXPENSE TRACKER
// ===============================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function renderExpenses() {
  const table = document.getElementById("expenseTable");
  if (!table) return;

  let income = 0;
  let expense = 0;

  table.innerHTML = "";

  transactions.forEach((item, index) => {
    if (item.type === "income") income += item.amount;
    else expense += item.amount;

    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.desc}</td>
        <td>${item.amount}</td>
        <td>${item.type}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalIncome").innerText = income;
  document.getElementById("totalExpense").innerText = expense;
  document.getElementById("balance").innerText = income - expense;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderExpenses();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expenseForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const desc = expenseDesc.value.trim();
    const amount = Number(expenseAmount.value);
    const type = expenseType.value;

    expenseDescError.innerText = "";
    expenseAmountError.innerText = "";
    expenseTypeError.innerText = "";

    let valid = true;

    if (!desc) {
      expenseDescError.innerText = "Description required";
      valid = false;
    }

    if (!amount || amount <= 0) {
      expenseAmountError.innerText = "Valid amount required";
      valid = false;
    }

    if (!type) {
      expenseTypeError.innerText = "Select type";
      valid = false;
    }

    if (!valid) return;

    transactions.push({ desc, amount, type });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    form.reset();
    renderExpenses();
  });

  renderExpenses();
});
// ===============================
// TASK 9: DAILY TASK PLANNER
// ===============================

let dailyTasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

function renderDailyTasks() {
  const list = document.getElementById("dailyTaskList");
  if (!list) return;

  list.innerHTML = "";

  dailyTasks.forEach((item, index) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.date}</strong> — ${item.task}
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteDailyTask(${index})">
          Delete
        </button>
      </li>
    `;
  });
}

function deleteDailyTask(index) {
  dailyTasks.splice(index, 1);
  localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
  renderDailyTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dailyTaskForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = taskDate.value;
    const task = dailyTaskInput.value.trim();

    dateError.innerText = "";
    dailyTaskError.innerText = "";

    let valid = true;

    if (!date) {
      dateError.innerText = "Date required";
      valid = false;
    }

    if (!task) {
      dailyTaskError.innerText = "Task required";
      valid = false;
    }

    if (!valid) return;

    dailyTasks.push({ date, task });
    localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));

    form.reset();
    renderDailyTasks();
  });

  renderDailyTasks();
});
// ===============================
// TASK 10: PASSWORD STRENGTH CHECKER
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("passwordInput");
  if (!passwordInput) return;

  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    let strength = 0;

    // Rules
    const rules = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Update rule colors
    ruleLength.className = rules.length ? "text-success" : "text-danger";
    ruleUpper.className = rules.upper ? "text-success" : "text-danger";
    ruleLower.className = rules.lower ? "text-success" : "text-danger";
    ruleNumber.className = rules.number ? "text-success" : "text-danger";
    ruleSpecial.className = rules.special ? "text-success" : "text-danger";

    strength = Object.values(rules).filter(Boolean).length;

    // Strength text + progress
    if (strength <= 2) {
      strengthText.innerText = "Weak";
      strengthText.className = "text-danger fw-bold";
      strengthBar.style.width = "33%";
      strengthBar.className = "progress-bar bg-danger";
    } else if (strength <= 4) {
      strengthText.innerText = "Medium";
      strengthText.className = "text-warning fw-bold";
      strengthBar.style.width = "66%";
      strengthBar.className = "progress-bar bg-warning";
    } else {
      strengthText.innerText = "Strong";
      strengthText.className = "text-success fw-bold";
      strengthBar.style.width = "100%";
      strengthBar.className = "progress-bar bg-success";
    }
  });
});
// TASK 11: REAL-TIME FORM VALIDATION
document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("name11");
  const email = document.getElementById("email11");
  const btn = document.getElementById("submit11");

  if (!name || !email) return;

  function validate11() {
    let valid = true;

    if (name.value.length < 3) {
      name11Error.innerText = "Minimum 3 characters";
      valid = false;
    } else name11Error.innerText = "";

    if (!email.value.includes("@")) {
      email11Error.innerText = "Invalid email";
      valid = false;
    } else email11Error.innerText = "";

    btn.disabled = !valid;
  }

  name.addEventListener("input", validate11);
  email.addEventListener("input", validate11);
});
// TASK 12: SEARCH & FILTER
const products12 = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

function renderProducts12(list) {
  productList12.innerHTML = "";
  list.forEach(p => {
    productList12.innerHTML += `<li class="list-group-item">${p}</li>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!search12) return;
  renderProducts12(products12);

  search12.addEventListener("input", () => {
    const value = search12.value.toLowerCase();
    renderProducts12(products12.filter(p => p.toLowerCase().includes(value)));
  });
});
// TASK 13: DASHBOARD NAVIGATION
function showTab(tab) {
  document.querySelectorAll(".tab13").forEach(t => t.classList.add("d-none"));
  document.getElementById(tab).classList.remove("d-none");
}
// TASK 14: MULTI-STEP FORM
function nextStep(step) {
  ["step1", "step2", "step3"].forEach(id =>
    document.getElementById(id).classList.add("d-none")
  );
  document.getElementById("step" + step).classList.remove("d-none");
}
// TASK 15: THEME SWITCHER
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;

  document.body.className = localStorage.getItem("theme") || "";

  btn.onclick = () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
    localStorage.setItem("theme", document.body.className);
  };
});
// ===============================
// TASK 16: LOGIN ATTEMPTS TRACKER
// ===============================
let loginAttempts16 = 0;
const MAX_ATTEMPTS16 = 3;
const correctUser16 = "admin";
const correctPass16 = "123";

document.getElementById("loginForm16")?.addEventListener("submit", function(e){
  e.preventDefault();
  if (loginAttempts16 >= MAX_ATTEMPTS16) {
    loginMsg16.innerText = "Account locked";
    return;
  }

  const user = loginUser16.value.trim();
  const pass = loginPass16.value.trim();

  if(user === correctUser16 && pass === correctPass16){
    loginMsg16.innerText = "Login successful ✅";
    loginAttempts16 = 0;
  } else {
    loginAttempts16++;
    loginMsg16.innerText = "Incorrect credentials ❌";
  }

  attempts16.innerText = `Attempts: ${loginAttempts16}/${MAX_ATTEMPTS16}`;
});

// ===============================
// TASK 17: USER FEEDBACK DASHBOARD
// ===============================
const feedbacks17 = [
  {type:'positive'}, {type:'neutral'}, {type:'negative'}, 
  {type:'positive'}, {type:'positive'}, {type:'neutral'}
];
document.addEventListener("DOMContentLoaded", () => {
  let pos = feedbacks17.filter(f=>f.type==='positive').length;
  let neu = feedbacks17.filter(f=>f.type==='neutral').length;
  let neg = feedbacks17.filter(f=>f.type==='negative').length;

  positive17.innerText = pos;
  neutral17.innerText = neu;
  negative17.innerText = neg;
});

// ===============================
// TASK 18: BASIC ADMIN PANEL
// ===============================
let adminUsers18 = JSON.parse(localStorage.getItem("adminUsers18")) || [];

function renderAdmin18(){
  adminTable18.innerHTML = "";
  adminUsers18.forEach((u,i)=>{
    adminTable18.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteAdmin18(${i})">Delete</button></td>
      </tr>
    `;
  });
}

function deleteAdmin18(index){
  adminUsers18.splice(index,1);
  localStorage.setItem("adminUsers18", JSON.stringify(adminUsers18));
  renderAdmin18();
}

document.getElementById("adminForm18")?.addEventListener("submit", function(e){
  e.preventDefault();
  const name = adminName18.value.trim();
  const email = adminEmail18.value.trim();
  if(!name || !email) return;
  adminUsers18.push({name,email});
  localStorage.setItem("adminUsers18", JSON.stringify(adminUsers18));
  this.reset();
  renderAdmin18();
});

document.addEventListener("DOMContentLoaded", renderAdmin18);

// ===============================
// TASK 19: FORM SUBMISSION HISTORY
// ===============================
let history19 = JSON.parse(localStorage.getItem("history19")) || [];
function renderHistory19(){
  historyList19.innerHTML = "";
  history19.forEach((h,i)=>{
    historyList19.innerHTML += `<li class="list-group-item">${i+1}. ${h.name} - ${h.email}</li>`;
  });
}

document.getElementById("historyForm19")?.addEventListener("submit", function(e){
  e.preventDefault();
  const name = historyName19.value.trim();
  const email = historyEmail19.value.trim();
  if(!name || !email) return;
  history19.push({name,email});
  localStorage.setItem("history19", JSON.stringify(history19));
  this.reset();
  renderHistory19();
});
document.addEventListener("DOMContentLoaded", renderHistory19);

// ===============================
// ===============================
// TASK 20: NOTIFICATION CENTER
// ===============================

// Array to store notifications
let notifications20 = [];

// Function to render notifications
function renderNotifications20() {
  const list = document.getElementById("notificationList20");
  if (!list) return;

  list.innerHTML = ""; // clear existing list

  // Loop and add <li> items
  for (let i = 0; i < notifications20.length; i++) {
    const n = notifications20[i];
    const li = document.createElement("li"); // create element safely
    li.className = "list-group-item";
    li.textContent = n; // safer than innerHTML
    list.appendChild(li);
  }
}

// Function to add a notification
function addNotification(msg) {
  notifications20.push(msg);
  renderNotifications20();
}

// Optional: initialize empty list on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderNotifications20();
});

// ===============================
// TASK 21: RESPONSIVE NAVIGATION
// ===============================
// No extra JS needed; Bootstrap handles toggle

// ===============================
// TASK 22: USER ACTIVITY TRACKER
// ===============================
let clickCount22 = 0;
document.getElementById("clickBtn22")?.addEventListener("click", ()=>{
  clickCount22++;
  document.getElementById("clickCount22").textContent = clickCount22;
});

// ===============================
// TASK 23: PROFILE COMPLETION STATUS
// ===============================
let profileProgress23 = 0;
document.getElementById("increaseProfile23")?.addEventListener("click", ()=>{
  if(profileProgress23 < 100) profileProgress23 += 20;
  const bar = document.getElementById("profileBar23");
  bar.style.width = profileProgress23 + "%";
  bar.textContent = profileProgress23 + "%";
});

// ===============================
// TASK 24: SURVEY FORM
// ===============================
document.getElementById("surveyForm24")?.addEventListener("submit", (e)=>{
  e.preventDefault();
  const val = document.querySelector('input[name="survey24"]:checked')?.value || "No selection";
  document.getElementById("surveyResult24").textContent = val;
});

// ===============================
// TASK 25: SIMPLE CHAT UI
// ===============================
document.getElementById("chatSend25")?.addEventListener("click", ()=>{
  const input = document.getElementById("chatInput25");
  const val = input.value.trim();
  if(!val) return;
  const chatBox = document.getElementById("chatBox25");
  const p = document.createElement("p");
  p.textContent = val;
  chatBox.appendChild(p);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
});

// ===============================
// TASK 26: USER SETTINGS AUTO-SAVE
// ===============================
document.addEventListener("DOMContentLoaded", ()=>{
  const nameInput = document.getElementById("settingName26");
  const emailInput = document.getElementById("settingEmail26");
  const msg = document.getElementById("saveMsg26");

  // Load saved
  if(localStorage.getItem("settings26")){
    const s = JSON.parse(localStorage.getItem("settings26"));
    nameInput.value = s.name || "";
    emailInput.value = s.email || "";
  }

  [nameInput,emailInput].forEach(el=>{
    el.addEventListener("input", ()=>{
      const s = {name:nameInput.value,email:emailInput.value};
      localStorage.setItem("settings26", JSON.stringify(s));
      msg.textContent = "Saved";
      setTimeout(()=>{msg.textContent="";},1000);
    });
  });
});

// ===============================
// TASK 27: PRODUCT MANAGEMENT WITH SEARCH
// ===============================
const products27 = ["Laptop","Phone","Tablet","Camera","Headphones"];
function renderProducts27(list){
  const ul = document.getElementById("productList27");
  if(!ul) return;
  ul.innerHTML = "";
  list.forEach(p=>{
    const li = document.createElement("li");
    li.textContent = p;
    li.className = "list-group-item";
    ul.appendChild(li);
  });
}
document.getElementById("productSearch27")?.addEventListener("input", ()=>{
  const val = document.getElementById("productSearch27").value.toLowerCase();
  renderProducts27(products27.filter(p=>p.toLowerCase().includes(val)));
});
renderProducts27(products27);

// ===============================
// TASK 28: REGISTRATION APPROVAL
// ===============================
let registrations28 = [
  {name:"Alice",status:"pending"},
  {name:"Bob",status:"approved"}
];
function renderReg28(){
  const ul = document.getElementById("regList28");
  if(!ul) return;
  ul.innerHTML = "";
  registrations28.forEach((r,i)=>{
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `${r.name} - <strong>${r.status}</strong>`;
    if(r.status==="pending"){
      const btn = document.createElement("button");
      btn.className = "btn btn-success btn-sm";
      btn.textContent = "Approve";
      btn.addEventListener("click", ()=>{ r.status="approved"; renderReg28(); });
      li.appendChild(btn);
    }
    ul.appendChild(li);
  });
}
renderReg28();

// ===============================
// TASK 29: FORM DRAFT SAVE
// ===============================
document.addEventListener("DOMContentLoaded", ()=>{
  const nameInput = document.getElementById("draftName29");
  const emailInput = document.getElementById("draftEmail29");

  // Load saved
  if(localStorage.getItem("draft29")){
    const s = JSON.parse(localStorage.getItem("draft29"));
    nameInput.value = s.name || "";
    emailInput.value = s.email || "";
  }

  [nameInput,emailInput].forEach(el=>{
    el.addEventListener("input", ()=>{
      const s = {name:nameInput.value,email:emailInput.value};
      localStorage.setItem("draft29", JSON.stringify(s));
    });
  });
});

// ===============================
// TASK 30: SESSION TIMEOUT WARNING
// ===============================
let sessionTimeout30;
function startSession30(){
  clearTimeout(sessionTimeout30);
  document.getElementById("sessionMsg30").textContent="Session active";
  sessionTimeout30 = setTimeout(()=>{
    document.getElementById("sessionMsg30").textContent="Session expired ⚠️";
  },10000); // 10s demo
}
document.addEventListener("DOMContentLoaded", ()=>{
  document.body.addEventListener("mousemove", startSession30);
  startSession30();
});
// ===============================
// TASK 31: MINI CRM
// ===============================
let customers31 = JSON.parse(localStorage.getItem("customers31")) || [];
function renderCRM31(){
  const ul = document.getElementById("crmList31");
  if(!ul) return;
  ul.innerHTML="";
  customers31.forEach(c=>{
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent=`${c.name} - ${c.email}`;
    ul.appendChild(li);
  });
}
document.getElementById("crmForm31")?.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("crmName31").value.trim();
  const email = document.getElementById("crmEmail31").value.trim();
  if(!name||!email) return;
  customers31.push({name,email});
  localStorage.setItem("customers31", JSON.stringify(customers31));
  e.target.reset();
  renderCRM31();
});
document.addEventListener("DOMContentLoaded", renderCRM31);

// ===============================
// TASK 32: SUPPORT TICKET SYSTEM
// ===============================
let tickets32 = [];
function renderTickets32(){
  const ul=document.getElementById("ticketList32");
  if(!ul) return;
  ul.innerHTML="";
  tickets32.forEach(t=>{
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent=t;
    ul.appendChild(li);
  });
}
document.getElementById("ticketAdd32")?.addEventListener("click", ()=>{
  const val=document.getElementById("ticketInput32").value.trim();
  if(!val) return;
  tickets32.push(val);
  document.getElementById("ticketInput32").value="";
  renderTickets32();
});
document.addEventListener("DOMContentLoaded", renderTickets32);

// ===============================
// TASK 33: EMPLOYEE ATTENDANCE
// ===============================
let attendance33=[];
function renderAttendance33(){
  const ul=document.getElementById("attendanceList33");
  if(!ul) return;
  ul.innerHTML="";
  attendance33.forEach(a=>{
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent=a;
    ul.appendChild(li);
  });
}
document.getElementById("presentBtn33")?.addEventListener("click", ()=>{
  attendance33.push("Present");
  renderAttendance33();
});
document.getElementById("absentBtn33")?.addEventListener("click", ()=>{
  attendance33.push("Absent");
  renderAttendance33();
});

// ===============================
// TASK 34: DASHBOARD ANALYTICS
// ===============================
// Static, no JS needed

// ===============================
// TASK 35: FORM WIZARD
// ===============================
function wizardNext35(step){
  ["wizardStep1","wizardStep2","wizardStep3"].forEach(id=>document.getElementById(id).classList.add("d-none"));
  document.getElementById("wizardStep"+step).classList.remove("d-none");
}

// ===============================
// TASK 36: USER ROLE MANAGEMENT
// ===============================
let roles36 = [
  {name:"Admin",role:"admin"},
  {name:"John",role:"user"}
];
function renderRoles36(){
  const ul=document.getElementById("roleList36");
  if(!ul) return;
  ul.innerHTML="";
  roles36.forEach(r=>{
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent=`${r.name} - ${r.role}`;
    ul.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded", renderRoles36);

// ===============================
// TASK 37: SIMPLE POLLING
// ===============================
let votes37={Yes:0,No:0};
function vote37(val){
  votes37[val]++;
  document.getElementById("yesCount37").textContent=votes37.Yes;
  document.getElementById("noCount37").textContent=votes37.No;
}

// ===============================
// TASK 38: PROFILE IMAGE UPLOAD & PREVIEW
// ===============================
document.getElementById("profileImg38")?.addEventListener("change", e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{ document.getElementById("previewImg38").src=reader.result; };
  reader.readAsDataURL(file);
});

// ===============================
// TASK 39: NOTIFICATION PREFERENCE
// ===============================
document.addEventListener("DOMContentLoaded", ()=>{
  const emailCb = document.getElementById("emailNotify39");
  const smsCb = document.getElementById("smsNotify39");
  const saved = JSON.parse(localStorage.getItem("notify39")) || {};
  emailCb.checked = saved.email || false;
  smsCb.checked = saved.sms || false;

  [emailCb,smsCb].forEach(cb=>{
    cb.addEventListener("change", ()=>{
      localStorage.setItem("notify39", JSON.stringify({email:emailCb.checked,sms:smsCb.checked}));
    });
  });
});

// ===============================
// TASK 40: USER LOGIN HISTORY
// ===============================
let loginHistory40 = ["2026-01-01 10:00","2026-01-02 12:30"];
document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.getElementById("loginHistory40");
  if(!ul) return;
  loginHistory40.forEach(h=>{
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent=h;
    ul.appendChild(li);
  });
});
// ===============================
// TASK 41: E-LEARNING COURSE LISTING
// ===============================
// TASK 41: E-LEARNING COURSE LISTING with Search
const courses41 = [
  {title:"HTML Basics", level:"Beginner"},
  {title:"CSS Fundamentals", level:"Beginner"},
  {title:"JavaScript Essentials", level:"Intermediate"},
  {title:"React JS", level:"Advanced"},
  {title:"Node JS", level:"Advanced"}
];

function renderCourses41(list){
  const ul = document.getElementById("courseList41");
  if(!ul) return;
  ul.innerHTML="";
  list.forEach(c=>{
    const li = document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.innerHTML=`<span>${c.title}</span><span class="badge bg-secondary">${c.level}</span>`;
    ul.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderCourses41(courses41);

  const searchInput = document.getElementById("courseSearch41");
  searchInput?.addEventListener("input", ()=>{
    const val = searchInput.value.toLowerCase();
    renderCourses41(courses41.filter(c=>c.title.toLowerCase().includes(val)));
  });
});

// ===============================
// TASK 42: TASK PROGRESS MONITORING
// ===============================
const tasks42=[{name:"Task A",status:"Pending"},{name:"Task B",status:"Completed"}];
document.addEventListener("DOMContentLoaded", ()=>{
  const ul=document.getElementById("taskList42");
  if(!ul) return;
  tasks42.forEach(t=>{
    const li=document.createElement("li");
    li.className="list-group-item";
    li.textContent=`${t.name} - ${t.status}`;
    ul.appendChild(li);
  });
});

// ===============================
// TASK 43: FORM VALIDATION RULES MANAGER
// ===============================
let rules43=[];
document.getElementById("addRule43")?.addEventListener("click", ()=>{
  const val=document.getElementById("ruleName43").value.trim();
  if(!val) return;
  rules43.push(val);
  const ul=document.getElementById("ruleList43");
  const li=document.createElement("li");
  li.className="list-group-item";
  li.textContent=val;
  ul.appendChild(li);
  document.getElementById("ruleName43").value="";
});

// ===============================
// TASK 44: USER ACCOUNT DEACTIVATION
// ===============================
document.getElementById("deactivate44")?.addEventListener("click", ()=>{
  document.getElementById("status44").textContent="Status: Deactivated ❌";
});

// ===============================
// TASK 45: MINI PROJECT TRACKER
// ===============================
let projects45=[];
document.getElementById("addProj45")?.addEventListener("click", ()=>{
  const val=document.getElementById("projName45").value.trim();
  if(!val) return;
  projects45.push(val);
  const ul=document.getElementById("projList45");
  const li=document.createElement("li");
  li.className="list-group-item";
  li.textContent=val;
  ul.appendChild(li);
  document.getElementById("projName45").value="";
});

// ===============================
// TASK 46: SYSTEM SETTINGS DASHBOARD
// ===============================
document.getElementById("darkMode46")?.addEventListener("change", e=>{
  if(e.target.checked){
    document.body.classList.add("bg-dark","text-white");
  } else {
    document.body.classList.remove("bg-dark","text-white");
  }
});

// ===============================
// TASK 47: USER REPORT GENERATION
// ===============================
document.getElementById("genReport47")?.addEventListener("click", ()=>{
  const pre=document.getElementById("report47");
  pre.textContent=`Report Generated at ${new Date().toLocaleString()}`;
});

// ===============================
// TASK 48: BASIC BOOKING FORM
// ===============================
let bookings48=[];
document.getElementById("bookBtn48")?.addEventListener("click", ()=>{
  const name=document.getElementById("bookName48").value.trim();
  const date=document.getElementById("bookDate48").value;
  if(!name||!date) return;
  bookings48.push({name,date});
  const ul=document.getElementById("bookList48");
  const li=document.createElement("li");
  li.className="list-group-item";
  li.textContent=`${name} - ${date}`;
  ul.appendChild(li);
  document.getElementById("bookName48").value="";
  document.getElementById("bookDate48").value="";
});

// ===============================
// TASK 49: FORM-BASED CALCULATOR
// ===============================
document.getElementById("calc49")?.addEventListener("click", ()=>{
  const n1=Number(document.getElementById("num149").value);
  const n2=Number(document.getElementById("num249").value);
  document.getElementById("result49").textContent=n1+n2;
});

// ===============================
// TASK 50: MINI ADMIN DASHBOARD
// ===============================
let adminUsers50=JSON.parse(localStorage.getItem("adminUsers50"))||[];
function renderAdmin50(){
  const tbody=document.getElementById("adminTable50");
  if(!tbody) return;
  tbody.innerHTML="";
  adminUsers50.forEach((u,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${i+1}</td><td>${u.name}</td><td>${u.email}</td><td><button class="btn btn-danger btn-sm">Delete</button></td>`;
    tr.querySelector("button").addEventListener("click", ()=>{
      adminUsers50.splice(i,1);
      localStorage.setItem("adminUsers50", JSON.stringify(adminUsers50));
      renderAdmin50();
    });
    tbody.appendChild(tr);
  });
}
document.getElementById("adminForm50")?.addEventListener("submit", e=>{
  e.preventDefault();
  const name=document.getElementById("adminName50").value.trim();
  const email=document.getElementById("adminEmail50").value.trim();
  if(!name||!email) return;
  adminUsers50.push({name,email});
  localStorage.setItem("adminUsers50", JSON.stringify(adminUsers50));
  e.target.reset();
  renderAdmin50();
});
document.addEventListener("DOMContentLoaded", renderAdmin50);
