
// let userId = localStorage.getItem('uuid') //grabbing the uuid from Google
export const serverCalls = {

    getSearch: async (name:string) => {
        console.log(name)
        const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': '3lc9yJ6KSyXit56QcYZ0CQ==IuOdCEz7ITQC86n6',

            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }

        let data = await response.json()
        data = data[0]
        console.log(data)
        let result = [{
            "image": "",
            "name": data.name as string,
            "habitat": data.characteristics.habitat as string,
            "diet": data.characteristics.diet as string,
            "prey": data.characteristics.prey as string,
            "name_of_young": data.characteristics.name_of_young as string,
            "common_name": data.characteristics.common_name as string,
            "number_of_species": data.characteristics.number_of_species as string,
            "location": data.characteristics.location as string,
            "group": data.characteristics.group as string
        }]
          return(result)
    },
//     getImage: async (name:string) => {
//         console.log(name)
//         const response = await fetch(`https://google-search72.p.rapidapi.com/search?q=word%20cup&gl=us&lr=lang_en&num=10&start=0`, {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '0e9e06a6bdmsh4fb4095b0bc08c5p1bdd16jsnb4eac2ec2419',
//                 'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data'), response.status
//         }

//         let data = await response.json()
//         data = data[0]
//         console.log(data)
//         let result = [{
//             "image": serverCalls.getImage(name),
//             // "name": data.name as string,
//             // "habitat": data.characteristics.habitat as string,
//             // "diet": data.characteristics.diet as string,
//             // "prey": data.characteristics.prey as string,
//             // "name_of_young": data.characteristics.name_of_young as string,
//             // "common_name": data.characteristics.common_name as string,
//             // "number_of_species": data.characteristics.number_of_species as string,
//             // "location": data.characteristics.location as string,
//             // "group": data.characteristics.group as string
//         }]
//           return(result)
//     },
};
  