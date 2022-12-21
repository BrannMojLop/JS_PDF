var fs = require('fs');
const { jsPDF } = require("jspdf");
const readerFile = require('./reader-file').readerFile;

const catalog = readerFile('./docs/Catalog.xlsx')

console.log('Start programming..................');

function base64_encode(file) {
    let data = "data:image/gif;base64," + fs.readFileSync(file, { encoding: 'base64' });
    return data;
}

fs.readdir(`./catalogs/${catalog.name}/images`, function (err, archivos) {
    if (err) {
        console.log(err);
    }
    // if (catalog.data.length === archivos.length) {
    const doc = new jsPDF();
    let indexImage = 1;
    if (catalog.name.includes('MARCA')) {
        doc.addImage(base64_encode(`./sheets/marca.webp`), 0, 0, 220, 300);
        doc.addPage();
    } else if (catalog.name.includes('LAMINADO')) {
        doc.addImage(base64_encode(`./sheets/laminado.webp`), 0, 0, 220, 300);
        doc.addPage();
    } else if (catalog.name.includes('ACERO')) {
        doc.addImage(base64_encode(`./sheets/acero.webp`), 0, 0, 220, 300);
        doc.addPage();
    } else if (catalog.name.includes('OUTLET')) {
        doc.addImage(base64_encode(`./sheets/outlet.webp`), 0, 0, 220, 300);
        doc.addPage();
    } else {
        doc.addImage(base64_encode(`./sheets/caratula.webp`), 0, 0, 220, 300);
        doc.addPage();
    }
    doc.addImage(base64_encode(`./sheets/indice.webp`), 0, 0, 220, 300);
    doc.addPage();
    doc.setTextColor("#ff7433")
    doc.setFontSize(18);
    catalog.data.map(function (model, index) {
        if (model.Codigo == 'caratula_B') {
            doc.addImage(base64_encode(`./sheets/brazalet.webp`), 0, 0, 220, 300);
            doc.addPage();
        } else if (model.Codigo == 'caratula_E') {
            doc.addImage(base64_encode(`./sheets/earring.webp`), 0, 0, 220, 300);
            doc.addPage();
        } else if (model.Codigo == 'caratula_R') {
            doc.addImage(base64_encode(`./sheets/ring.webp`), 0, 0, 220, 300);
            doc.addPage();
        } else if (model.Codigo == 'caratula_N') {
            doc.addImage(base64_encode(`./sheets/set.webp`), 0, 0, 220, 300);
            doc.addPage();
        } else {
            if (indexImage === 1) {
                indexImage = 2;
                doc.addImage(base64_encode(`./catalogs/${catalog.name}/images/${model.Codigo}.webp`), 30, 0, 150, 150);
                doc.text(model.Codigo, 43, 145)
                doc.save(`./catalogs/${catalog.name}/${catalog.name}.pdf`);
            } else {
                indexImage = 1;
                doc.addImage(base64_encode(`./catalogs/${catalog.name}/images/${model.Codigo}.webp`), 30, 148, 150, 150);
                doc.text(model.Codigo, 43, 290)
                if (index < catalog.data.length - 1) {
                    doc.addPage();
                }
                doc.save(`./catalogs/${catalog.name}/${catalog.name}.pdf`);
            }
        }
    });
    console.log("Good!!, finished document.")
    // } else {
    //     catalog.data.map(function (model) {
    //         if (!archivos.includes(`${model.Codigo}.jpg`)) {
    //             console.log(model.Codigo)
    //         }
    //     });
    //     console.log("Error, these images are not exsistent........")
    // }
});
