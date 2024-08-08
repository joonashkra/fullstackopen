import { useEffect, useState } from "react";
import { getAllDiaries } from '../../services/diaryService';
import { Diary } from "../types";
import DiaryList from "./DiaryList";
import DiaryForm from "./DiaryForm";
import Notification from "./Notification";

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([])
  const [message, setMessage] = useState('')
   
  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data))
  }, [])

  return (
    <div>
      <h1>Diary entries</h1>
      <Notification message={message} />
      <DiaryForm diaries={diaries} setDiaries={setDiaries} setMessage={setMessage} />
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App