import WebCompany from '../models/WebCompany';

export default {
    render(webCompany: WebCompany) {
        return {
            id: webCompany.id,
            name: webCompany.name,
            email: webCompany.email,
            password: webCompany.password,
            active: webCompany.active,
        };
    },

    renderMany(webCompany: WebCompany[]) {
        return webCompany.map(webcompany => this.render(webcompany));
    }
};