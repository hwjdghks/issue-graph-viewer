export class makeLink {
    constructor(_url) {
        this._owner = _url.split('/')[3];
        this._repo = _url.split('/')[4];
        this._currentPage = 1;
        this._perPage = 100;
        this._direction = 'asc';
    }
    get maxPage() {
        return this._maxPage;
    }
    set maxPage(num) {
        this._maxPage = num;
    }

    get perPage() {
        return this._perPage;
    }
    set perPage(num) {
        this._perPage = num;
    }

    get currentPage() {
        return this._currentPage;
    }
    set currentPage(num) {
        this._currentPage = num;
    }

    get repoString() {
        return `https://api.github.com/repos/${this._owner}/${this._repo}`;
    }

    get queryString() {
        return this.repoString
            + `/issues?state=all`
            + `&per_page=${this._perPage}`
            + `&page=${this._currentPage}`
            + `&direction=${this._direction}`;
    }
}

export function hasLink(data) {
    if (data === null)
        return false;
    else
        return true;
}