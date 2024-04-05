class Project {
    constructor(title, description, teamsize, langcount, langsused, urlimage, url) {
        this.title = title;
        this.description = description;
        this.teamsize = teamsize;
        this.langcount = langcount;
        this.langsused = langsused.split(',');
        this.urlimage = urlimage;
        this.url = url;
    }
}

let Projects = []

function setBgColor(color) {
    style = getComputedStyle(document.body).getPropertyValue(color);
    document.body.style.setProperty('--selectedColor', style);
}

function loadProjectModal(path) {
    return (
    fetch(path)
    .then(response => response.text())
    .then(data => {
        let mainContainer = document.getElementById('mainSection');
        if (mainContainer) {
            mainContainer.innerHTML += data;
        }
    })
    );
}

function setProjectInfo(project) {
    let ProjectLogo = document.getElementById('ProjectLogo');
    let ProjectTitle = document.getElementById('ProjectTitle');
    let ProjectDescription = document.getElementById('ProjectDescription');
    let ProjectTeamSize = document.getElementById('ProjectTeamSize');
    let ProjectLangStack = document.getElementById('ProjectLangStack');

    ProjectLogo.src = project.urlimage;
    ProjectTitle.innerHTML = project.title;
    ProjectDescription.innerHTML = project.description;
    ProjectTeamSize.innerHTML = project.teamsize;
    for (let lang of project.langsused) {
        ProjectLangStack.innerHTML += `
        <div class="tooltip" data-tip="${lang}">
            <img class="w-16 drop-shadow-2xl" src="/img/Langs/${lang}.png">
        </div>`;
    }
    document.getElementById("CloseBtn").addEventListener('click', () => {
        document.getElementById('ProjectModal').remove();
        projectInfoClickHandler();
    });
}

function projectInfoClickHandler() {
    document.querySelectorAll("#Project").forEach((project) => {
        project.addEventListener('click', () => {
            let index = Array.from(document.getElementById("Projects").children).indexOf(project);
            loadProjectModal(`/html/projectInfo.html`).then(() =>
                setProjectInfo(Projects[index])
            );
        });
    });
}


function displayProject(project) {
    let projectContainer = document.getElementById('Projects');
    projectContainer.innerHTML += `<img id="Project" class="rounded fade-in-fwd w-64" src="${project.urlimage}" />`;
}

function fetchProjects() {
    let projectContainer = document.getElementById('Projects');
    LoadingAnimation.then(response => projectContainer.innerHTML = response);
    fetch('https://api.meftah.me/api/v1/projects' ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            projectContainer.innerHTML = '<h1 class="text-3xl text-center text-white">No projects available</h1>';
            return;
        }
        projectContainer.innerHTML = '';
        for ([key, value] of Object.entries(data)) {
            let project = new Project(value.title, value.description, value.teamsize, value.langcount, value.langsused, value.image, value.url);
            Projects.push(project);
            displayProject(project);
        }
        projectInfoClickHandler();
    })
    .catch(() => {
        console.log('Error fetching projects');
    });
    
}

function fetchExperience() {
    let experienceContainer = document.getElementById('Experiences');
    LoadingAnimation.then(response => experienceContainer.innerHTML += response);
    fetch('https://api.meftah.me/api/v1/experiences' ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0 || Object.keys(data).length === 0) {
            experienceContainer.innerHTML = '<h2 class="text-xl text-center text-white">No job experience available</h2>';
            return;
        }
        experienceContainer.innerHTML = 'Found Something, This is a placeholder for now';
    })
    .catch(() => {
        experienceContainer.innerHTML = '<h2 class="text-lg md:text-xl text-center text-white">Cannot connect to the backend server</h2>';
    });
}

function loadAnimation() {
    switch (window.location.pathname) {
        case "/":
            setBgColor('--magenta');
            break;
        case "/about":
            setBgColor('--aqua');
            break;
        case "/projects":
            setBgColor('--darkpurple');
            break;
        case "/experience":
            setBgColor('--nightblue');
            break;
    }
}

function loadSideFunctions() {
    switch (window.location.pathname) {
        case "/":
            break;
        case "/about":
            break;
        case "/projects":
            fetchProjects();
            break;
        case "/experience":
            fetchExperience();
            break;
    }
}

function navigationListener() {
    let Buttons = [];
    Buttons.push(document.getElementById('AboutD'));
    Buttons.push(document.getElementById('ProjectsD'));
    Buttons.push(document.getElementById('ExperienceD'));
    Buttons.push(document.getElementById('AboutM'));
    Buttons.push(document.getElementById('ProjectsM'));
    Buttons.push(document.getElementById('ExperienceM'));

    Buttons.forEach((button) => {
        button.addEventListener('mouseover', function() {
            switch(button.id) {
                case 'AboutD' :
                case 'AboutM':
                    button.classList.add('aqua-infinite');
                    break;
                case 'ProjectsD':
                case 'ProjectsM':
                    button.classList.add('darkpurple-infinite');
                    break;
                case 'ExperienceD':
                case 'ExperienceM':
                    button.classList.add('nightblue-infinite');
                    break;
            }
        });
        button.addEventListener('mouseout', function() {
            switch(button.id) {
                case 'AboutD' :
                case 'AboutM':
                    button.classList.remove('aqua-infinite');
                    break;
                case 'ProjectsD':
                case 'ProjectsM':
                    button.classList.remove('darkpurple-infinite');
                    break;
                case 'ExperienceD':
                case 'ExperienceM':
                    button.classList.remove('nightblue-infinite');
                    break;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.includes('index')) {
        window.location.href = '/'
    }
    navigationListener();
});