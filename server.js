import http from 'http'
import proxy from "http-proxy-stream";
import fs from 'fs'
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';

var serve = serveStatic("./dist");

// http useage
fs.readFile('./index.html', function (err, html) {
    if (err) { throw err; }

    http.createServer((req, res) => {
        if (req.headers.authorization) {
            try {
                let url = decodeURI(atob(req.headers.authorization.replace('Basic ', '')).replaceAll('â§¸', '/'))

                if (!url.startsWith('http')) { url = 'https://'+url }
                if (url.endsWith(':')) { url = url.replace(/:+$/, '') }
                console.log(url)
                proxy(req, {
                    url: url,
                    onResponse(response) {
                        response.headers.warning = 'This response was modified, and the results should not be trusted. Like at all.';
                    },
                    skipModifyResponse(response) {
                        return !proxy.mime.isText(response.contentType.type);
                    },
                    modifyResponse(response) {
                        // change headers
                        response.headers['content-type'] = 'application/json; charset: utf8';
                        // use new content, can be string, buffer, null, undefined or object;
                        response.body = 'lol owned' + "\n\n" + response.body;
                    }
                }, res);
            } catch (e) {
                res.writeHead(200);
                res.end(`whoops\n`);
            }
        } else {
            var done = finalhandler(req, res);
            serve(req, res, done);
        }
    }).listen(8001);
});