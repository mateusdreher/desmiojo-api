import { Recipe } from "../../domain";

export function getRecipeHtmlTemplate(recipe: Recipe): string {
  const ingredientsList = recipe.ingredients
    .map(
      (ing) =>
        `<li><strong>${ing.quantity}</strong> (${ing.unit}) ${ing.name}</li>`,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Receita: ${recipe.title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 10px; }
        h2 { color: #e67e22; }
        .meta-info { background-color: #f9f9f9; padding: 10px; border-left: 4px solid #e67e22; margin-bottom: 20px; }
        ul { list-style-type: none; padding-left: 0; }
        footer { margin-top: 30px; text-align: center; color: #777; font-size: 0.8em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${recipe.title}</h1>
        <div class="meta-info">
          <p><strong>Tempo de Preparo:</strong> ${recipe.preparation_time_minutes} minutos</p>
          <p><strong>Rendimento:</strong> ${recipe.servings} porções</p>
        </div>
        
        <h2>Ingredientes</h2>
        <ul>
          ${ingredientsList}
        </ul>
        
        <h2>Modo de Preparo</h2>
        <p>${recipe.preparation_method.replace(/\n/g, "<br>")}</p>

        <footer>Gerado por Desmiojo API - ${new Date().toLocaleDateString("pt-BR")}</footer>
      </div>
    </body>
    </html>
  `;
}
