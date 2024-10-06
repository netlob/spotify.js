"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const Manager_1 = require("../Manager");
class UserManager extends Manager_1.Manager {
    /**
     * @description Get a user by ID.
     * @param  {string} id The ID of the user.
     * @returns {Promise<UserPublic>} Returns a promise with the {@link UserPublic}.
     */
    async get(id) {
        const res = await this.http.get(`/v1/users/${id}`);
        return res.data;
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=UserManager.js.map