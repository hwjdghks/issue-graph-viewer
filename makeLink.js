class makeLink {
    constructor(url) {
        this.owner = url.split('/')[3];
        this.repo = url.split('/')[4];
        this.currentPage = 1;
        this.perPage = 100;
        this.direction = 'asc';
    }
    getMaxPage() {
        return this.maxPage;
    }
    setMaxPage(num) {
        this.maxPage = num;
    }

    getPerPage() {
        return this.perPage;
    }
    setPerPage(num) {
        this.perPage = num;
    }

    getCurrentPage() {
        return this.currentPage;
    }
    setCurrentPage(num) {
        this.currentPage = num;
    }

    getRepoString() {
        return `https://api.github.com/repos/${this.owner}/${this.repo}`;
    }

    getQueryString() {
        return this.getRepoString()
            + `/issues?state=all`
            + `&per_page=${this.perPage}`
            + `&page=${this.currentPage}`
            + `&direction=${this.direction}`;
    }
}

module.exports = makeLink;