import {readFile} from 'node:fs/promises'
import {writeFile} from 'node:fs/promises'
import {Hash} from 'node:crypto'
import {v4 as uuidv4} from 'uuid'
import {getDate} from "./divers.js";

/* Chemin de stockage des blocks */
const path = '../data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
        try {
            const data = await readFile(path, 'utf8');
            return JSON.parse(data)
        }catch (error) {
            throw error;
        }
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
    // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const blocks = await findBlocks();
    if (blocks.length > 0)
        return blocks[blocks.length -1]
    return null;
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {

    const id = uuidv4();
    const currentDate = getDate();

    const oldBlocks = await findBlocks()
    const lastBlock = await findLastBlock()
    let lastBlockHash = null
    if(lastBlock !== null)
        lastBlockHash = Hash('sha256').update(JSON.stringify(lastBlock)).digest('hex')

    const newBlock = {
        "id": id,
        "nom": contenu.nom,
        "don": contenu.don,
        "date": currentDate,
        ...(lastBlockHash !== null && {"hash": lastBlockHash}),
    }

    oldBlocks.push(newBlock)

    await writeFile(path, JSON.stringify(oldBlocks))

}


