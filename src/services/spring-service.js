import apiFetch from "./api-fetch";

export async function getSprings(){
  const { springs } = await apiFetch("/springs")

  return springs;
}

export async function createSprings(data){
  const { spring, message, points, forces } = await apiFetch("/springs/", {body: data})
  return {spring: spring, points: points, forces: forces};
}