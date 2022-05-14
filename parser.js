const path = require('path');
const xlsx = require('xlsx');

const source = path.join(__dirname, 'sources/items.xlsx')
const workbook = xlsx.readFile(source);
const sheetNameList = workbook.SheetNames;

const datas = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], {raw: false, defval: null});
datas.forEach((data) => {
    console.log(data);
    // post
})
