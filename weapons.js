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
                SubStat: data['SubStat'],
                WeaponType: data['WeaponType'],
                ElevationMaterials: data['ElevationMaterials'],
                Refinements: data['Refinements'],
                Images: data['Images'],
            }
        },
        {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1Mjk4MjIwLCJleHAiOjE2NTc4OTAyMjB9.0hzfTy7WblXfAB7q3hRP-cmAUYmQ-a_PX480WOU3fTs'
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
