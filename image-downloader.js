const Fs = require('fs')
const Axios = require('axios')
const readerFile = require('./reader-file').readerFile;

const catalog = readerFile('./docs/Catalog.xlsx')
Fs.mkdirSync(`./catalogs/${catalog.name}/images/`, { recursive: true });

async function download(url, filename) {
    const writer = Fs.createWriteStream(filename)

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

const imagesDownload = function () {
    catalog.data.map(function (model) {
        const imageName = model.Codigo.toUpperCase();
        const uriImage = `https://elements-of-steel.com.mx/catalog/${imageName}/0_medium.jpg`
        const filename = `catalogs/${catalog.name}/images/`.concat(`${imageName}.jpg`);
        download(uriImage, filename).then(() => {
            console.log(`Download successful: ${imageName}`);
        }).catch(e => {
            console.log(e);
        });
    });
}

imagesDownload();

