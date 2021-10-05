var projectsApi = 'http://localhost:3000/projects';
var projectsApi = 'http://localhost:3000/projects';

function start() {
    getprojects(renderprojects)
    handleCreatForm()
}

start();

// Functions
function getprojects(callback) {
    return fetch(projectsApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function getprojectById(id) {
    const project = getprojects(projects => {
        const project = projects.find(project => {
            return project.id === id;
        })
        return project;
    })
    return project;
}

function handleCreateproject(project, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }
    fetch(projectsApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);

}

function handleCreatForm() {
    const createBtn = document.getElementById('create-btn');
    createBtn.onclick = function () {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const URLImage = document.getElementById('URLImage').value;

        if (name !== '' && description !== '' && URLImage !== '') {
            const project = {
                title: name,
                description: description,
                url_image: URLImage
            }
            handleCreateproject(project, getprojects(renderprojects));
        }
        else {
          alert("Please fill out the form completely")
        }
    }
}

function handleDeleteproject(id) {
    fetch(projectsApi + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            getprojects(renderprojects)
        });
}

function handleUpdateproject(id) {
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const URLImage = document.getElementById('URLImage');

    const updateBtn = document.getElementById('update-btn');
    const createBtn = document.getElementById('create-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    getprojectById(id+1)
        .then(function (project) {
            name.value = project.title;
            description.value = project.description;
            URLImage.value = project.url_image

            // update project
            updateBtn.onclick = function () {
                const data = {
                    title: name.value,
                    description: description.value,
                    url_image: URLImage.value
                }
                if (name !== '' && description !== '' && URLImage !== '') {
                    fetch(projectsApi + '/' + (id+1), {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function () {
                            getprojects(renderprojects)
                        });
                }
            }

            cancelBtn.onclick = function () {
                name.value = '';
                description.value = '';
                URLImage.value = '';

                createBtn.classList.remove('hide');
                cancelBtn.classList.add('hide');
                updateBtn.classList.add('hide');
            }
        })

}

function renderprojects(projects) {
    var root = document.querySelector('.root');
    var htmls = '';
    projects.forEach(function (project) {
        htmls += `
        <div class="col l-4 m-6 c-12">
            <div class="booking-item">
                <div class="menuBtn"><i class="fas fa-bars"></i></div>
                <div class="editmenu">
                    <div class="editBtn">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="delete-project" onclick="handleDeleteproject(${project.id})">
                        <i class="far fa-trash-alt"></i>
                    </div>
                    <div class="exitMenu"><i class="far fa-caret-square-up"></i></div>
                </div>
                <div style="background-image: url(${project.url_image})" class="image"></div>
                <h2 id="title-${project.id}">${project.title}</h2>
                <p id="desc-${project.id}">${project.description}</p>
            </div>
        </div>
        `
    });
    root.innerHTML = htmls;
    handleEditElement()
}

function scrollBottom() {
    let height = document.querySelector('Body').offsetHeight
    window.scrollTo(0, height - 280)
}

function handleEditElement() {
    const editBtns = document.querySelectorAll('.editBtn')

    const createBtn = document.getElementById('create-btn')
    const updateBtn = document.getElementById('update-btn')
    const cancelBtn = document.getElementById('cancel-btn')

    const menuBtns = document.querySelectorAll('.menuBtn')
    const exitMenu = document.querySelectorAll('.exitMenu')
    const menuEdits = document.querySelectorAll('.editmenu')

    menuBtns.forEach((menuBtn, index) => {
        menuBtn.onclick = function() {
            menuBtn.style.transform = 'translateY(-112%)'
            menuEdits[index].style.transform = 'translateY(0px)'
            exitMenu[index].onclick = function() {
                menuBtn.style.transform = 'translateY(0px)'
                menuEdits[index].style.transform = 'translateY(-112%)'
            }
        }
    })

    editBtns.forEach((editBtn, index) => {
        editBtn.onclick = () => {
            handleUpdateproject(index)
            scrollBottom()
            createBtn.classList.add('hide')
            updateBtn.classList.remove('hide')
            cancelBtn.classList.remove('hide')
        }
        cancelBtn.onclick = () => {
            createBtn.classList.remove('hide')
            updateBtn.classList.add('hide')
            cancelBtn.classList.add('hide')

            const name = document.getElementById('name');
            const description = document.getElementById('description');
            const URLImage = document.getElementById('URLImage');

            name.value = ''
            description.value = ''
            URLImage.value = ''
        }
    })
}