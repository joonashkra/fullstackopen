
import { Diary } from '../types'

const DiaryList = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <ul>
        {diaries.map(diary => 
          <li key={diary.id} style={{ listStyle: "none" }}>
            <p style={{ fontWeight: "bold" }}>{diary.date}</p>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p style={{ fontStyle: "italic" }}>{diary.comment}</p>
          </li>
        )}
      </ul>
  )
}

export default DiaryList