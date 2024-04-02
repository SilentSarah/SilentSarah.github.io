const LoadingAnimation = fetch('html/loading.html').then(response => response.text());
const ErrorLoading = fetch('html/error.html').then(response => response.text());

const routes = [
    {
        title: 'Hicham\'s Portfolio',
        active: false,
        path: '/',
        content: () => GrabHTML('/html/home.html'),
    },
    {
        title: 'About',
        active: false,
        path: '/about',
        content: () => GrabHTML('/html/about.html'),
    },
    {
        title: 'Projects',
        active: false,
        path: '/projects',
        content: () => GrabHTML('/html/projects.html'),
    },
    {
        title: 'Experience',
        active: false,
        path: '/experience',
        content: () => GrabHTML('/html/experience.html'),
    },
]

async function GrabHTML(path) {
    const response = await fetch(path);
    return await response.text();
}

async function router() {
    const path = window.location.pathname;
    const route = routes.find(route => route.path === path);
    let mainContent = document.getElementById('mainSection');
    if (route) {
        if (route.active) return;
        mainContent.innerHTML = await LoadingAnimation;
        route.active = true;
        document.title = route.title;
        mainContent.innerHTML = await route.content();
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].path !== path) {
                routes[i].active = false;
            }
        }
    } else {
        mainContent.innerHTML = await ErrorLoading;
    }
    loadAnimation();
    loadSideFunctions();
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, this.href);
            router();
        });
    });

});

router();