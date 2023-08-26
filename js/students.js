const queryString = new URLSearchParams(location.search);
const studentId = queryString.get("students");

let birthData = ["asc", "desc",]
// console.log(studentId);

const studentModal = document.querySelector("#studentModal");
let teacherPagination = document.querySelector('.students__pagination');
let birthDayStudents = document.getElementById('birthDay__students');
let openModalBtn = document.querySelector('.open-modal-btn');
let teachLength = document.querySelector('.students__length');
let studentInner = document.querySelector('.students__inner');
let studentForm = document.querySelector('.students-form');
let firstName = document.getElementById('firstName__students');
let isMarried = document.getElementById('isMarried__students');
let lastName = document.getElementById('lastName__students');
let avatar = document.getElementById('avatar__students');
let groups = document.getElementById('birthDay__students');
let number = document.getElementById('number__students');
let email = document.getElementById('email__students');
let isWork = document.getElementById('isWork');
// console.log(studentInner);
// search, filter
let teacherSearch = document.querySelector('.students-search');
let nameSort = document.querySelector('.birthday-sort');
let teachFilter = document.querySelector('.teachs-filter');

// btn
let saveBtn = document.querySelector('.save-btn');

// Default code
nameSort.innerHTML = '<option value="all">All</option>';
teachFilter.innerHTML = `<option value="${studentId}">All</option>`;
let search = "";
let selected = null;

// for iterating
for (const iterator of birthData) {
  nameSort.innerHTML += `<option value="${iterator}">${iterator}</option>`
}

function studentMapping(student) {
  return `
    <div class="card rounded-5" style="width: 20rem;">
      <img src=${student.avatar} class="card-img-top rounded-5" alt="">
      <div class="card-body">
      <h5 class="card-title">${student.firstName}</h5>
        <h5 class="card-title">${student.lastName}</h5>
        <div class="d-flex justify-content-start gap-3">

        </div>
        <p class="card-text">${student.birthDay.split("T")[0]}</p>
        <p class="card-text">${student.email}</p>
        <p class="card-text">${student.phoneNumber.replace(/ x\d+$/, '')}</p>
        <p class="card-text">${student.isWork ? "worked" : "not work"}</p>
        <div class="d-flex justify-content-center gap-3">
          <button id="${student.id}" class="btn edit-btn" data-bs-toggle="modal" data-bs-target="#studentModal">Edit</button>
          <button id="${student.id}" class="btn delete-btn">Delete</button>
        </div>
      </div>
    </div>
  `;
}

// sortr birthday
nameSort.addEventListener("change", function () {
  search = teacherSearch.value;
  getTeach();
});


async function getTeach() {
  studentInner.append(loader());
  try {
    const params = { firstName: search };
    let paramsSearchPg = { firstName: search, limit: LIMIT, };

    const { data } = await request.get(`Teacher/${studentId}/Students`, { params });
    // console.log(data);
    let { data: dataWithPagination } = await request.get(`Teacher/${studentId}/Students`, {
      params: paramsSearchPg,
    });

    let teachData = await request.get("Teacher", { params });
    // console.log(teachData.data);

    teachData.data.map((i) => {
      // console.log(i.id);
      teachFilter.innerHTML += `<option value="${i.id}">${i.firstName}</option>`;
    });

    teachFilter.addEventListener('change', async function () {
      let ad = teachFilter.value;
      console.log(ad);
      const { data } = await request.get(`Teacher/${ad}/Students`, { params });
      console.log(data);

      studentInner.innerHTML = "";

      if (data.length == 0) {
        studentInner.innerHTML = "No students found."
        teachLength.innerHTML = data.length;
      } else {
        teachLength.innerHTML = data.length;
      }

      data.map(element => {
        studentInner.innerHTML += studentMapping(element);
        const studentInnerElements = document.querySelectorAll('.element');
        studentInnerElements.forEach(elem => {
          if (elem.innerText.includes(element.innerText) || element.innerText == "All") {
            elem.parentElement.parentElement.parentElement.style.display = "grid";
          } else {
            elem.parentElement.parentElement.parentElement.style.display = "none";
          }
        });
      });
    });

    // sort data
    if (nameSort.value !== "all") {
      dataWithPagination.sort((a, b) => {
        const nameA = a.birthDay.split("T")[0];
        const nameB = b.birthDay.split("T")[0];

        if (nameSort.value === "asc") {
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        } else {
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        }

        return 0;
      });
    }


    teachLength.innerHTML = data.length;
    if (data.length === 0) {
      studentInner.innerHTML = "No students found.";
    } else {
      studentInner.innerHTML = "";
    }

    dataWithPagination.map((student) => {
      // console.log(student);
      studentInner.innerHTML += studentMapping(student);
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.response.status);
  }
}

getTeach();


// student form
studentForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  let teacherData = {
    firstName: firstName.value,
    lastName: lastName.value,
    avatar: avatar.value,
    birthDayStudents: birthDayStudents.value.split("T")[0],
    phoneNumber: number.value,
    email: email.value,
    isWork: isWork.checked,
  };
  if (selected === null) {
    await request.post(`/Teacher/${studentId}/Students`, teacherData);
  } else {
    await request.put(`/Teacher/${studentId}/Students/${selected}`, teacherData);
  }
  // console.log(teacherData);

  getTeach();
  bootstrap.Modal.getInstance(studentModal).hide();
});

// function loading
function loader() {
  let loadBox = document.createElement("div");
  loadBox.classList.add("loader");
  return loadBox;
}


// form btn 
openModalBtn.addEventListener("click", () => {
  selected = null;
  firstName.value = "";
  lastName.value = "";
  avatar.value = "";
  birthDayStudents.value = "";
  number.value = "";
  email.value = "";
  isWork.checked = false;
  saveBtn.textContent = "Add student";
});
// console.log(openModalBtn);


// logic search 
teacherSearch.addEventListener("keyup", function () {
  search = this.value;
  getTeach();
});

// edit and delete functions
window.addEventListener("click", async (e) => {
  let id = e.target.getAttribute("id");

  // console.log(id);

  let checkEdit = e.target.classList.contains("edit-btn");
  // console.log(checkEdit);
  if (checkEdit) {
    selected = id;
    let { data } = await request.get(`/Teacher/${studentId}/Students/${id}`);
    console.log(data);
    console.log(studentForm);
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    avatar.value = data.avatar;
    birthDayStudents.value = data.birthDay.split("T")[0];
    number.value = data.phoneNumber;
    email.value = data.email;
    isWork.checked = data.isWork;
    saveBtn.textContent = "Save student";
  }

  let checkDelete = e.target.classList.contains("delete-btn");
  if (checkDelete) {
    let deleteConfirm = confirm("Do you want to delete this student?");
    if (deleteConfirm) {
      await request.delete(`/Teacher/${studentId}/Students/${id}`);
      getTeach();
    }
  }
});