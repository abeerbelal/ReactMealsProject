import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);//becouse at the beginig we start with loading
  const [httpErorr, setHttpError] = useState();
  useEffect(()=>{
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-b24f7-default-rtdb.firebaseio.com/meals.json');
      if (!response.ok){
        throw new Error('Somthing went wrong');
      }
      
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData){
        loadedMeals.push(
          {id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    },[]);

 /*   try{
      fetchMeals();
    }catch(error){
        setIsLoading(false);
        setHttpError(error.message);
    }*/
   
  },[]);
 
 if (isLoading){
  return (
    <section className={classes.MealsError}>
      <p>Loading...</p>
    </section>
  );
 }
  if (httpErorr){
    return  <section className={classes.MealsLoading}>
      <p>{httpErorr}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
