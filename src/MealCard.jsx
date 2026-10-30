

function MealCard({meal, deleteMeal}){


    function handleDelete() {
        deleteMeal(meal.id)
    }

    return (
        <article>
            <h1> Meal: {meal.name} {meal.id}</h1>
            <p>Guest: {meal.guest} &nbsp;|&nbsp;
                Serves: {meal.serves}</p>
            <button onClick={handleDelete}>Delete</button>
        </article>
    )
}

export default MealCard