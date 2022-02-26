// export interface IFetchResponse<T> {
//   data: null | T;
//   isPending: boolean;
//   error: null | string | Error;
// }

export interface IRecipe {
  id: number | string;
  title: string;
  ingredients: string[];
  method: string;
  cookingTime: string;
}
