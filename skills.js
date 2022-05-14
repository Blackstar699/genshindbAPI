const axios_package = require('axios');
const https = require('https');
const path = require('path');
const xlsx = require('xlsx');

const axios = axios_package.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

const source = path.join(__dirname, 'sources/GenshinAppDatas.xlsx')
const workbook = xlsx.readFile(source);
const sheetNameList = workbook.SheetNames;

const datas = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[7]], {raw: false, defval: null});

datas.forEach((data) => {
    //console.log(data);
    const post = axios.post(
        'https://strapi-genshin.latabledesattentistes.fr/api/skills',
        {
            data: {
                ID_Skills: data['ID'],
                Name: data['Name'],
                Description: data['Description'],
                Type: data['Type'],
                L1: data['1'],
                L2: data['2'],
                L3: data['3'],
                L4: data['4'],
                L5: data['5'],
                L6: data['6'],
                L7: data['7'],
                L8: data['8'],
                L9: data['9'],
                L10: data['10'],
                L11: data['11'],
                L12: data['12'],
                L13: data['13']
            }
        },
        {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUyMzg5NTQxLCJleHAiOjE2NTQ5ODE1NDF9.fkoG3TzOP7m1wxbJZIGQ8tMoA6l5_w8kU9mL8iBuT-0'
            }
        }
    ).then(
        response => data['ID']
    ).catch(
        function (error) {
            console.log('FAIL: ' + data['ID'])
        }
    );
    
    console.log(post);
});
