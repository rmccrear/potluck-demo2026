import { useState } from 'react'
import { supabase } from './utils/supabase'
import "@picocss/pico/css/pico.css"
import MealCard from './MealCard'

function App() {
  const [meals, setMeals] = useState([])

  const loadMeals = async () => {
    // const {records, loading, error} = useFetchData("https://xyz.cloudflare.com/...")
    const { data, error } = await supabase.from("meals").select()
    // TODO: handle errors
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
    console.log(meal)
    const result = await supabase.from("meals").insert(meal)
    if (result.error) {
      console.log(result.error.message)
      return
    }
  }

  async function handleAddPastalaya() {
    console.log("Hello from Handle Add Pastalaya")
    const { error } = await supabase
      .from('meals')
      .insert({ name: 'Pastalaya', guest: '?', serves: 9 })
    //TODO: handle errors
  }

  async function handleAddJambalaya() {
    console.log("Hello from Handle Add Jambalaya")
    const { error } = await supabase
      .from('meals')
      .insert({ name: 'Jambalaya', guest: '?', serves: 9 })
    //TODO: handle errors
  }

  async function handleAddChips() {
    const { error } = await supabase
     .from('meals')
     .insert({ name: 'Chips', serves: 8, guest: "?" })
  }

  return (
    <div>
      <h1>Potluck</h1>
      <button onClick={loadMeals}>Load</button>&nbsp;
      <button onClick={handleAddPastalaya}>Add Pastalaya</button>
      <button onClick={handleAddJambalaya}>Add Jambalaya</button>
      <button onClick={handleAddChips}>Add Chips</button>
      {
        meals.map((meal)=> ( <MealCard key={meal.id} meal={meal}/> ))
      }
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
