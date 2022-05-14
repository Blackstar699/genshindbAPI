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

const datas = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]], {raw: false, defval: null});

datas.forEach((data) => {
    //console.log(data);
    const post = axios.post(
        'https://strapi-genshin.latabledesattentistes.fr/api/weapons',
        {
            data: {
                ID_Weapons: data['ID'],
                Name: data['Name'],
                Rarity: data['Rarity'],
                Description: data['Description'],
                ATQ: data['ATQ'],
                SubStat: data['Substat'],
                WeaponType: data['WeaponType']
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
