export default async function fetchContent() {
  return await fetch(
    "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=Domgasse%205"
  ).then((res) => res.json());
}
