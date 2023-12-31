import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: ()=> '/api/v1/articles/',
        })
    })
})