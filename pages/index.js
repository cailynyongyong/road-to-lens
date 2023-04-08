import { useQuery } from "@apollo/client";
import recommendedProfiles from "../queries/recommendedProfilesQuery.js";
import Publication from "../components/Publication.js";
import Header from "../components/Header.js";

export default function Home() {
  const { loading, error, data } = useQuery(recommendedProfiles);

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Header />
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Feed</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          Post your wildest updates ;p
        </div>
      </main>
      <Publication />
    </div>
  );
}
