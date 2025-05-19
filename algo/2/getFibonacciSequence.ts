/*
Créé une fonction getFibonacciSequence qui prend un nombre n en paramètre et retourne un tableau contenant les n premiers nombres de la suite de Fibonacci.

Détails

* La suite de Fibonacci commence par les nombres 0 et 1.
* Chaque nombre suivant est la somme des deux nombres précédents.
* Par exemple, pour n = 5, la fonction devrait retourner [0, 1, 1, 2, 3].

Si n est inférieur ou égal à 0, la fonction doit retourner un tableau vide []
*/

function getFibonacciSequence(size: number): number[] {
  const result = [0, 1];
  if (size === 0 || size < 0) {
    return [];
  }
  if (size === 1) {
    return [0];
  }
  for (let i = 2; i < size; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
}
export default getFibonacciSequence;
