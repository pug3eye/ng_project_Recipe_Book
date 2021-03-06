import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
//   recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
        'กระเพราไก่ไข่ดาว',
        'เมนูง่ายๆแต่ความอร่อยที่ได้ระดับภัตตาคาร!!',
        'https://i.ytimg.com/vi/PzXlMG-32SQ/maxresdefault.jpg',
        [
            new Ingredient('กระเพรา', 1),
            new Ingredient('ไข่ไก่', 20),
            new Ingredient('ข้าวสวย', 20),
            new Ingredient('พริก', 20)
        ]),
    new Recipe(
        'มาม่าผัดซีอิ้วทะเล',
        'เส้น!เหมือนกัน..แต่ของฉันอร่อยกว่า ',
        'http://lh6.ggpht.com/-m9TJuei_6Go/VLDTUJ0BtOI/AAAAAAAAEVs/koWo1zuenYU/s640/C360_2015-01-09-12-50-18-797.jpg',
        [
            new Ingredient('มาม่า หรือ ไวไว', 2),
            new Ingredient('ซอสปรุงรส', 1),
            new Ingredient('ซีอิ้วดำสูตรหวาน', 1)
        ])
    ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
