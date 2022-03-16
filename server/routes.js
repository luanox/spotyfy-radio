import config from './config.js';
import { logger } from './util.js';
import { Controller } from './controller.js';

const controller = new Controller();
async function routes(req, res) {
    const { method, url } = req;

    if(method === 'GET' && url === '/') {
        res.writeHead(302, {
            'Location': config.location.home
        });

        return res.end();
    }

    if(method === 'GET' && url === '/home') {
        const {
            stream
        } = await controller.getFileStream(config.pages.homeHTML);

        return stream.pipe(res);
    }

    if(method === 'GET' && url === '/controller') {
        const {
            stream
        } = await controller.getFileStream(config.pages.controllerHTML);

        return stream.pipe(res);
    }

    if(method === 'GET') {
        const {
            stream
        } = await controller.getFileStream(url);

        return stream.pipe(res);
    }

    res.writeHead(404);
    return res.end('hello');
}

function handlerError(error, res) {
    if(error.message.includes('ENOENT')) {
        logger.warn(`asset not found ${error.stack}`);
        res.writeHead(404);
        return res.end();
    }

    logger.error(`caught error on API ${error.stack}`);
    res.writeHead(500);
    return res.end();
}

export function handler (req, res) {
    return routes(req, res)
        .catch(error => handlerError(error, res));
}