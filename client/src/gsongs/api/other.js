import { axios } from "./resource";

export async function get_releses() {
  let r = await axios.get("/api/releases");
  return r.data.result;
}
