// !!!! working info api call 11:45am 12/13
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
            "image": await serverCalls.getImage(name),
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
        console.log(result)
          return(result)
    },
    getImage: async (name:string) => {
        console.log(name)
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=EJTYFpWAtK8BVfmL17x20xN1c9JzErskdR9POpLs8ls`, {
            method: 'GET',
           
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }

        let data = await response.json()
        console.log(data.results[0].urls.small)
        return(data.results[0].urls.small)
          
        
        //   return(result)
    },
};
  