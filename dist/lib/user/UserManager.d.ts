import { UserPublic } from '../../interfaces/Spotify';
import { Manager } from '../Manager';
export declare class UserManager extends Manager {
    /**
     * @description Get a user by ID.
     * @param  {string} id The ID of the user.
     * @returns {Promise<UserPublic>} Returns a promise with the {@link UserPublic}.
     */
    get(id: string): Promise<UserPublic>;
}
