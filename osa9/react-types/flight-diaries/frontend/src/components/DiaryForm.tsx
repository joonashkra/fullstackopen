import { useState } from "react";
import { createDiary } from "../../services/diaryService";
import { Diary } from "../types";
import axios from "axios";

interface DiaryFormProps {
    diaries: Diary[],
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

const DiaryForm = ({ diaries, setDiaries, setMessage }: DiaryFormProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('great');
    const [weather, setWeather] = useState('sunny');
    const [comment, setComment] = useState('');

    const handleCreateDiary = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newDiary = {
          date,
          visibility,
          weather,
          comment
        };
        createDiary(newDiary)
          .then(data => setDiaries(diaries.concat(data)))
          .catch(error => {
            if (axios.isAxiosError(error) && error.response) {
              setMessage(error.response.data);
              setTimeout(() => {
                setMessage('');
              }, 5000);
            } else {
                console.error(error);
            }
          });
    }

    return (
      <form onSubmit={handleCreateDiary}>
        <div>
          date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility
          <div>
            <input 
              type="radio" 
              id="visibilityChoice1" 
              name="visibility" 
              value="great"
              checked={visibility === 'great'} 
              onChange={() => setVisibility('great')} 
            />
            <label htmlFor="visibilityChoice1">Great</label>
            <input 
              type="radio" 
              id="visibilityChoice2" 
              name="visibility" 
              value="good"
              checked={visibility === 'good'} 
              onChange={() => setVisibility('good')} 
            />
            <label htmlFor="visibilityChoice2">Good</label>
            <input 
              type="radio" 
              id="visibilityChoice3" 
              name="visibility" 
              value="ok"
              checked={visibility === 'ok'} 
              onChange={() => setVisibility('ok')} 
            />
            <label htmlFor="visibilityChoice3">Ok</label>
            <input 
              type="radio" 
              id="visibilityChoice4" 
              name="visibility" 
              value="poor"
              checked={visibility === 'poor'} 
              onChange={() => setVisibility('poor')} 
            />
            <label htmlFor="visibilityChoice4">Poor</label>
          </div>
        </div>
        <div>
          weather
          <div>
            <input 
              type="radio" 
              id="weatherChoice1" 
              name="weather" 
              value="sunny"
              checked={weather === 'sunny'} 
              onChange={() => setWeather('sunny')} 
            />
            <label htmlFor="weatherChoice1">Sunny</label>
            <input 
              type="radio" 
              id="weatherChoice2" 
              name="weather" 
              value="rainy"
              checked={weather === 'rainy'} 
              onChange={() => setWeather('rainy')} 
            />
            <label htmlFor="weatherChoice2">Rainy</label>
            <input 
              type="radio" 
              id="weatherChoice3" 
              name="weather" 
              value="cloudy"
              checked={weather === 'cloudy'} 
              onChange={() => setWeather('cloudy')} 
            />
            <label htmlFor="weatherChoice3">Cloudy</label>
            <input 
              type="radio" 
              id="weatherChoice4" 
              name="weather" 
              value="stormy"
              checked={weather === 'stormy'} 
              onChange={() => setWeather('stormy')} 
            />
            <label htmlFor="weatherChoice4">Stormy</label>
            <input 
              type="radio" 
              id="weatherChoice5" 
              name="weather" 
              value="windy"
              checked={weather === 'windy'} 
              onChange={() => setWeather('windy')} 
            />
            <label htmlFor="weatherChoice5">Windy</label>
          </div>
        </div>
        <div>
          comment
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    );
}

export default DiaryForm;
