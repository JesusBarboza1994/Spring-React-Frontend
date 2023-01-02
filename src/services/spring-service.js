import apiFetch from "./api-fetch";

export async function getSprings(){
  const { springs } = await apiFetch("/springs")

  return springs;
}