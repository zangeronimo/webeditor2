import WebUser from '../models/WebUser';

export default {
    render(webUser: WebUser) {
        return {
            id: webUser.id,
            name: webUser.name,
            email: webUser.email,
            password: webUser.password,
            active: webUser.active,
            webCompany: webUser.webCompany,
            addAt: webUser.add_at,
        };
    },

    renderMany(webUser: WebUser[]) {
        return webUser.map(webuser => this.render(webuser));
    }
};