import { useState } from 'react'
import { supabase } from './utils/supabase'
import "@picocss/pico/css/pico.css"
import MealCard from './MealCard'

function App() {
  const [meals, setMeals] = useState([])

  const loadMeals = async () => {
    // const {records, loading, error} = useFetchData("https://xyz.cloudflare.com/...")
    const { data, error } = await supabase.from("meals").select()
    if (error) {
      console.log(error.message)
      return
    }
    console.log(data)
    setMeals(data)
  }

  async function addMeal(event) {
    event.preventDefault()
    const form = event.target

    const meal = {
      "name": form.mealName.value,
      "guest": form.guestName.value,
      "serves": form.serves.value
    }
    const result = await supabase.from("mealssss").insert(meal)
    if (result.error) {
      console.log(result.error.message)
      return
    }
  }

  return (
    <div>
      <h1>Potluck</h1>
      <button onClick={loadMeals}>Load</button>
      {meals.map( (meal)=> <MealCard key={meal.id} meal={meal}/> ) }
      <article>
        <h1> Add Meal</h1>
        <form onSubmit={addMeal}>
          <input type="text"   name="guestName" placeholder="Batman" />
          <input type="text"   name="mealName"  placeholder="Mac and Cheese" />
          <input type="number" name="serves" />
          <button>Add Meal</button>
        </form>
      </article>
    </div>
  )
}

export default App
