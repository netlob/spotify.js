import { chunk } from '../../util';
import { Album } from '../../interfaces/Spotify';
import { Manager } from '../Manager';

export class AlbumManager extends Manager {
  /**
   * @description Get a album by ID.
   * @param {string} id The ID of the album.
   * @returns {Promise<Album>} Returns a promise with a single {@link Album}.
   */
  async get(id: string): Promise<Album> {
    const res = await this.http.get(`/albums/${id}`);

    return (await res.json()) as Album;
  }

  /**
   * @description Get multiple albums by ID.
   * @param {string[]} ids Array of IDs.
   * @returns {Promise<Album[]>} Returns a promise with an array of {@link Album}s.
   */
  async list(ids: string[]): Promise<Album[]> {
    const albums = await Promise.all(
      chunk([...ids], 20).map(async (chunk) => {
        const res = await this.http.get('/albums', { query: { ids: chunk.join(',') } });
        const json = await res.json();

        return json.albums as Album[];
      })
    );

    return [].concat(...albums);
  }
}
