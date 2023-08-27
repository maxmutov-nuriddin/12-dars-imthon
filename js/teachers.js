let datas = ["asc", "desc",]
let married = [false, true,]

// all
const studentModal = document.querySelector("#studentModal");

let teacherPagination = document.querySelector('.teacher__pagenation');
let openModalBtn = document.querySelector('.open-modal-btn');
let teachLength = document.querySelector('.teach__length');
let teachInner = document.querySelector('.teacher__inner');
let teacherForm = document.querySelector('.teacher-form');
let firstName = document.getElementById('firstName');
let isMarried = document.getElementById('isMarried');
let lastName = document.getElementById('lastName');
let avatar = document.getElementById('avatar');
let groups = document.getElementById('groups');
let number = document.getElementById('number');
let email = document.getElementById('email');


// search, filter
let teacherSearch = document.querySelector('.teacher-search');
let nameSort = document.querySelector('.name-sort');
let marriedFilter = document.querySelector('.married-filter');

// btn
let saveBtn = document.querySelector('.save-btn');

// defolt kod
nameSort.innerHTML = '<option value="all">All</option>';
marriedFilter.innerHTML = '<option value="all">All</option>';
let search = "";
let activePage = 1;
let selected = null;


// function mapping
function teacherMapping(teachers) {
  return `
  <div class="card rounded-5" style="width: 18rem;">
    <img src=${teachers.avatar} class="card-img-top rounded-5" alt=${teachers.firstName}>
    <div class="card-body">
      <h5 class="card-title">${teachers.firstName}</h5>
      <h5 class="card-title">${teachers.lastName}</h5>
      <div class="d-flex justify-content-start gap-3">      
      ${teachers.groups.map(group => `<p class="card-text">${group}</p>`).join("")}
      </div>
      <p class="card-text">${teachers.phoneNumber.split("x")[0]}</p>
      <p class="card-text">${teachers.email}</p>
      <p class="card-text">${teachers.isMaried ? "married" : "not married"}</p>
      <button id="${teachers.id}"  class="btn edit-btn" data-bs-toggle="modal" data-bs-target="#studentModal">Edit</button>
      <button id="${teachers.id}" class="btn delete-btn">Delete</button>
      <a href="students.html?students=${teachers.id}" class="btn see-students">Students</a>
    </div>
  </div>
  `
}

// filters
for (const iterator of datas) {
  nameSort.innerHTML += `<option value="${iterator}">${iterator}</option>`
}
for (const iterator of married) {
  marriedFilter.innerHTML += `<option value="${iterator}">${iterator ? "Not Married" : "Married"}</option>`
}

//sort click
nameSort.addEventListener("change", function () {
  search = teacherSearch.value;
  getTeach();
});

marriedFilter.addEventListener("change", function () {
  search = teacherSearch.value;
  getTeach();
});

// function axios(fetch)
async function getTeach() {
  teachInner.append(loader());
  try {
    let params = { firstName: search };
    let paramsSearchPg = { firstName: search, page: activePage, limit: LIMIT };

    if (nameSort.value !== "all") {
      params.sortBy = "lastName";
      params.order = nameSort.value;
    }

    let { data } = await request.get("Teacher", { params });
    console.log(data);
    let { data: dataWithPagination } = await request.get("Teacher", {
      params: paramsSearchPg,
    });

    // sort
    if (nameSort.value !== "all") {
      dataWithPagination.sort((a, b) => {
        const nameA = a.lastName;
        const nameB = b.lastName;

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

    //filter isMarried
    if (marriedFilter.value !== "all") {
      dataWithPagination = data.filter((filters) => {
        if (marriedFilter.value !== "true") {
          return filters.isMaried === true;
        } else {
          return filters.isMaried === false;
        }
      });
    }
    console.log(dataWithPagination);

    // pagination
    let pages = Math.ceil(data.length / LIMIT);

    teacherPagination.innerHTML = `<li class="page-item ${activePage === 1 ? "disabled" : ""
      }">
      <button page="-" class="page-link">Previous</button>
    </li>`;

    for (let i = 1; i <= pages; i++) {
      teacherPagination.innerHTML += `
        <li class="page-item ${i === activePage ? "active" : ""}">
          <button page="${i}" class="page-link">${i}</button>
        </li>
      `;
    }

    teacherPagination.innerHTML += `<li class="page-item ${activePage === pages ? "disabled" : ""
      }">
      <button page="+" class="page-link">Nex</button>
    </li>`;

    teachLength.innerHTML = data.length;
    if (data.length === 0) {
      teachInner.innerHTML = "Not Found Teach.";
    } else {
      teachInner.innerHTML = "";
    }
    dataWithPagination.map((teach) => {
      teachInner.innerHTML += teacherMapping(teach);
    });
  } catch (err) {
    console.log(err.message);
  }
}
getTeach();


// teacher form
teacherForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  let teacherData = {
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    avatar: this.avatar.value,
    groups: this.groups.value.split(" "),
    phoneNumber: number.value.split("x")[0],
    email: this.email.value,
    isMaried: isMarried.checked,
  };
  if (selected === null) {
    await request.post("Teacher", teacherData);
  } else {
    await request.put(`Teacher/${selected}`, teacherData);
  }
  console.log(teacherData);


  console.log(this.value);

  getTeach()
  bootstrap.Modal.getInstance(studentModal).hide();
})


// form btn 
openModalBtn.addEventListener("click", () => {
  selected = null;
  teacherForm.firstName.value = "",
    teacherForm.lastName.value = "",
    teacherForm.avatar.value = "",
    teacherForm.groups.value = "",
    number.value = "",
    teacherForm.email.value = "",
    isMarried.checked = false,
    saveBtn.textContent = "Add teachers";
});


// logic search 
teacherSearch.addEventListener("keyup", function () {
  activePage = 1
  search = this.value;
  getTeach();
});

// function loading
function loader() {
  let loadBox = document.createElement("div");
  loadBox.classList.add("loader");
  return loadBox;
}
// console.log(loader());

// pagination function
teacherPagination.addEventListener("click", (e) => {
  let page = e.target.getAttribute("page");
  if (page !== null) {
    if (page === "+") {
      activePage++;
    } else if (page === "-") {
      activePage--;
    } else {
      activePage = +page;
    }
    getTeach();
  }
});

// edit and delete functions
window.addEventListener("click", async (e) => {
  let id = e.target.getAttribute("id");

  // console.log(id);

  let checkEdit = e.target.classList.contains("edit-btn");
  // console.log(checkEdit);
  if (checkEdit) {
    selected = id;
    let { data } = await request.get(`Teacher/${id}`);
    // console.log(data); 
    teacherForm.firstName.value = data.firstName,
      teacherForm.lastName.value = data.lastName,
      teacherForm.avatar.value = data.avatar,
      teacherForm.groups.value = data.groups,
      number.value = data.phoneNumber,
      teacherForm.email.value = data.email,
      isMarried.checked = data.isMaried,
      saveBtn.textContent = "Save teacher";
  }

  let checkDelete = e.target.classList.contains("delete-btn");
  if (checkDelete) {
    let deleteConfirm = confirm("Do you want to delete this teacher?");
    if (deleteConfirm) {
      await request.delete(`Teacher/${id}`);
      getTeach();
    }
  }
});

