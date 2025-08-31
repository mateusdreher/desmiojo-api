import { UserID as AuthorID } from "../../users";
import { IngredientsInputType } from "../application/dtos/ingredients.input.type";
import { Ingredient } from "./vo/ingredient.vo";
import { RecipeID } from "./vo/recipe-id.vo";

export type RecipeStatusType = "draft" | "published";

export class RecipeAlreadyPublishedError extends Error {
  constructor() {
    super("Recipe already published");
    this.name = "RecipeAlreadyPublishedError";
  }
}
export class CannotPublishWithNoIngredientsError extends Error {
  constructor() {
    super("Cannot publish a recipe without ingredients");
    this.name = "CannotPublishWithNoIngredientsError";
  }
}

type RecipeProps = {
  id: RecipeID;
  categoryId: number;
  authorId: AuthorID;
  title: string;
  preparation_time_minutes: number;
  servings: number;
  preparation_method: string;
  ingredients: Ingredient[];
  status: RecipeStatusType;
  createdAt: Date;
  updatedAt: Date;
};

export class Recipe {
  public readonly id: RecipeID;
  public readonly authorId: AuthorID;
  private _categoryId: number;
  private _title: string;
  private _preparation_time_minutes: number;
  private _servings: number;
  private _preparation_method: string;
  private _ingredients: Ingredient[];
  private _status: RecipeStatusType;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(init: RecipeProps) {
    this.id = init.id;
    this.authorId = init.authorId;
    this._categoryId = init.categoryId;
    this._title = init.title;
    this._preparation_method = init.preparation_method;
    this._preparation_time_minutes = init.preparation_time_minutes;
    this._servings = init.servings;
    this._ingredients = init.ingredients;
    this._status = init.status;
    this._createdAt = init.createdAt;
    this._updatedAt = init.updatedAt;
  }

  public get categoryId(): number {
    return this._categoryId;
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
  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }
  public get status(): string {
    return this._status;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public static async create(props: {
    categoryId: number;
    authorId: AuthorID;
    title: string;
    preparation_time_minutes: number;
    servings: number;
    preparation_method: string;
    ingredients: Ingredient[];
    status?: RecipeStatusType;
  }): Promise<Recipe> {
    return new Recipe({
      id: new RecipeID(),
      categoryId: props.categoryId,
      title: props.title,
      authorId: props.authorId,
      preparation_time_minutes: props.preparation_time_minutes,
      preparation_method: props.preparation_method,
      ingredients: props.ingredients || [],
      servings: props.servings,
      status: props.status || "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static load(props: {
    id: RecipeID;
    categoryId: number;
    title: string;
    authorId: AuthorID;
    preparation_time_minutes: number;
    servings: number;
    preparation_method: string;
    ingredients: Ingredient[];
    status: RecipeStatusType;
    createdAt: Date;
    updatedAt: Date;
  }): Recipe {
    return new Recipe(props);
  }

  public publish() {
    if (this._ingredients.length === 0) {
      throw new CannotPublishWithNoIngredientsError();
    }
    if (this.isPublished()) {
      throw new RecipeAlreadyPublishedError();
    }

    this._status = "published";
    this._updatedAt = new Date();
  }

  public changeTitle(newTitle: string) {
    if (newTitle.trim().length < 3) throw new Error("Title is too short.");
    this._title = newTitle;
    this._updatedAt = new Date();
  }
  public changeCategory(newCategory: number) {
    this._categoryId = newCategory;
    this._updatedAt = new Date();
  }

  public changePreparationMethod(newPrepMethod: string) {
    this._preparation_method = newPrepMethod;
    this._updatedAt = new Date();
  }
  public changePreparationtime(newTime: number) {
    this._preparation_time_minutes = newTime;
    this._updatedAt = new Date();
  }
  public changeServings(newServings: number) {
    this._servings = newServings;
    this._updatedAt = new Date();
  }
  public changeIngredients(newIngredients: IngredientsInputType[]) {
    this._ingredients = newIngredients;
    this._updatedAt = new Date();
  }

  public isPublished(): boolean {
    return !!(this._status === "published");
  }
}
