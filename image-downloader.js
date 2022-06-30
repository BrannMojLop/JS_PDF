var fs = require('fs'),
    request = require('request');
const readerFile = require('./reader-file').readerFile;

const catalog = readerFile('./docs/Catalog.xlsx')
fs.mkdirSync(`./catalogs/${catalog.name}/images/`, { recursive: true });

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        if (res.statusCode === 200) {
            request(uri).pipe(fs.createWriteStream(filename));
        }
    });
};

const imagesDownload = function () {
    catalog.data.map(function (model) {
        const uriImage = `https://images-eos.sfo3.digitaloceanspaces.com/catalog/${model.Codigo}/0_medium.jpg`
        const filename = `catalogs/${catalog.name}/images/`.concat(`${model.Codigo}.jpg`);
        download(uriImage, filename);
    });
}

imagesDownload();