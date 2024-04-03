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

function displayProject(project) {
    let projectContainer = document.getElementById('Projects');
    projectContainer.innerHTML += `
    <div class="avatar fade-in-fwd" id="Project">
        <div class="w-64 rounded">
            <img src="${project.urlimage}" />
        </div>
    </div>`;
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
            setTimeout(displayProject(project), 2000 * key);
        }
    })
    .catch(() => {
        console.log('Error fetching projects');
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