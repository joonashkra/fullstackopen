import axios from 'axios'
import { Diary, NewDiary } from '../src/types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
    const response = await axios.get<Diary[]>(baseUrl)
    return response.data
}

export const createDiary = async (diary: NewDiary) => {
    const response = await axios.post<Diary[]>(baseUrl, diary)
    return response.data
}