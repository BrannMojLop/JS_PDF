var fs = require('fs');
const { jsPDF } = require("jspdf");
const readerFile = require('./reader-file').readerFile;

const catalog = readerFile('./docs/Catalog.xlsx')

console.log('Start programming..................');

function base64_encode(file) {
    return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
}

fs.readdir(`./catalogs/${catalog.name}/images`, function (err, archivos) {
    if (err) {
        console.log(err);
    }
    if (catalog.data.length === archivos.length) {
        const doc = new jsPDF();
        let indexImage = 1;
        doc.setFontSize(18);
        doc.setTextColor("#ff7433")
        catalog.data.map(function (model) {
            if (indexImage === 1) {
                indexImage = 2;
                doc.addImage(base64_encode(`./catalogs/${catalog.name}/images/${model.Codigo}.jpg`), 35, 0, 145, 145);
                doc.text(model.Codigo, 45, 145)
                doc.save(`./catalogs/${catalog.name}/${catalog.name}.pdf`);
            } else {
                indexImage = 1;
                doc.addImage(base64_encode(`./catalogs/${catalog.name}/images/${model.Codigo}.jpg`), 35, 146, 145, 145);
                doc.text(model.Codigo, 45, 290)
                doc.addPage();
                doc.save(`./catalogs/${catalog.name}/${catalog.name}.pdf`);
            }
        });
        console.log("Good!!, finished document.")
    } else {
        catalog.data.map(function (model) {
            if (!archivos.includes(`${model.Codigo}.jpg`)) {
                console.log(model.Codigo)
            }
        });
        console.log("Error, these images are not exsistent........")
    }
});
