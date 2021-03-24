import express from 'express';
import * as fs from 'fs';
import open from 'open';
import path from 'path';
import logger from 'morgan';

const app = express();
const port = 8000;

app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, '../src')));

interface DirPath {
    [name: string]: string[];
}

interface Result {
    [name: string]: DirPath;
}

const getHtmlPath = (dirPath: string) => {
    const names = fs.readdirSync(dirPath);
    const result: DirPath = {};
    names.forEach((name) => {
        const files = fs.readdirSync(path.join(dirPath, name));
        const htmlFilesName = files.filter((fileName) => /\.html/.test(fileName));
        if (htmlFilesName.length > 0) {
            result[name] = htmlFilesName.map((filename) =>
                path.relative(__dirname, path.join(dirPath, name, filename))
            );
        }
    });
    return result;
};

const result: Result = {};

fs.readdirSync(path.join(__dirname, '../src'))
    .filter((name) => name !== 'index.ts')
    .forEach((dir) => {
        result[dir] = getHtmlPath(path.join(__dirname, dir));
    });

const getDirHtml = (name: string, dir: DirPath) => {
    return `<div style="display: flex; flex-direction: column; border: solid black 1px">
                <div>${name}</div>
                ${Object.keys(dir)
                    .map((key) => {
                        return `<a target="_blank" href="/static/${dir[key][0]}">${key}</a>`;
                    })
                    .join('')}</div>`;
};

app.get('/', (req, res) => {
    const html = `
        <div>
            ${Object.keys(result)
                .map((key) => {
                    return getDirHtml(key, result[key]);
                })
                .join('')}
        </div>
    `;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    open(`http://localhost:${port}`);
});
