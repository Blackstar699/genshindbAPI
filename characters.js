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

const datas = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[1]], {raw: false, defval: null});

datas.forEach((data) => {
    //console.log(data);
    const post = axios.post(
        'https://strapi-genshin.latabledesattentistes.fr/api/characters',
        {
            data: {
                ID_Characters: data['ID'],
                Name: data['Name'],
                Element: data['Element'],
                WeaponType: data['WeaponType'],
                Rarity: data['Rarity'],
                Gender: data['Gender'],
                Name: data['Name'],
                Description: data['Description'],
                PV: data['PV'],
                ATQ: data['ATQ'],
                DEF: data['DEF'],
                SubStat: data['SubStat'],
                Region: data['Region'],
                Birthday: data['Birthday'],
                Constellations: data['Constellations'],
                Passives: data['Passives'],
                Skill1: data['Skill1'],
                Skill2: data['Skill2'],
                Skill3: data['Skill3'],
                ElevationMaterials: data['ElevationMaterials'],
                SkillsMaterials: data['SkillsMaterials'],
                Images: data['Images']
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
