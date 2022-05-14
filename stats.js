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

const datas = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[4]], {raw: false, defval: null});

datas.forEach((data) => {
    //console.log(data);
    const post = axios.post(
        'https://strapi-genshin.latabledesattentistes.fr/api/stats',
        {
            data: {
                ID_Stats: data['ID'],
                Type: data['Type'],
                L1: data['1'],
                L20: data['20'],
                L20P: data['20+'],
                L40: data['40'],
                L40P: data['40+'],
                L50: data['50'],
                L50P: data['50+'],
                L60: data['60'],
                L60P: data['60+'],
                L70: data['70'],
                L70P: data['70+'],
                L80: data['80'],
                L80P: data['80+'],
                L90: data['90']
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
