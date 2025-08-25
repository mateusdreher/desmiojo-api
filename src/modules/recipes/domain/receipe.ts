import { UserID } from "../../users";
import { Ingredients } from "./vo/ingredients.vo";
import { RecipeID } from "./vo/recipe-id.vo";

type RecipeProps = {
  id: RecipeID;
  category: number;
  author: UserID;
  title: string;
  preparation_time_minutes: number;
  servings: number;
  preparation_method: string;
  ingredients: Ingredients;
  createdAt: Date;
  updatedAt: Date;
};

class Recipe {
  public readonly id: RecipeID;
  private _category: number;
  private _author: UserID;
  private _title: string;
  private _preparation_time_minutes: number;
  private _servings: number;
  private _preparation_method: string;
  private _ingredients: Ingredients;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(init: RecipeProps) {
    this.id = init.id;
    this._category = init.category;
    this._title = init.title;
    this._preparation_method = init.preparation_method;
    this._preparation_time_minutes = init.preparation_time_minutes;
    this._servings = init.servings;
    this._ingredients = init.ingredients;
    this._createdAt = init.createdAt;
    this._updatedAt = init.updatedAt;
  }

  public get category(): number {
    return this._category;
  }
  public get author(): UserID {
    return this._author;
  }
  public get title(): string {
    return this._title;
  }
  public get servings(): number {
    return this._servings;
  }
  public get preparation_method(): string {
    return this._preparation_method;
  }
  public get preparation_time_minutes(): number {
    return this._preparation_time_minutes;
  }
  public get ingredients(): Ingredients {
    return this._ingredients;
  }

  public static async create(props: {
    category: number;
    author: string;
    title: string;
    preparation_time_minutes: number;
    servings: number;
    preparation_method: string;
    ingredients: string;
  }): Promise<Recipe> {
    return new Recipe({
      id: new RecipeID(props.title),
      category: props.category,
      title: props.title,
      author: new UserID(props.author),
      preparation_time_minutes: props.preparation_time_minutes,
      preparation_method: props.preparation_method,
      ingredients: new Ingredients(Ingredients),
      servings: props.servings,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static load(props: {
    id: RecipeID;
    category: number;
    title: string;
    author: UserID;
    preparation_time_minutes: number;
    servings: number;
    preparation_method: string;
    ingredients: Ingredients;
  }): Recipe {
    return new Recipe(props);
  }

  public changeCategory(newCategory: number) {
    this._category = newCategory;
    this._updatedAt = new Date();
  }

  public changePreparationMethod(newPrepMethod: string) {
    this._preparation_method = newPrepMethod;
    this._updatedAt = new Date();
  }
  public changePreparationtime(newTime: number) {
    this.preparation_time_minutes - newTime;
    this._updatedAt = new Date();
  }
  public changeServings(newServings: number) {
    this._servings = newServings;
    this._updatedAt = new Date();
  }
}
