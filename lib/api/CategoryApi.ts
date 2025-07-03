import axios from "axios";

interface ISearchFilters {
  search: string;
}

export const categoryList = async (params: ISearchFilters & { page: number; limit: number; }) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_PATH}/categories`
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.append('search', params.search)
  searchParams.append('page', params.page.toString())
  searchParams.append('limit', params.limit.toString())

  const url = `${baseUrl}?${searchParams.toString()}`

  return await axios.get(url, {
    headers: {
      Accept: "application/json"
    }
  })
}

export const categoryDetail = async (token: string | undefined, { id }: { id: string; }) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/categories/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
}

export const categoryCreate = async (token: string | undefined, { name }: { name: string }) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/categories`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
}

export const categoryEdit = async (token: string | undefined, {id, name }: {id: string; name: string | undefined }) => {
  return await axios.put(`${process.env.NEXT_PUBLIC_API_PATH}/categories/${id}`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
}

export const categoryDelete = async (token: string | undefined, {id }: {id: string; }) => {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API_PATH}/categories/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
}