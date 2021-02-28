import Users from "./pages/Users.js";
import Repositories from "./pages/Repositories.js";
import UserProfile from "./pages/UserProfile.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/users", basePath:'users', view: Users },
        { path: "/users/:id", basePath:'users', view: UserProfile },
        { path: "/repositories", basePath:'repositories',view: Repositories }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    /**Setting active link*/
    for (const aTag of document.getElementById('nav').getElementsByTagName('a')){
        aTag.id === `${match.route.basePath}-link` ? aTag.classList.add("active") : aTag.classList.remove("active")
    }

    /**Remove all children before setting content*/
    document.querySelector("#app").innerHTML='';
    document.querySelector("#app").appendChild( await view.getHtml());

};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});