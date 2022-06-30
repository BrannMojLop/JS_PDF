const reader = require('xlsx')

const readerFile = (fileRef) => {
    const file = reader.readFile(fileRef)
    let data = []

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

    return { name: sheets[0], data }

}

module.exports = {
    readerFile
};