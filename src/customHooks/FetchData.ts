// import * as _React from 'react';
// import { useState, useEffect } from 'react';
// import {serverCalls}  from '../api';





// export interface SearchProps {
//     collection: string;
//     select: number;
//     image: string,
//     name: string,
//     habitat: string,
//     diet: string,
//     prey: string,
//     name_of_young: string,
//     common_name: string,
//     number_of_species: string,
//     location:string,
//     group: string,
   
// }

// interface GetSearchDataProps {
//     searchData: SearchProps[]
//     getData: () => void
// }

// export const useGetSearch = (): GetSearchDataProps => {
//     // set up some hooks
//     const [ searchData, setSearchData ] = useState<SearchProps[]>([])

//     const handleDataFetch = async () => {
//         const result = await serverCalls.getSearch(name)

//         setSearchData(result)
//     }

 
//     useEffect(()=>{
//         handleDataFetch()
//     },[])

//     return { searchData, getData: handleDataFetch }
// }

// interface GetCollectionDataProps {
//    collectionData: SearchProps[]
//     getData: () => void
// }


// export const useGetCollection = (): GetCollectionDataProps => {
//     // set up some hooks
//     const [ collectionData, setSearchData ] = useState<SearchProps[]>([])

//     const handleDataFetch = async () => {
//         const result = await serverCalls.getCollection()

//         setSearchData(result)
//     }

   
//     useEffect(()=>{
//         handleDataFetch()
//     },[])

//     return { collectionData, getData: handleDataFetch }
// }