import BasicPage from "./BasicPage.js";
import Pagination from "../components/Pagination.js";
import UsersService from "../services/UsersService.js";
import drawTable from "../components/RepositoriesTable.js";

export default class UserProfile extends BasicPage {
    constructor(params) {
        super({title: params.id, ...params});
        this.init();
        this.getUser(params.id)
    }

    init() {
        this.backLink = document.createElement('a');
        this.backLink.setAttribute('href', '/users');
        this.backLink.innerHTML = '< Back to Users';
        this.header.appendChild(this.backLink);

        this.repoTable = document.createElement('div');
        this.repoTable.classList.add('repos-table');

        this.repoTableHeader = document.createElement('div');
        this.repoTableHeader.classList.add('page-header');
        const title = document.createElement('div');
        title.innerHTML = 'Repositories';
        this.repoTableHeader.appendChild(title);
        this.pagination = new Pagination({getRecords: (api) => this.getRepos('', api)});
        this.repoTableHeader.appendChild(this.pagination.btnWrapper);
        this.repoTable.appendChild(this.repoTableHeader);

        this.repoTableContent = document.createElement('div');
        this.repoTableContent.classList.add('repos-table-content');
        this.repoTable.appendChild(this.repoTableContent);

        this.userContent = document.createElement('div');
        this.userContent.classList.add('user-wrapper');
        this.contentWrapper.appendChild(this.userContent);
        this.contentWrapper.appendChild(this.repoTable)
    }

    getUser(id) {
        UsersService.getUserById({id})
            .then(({status, json: user}) => {
                if (status === 200) {
                    this.getRepos(user.login);
                    this.drawUser(user)
                } else {
                    this.contentWrapper.innerHTML = 'User not found';
                }
            })
    }

    drawUser(user) {
        const userImg = document.createElement('img');
        userImg.setAttribute('src', user.avatar_url);

        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info');

        const title = document.createElement('h2');
        title.innerHTML = 'User info';
        userInfo.appendChild(title);

        const nameP = document.createElement('h3');
        nameP.innerHTML = user.login;
        userInfo.appendChild(nameP);

        if (user.location) {
            const locationP = document.createElement('p');
            locationP.innerHTML = `Located in ${user.location}`;
            userInfo.appendChild(locationP);
        }

        if (user.company) {
            const workP = document.createElement('p');
            workP.innerHTML = `Working in ${user.company} company`;
            userInfo.appendChild(workP);
        }

        const followersP = document.createElement('p');
        followersP.innerHTML = `Have ${user.followers} followers`;
        userInfo.appendChild(followersP);

        const profileLink = document.createElement('a');
        profileLink.setAttribute('href', user.html_url);
        profileLink.setAttribute('target', 'blank');
        profileLink.innerHTML = 'View profile on Github';
        userInfo.appendChild(profileLink);

        this.userContent.appendChild(userImg);
        this.userContent.appendChild(userInfo);

    }

    getRepos(login, api) {
        UsersService.getUserRepos({login, per_page: this.per_page, api}).then(res => {
            if (res.status === 200) {
                this.pagination.setLinks(res.link || []);
                this.repoTableContent.innerHTML = '';
                const table = drawTable(res.json);
                table ? this.repoTableContent.appendChild(table) : this.repoTableContent.innerHTML = 'No records found :(';
            } else {
                this.repoTableContent.innerHTML = res.json.message || 'Some Error occurred';
            }
        });
    }
}