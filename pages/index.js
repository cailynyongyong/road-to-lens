import { useQuery } from "@apollo/client";
import recommendedProfiles from "../queries/recommendedProfilesQuery.js";
import Profile from "../components/Profiles.js";
import Header from "../components/Header.js";

export default function Home() {
  const { loading, error, data } = useQuery(recommendedProfiles);

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Header />
      {/* {data.recommendedProfiles.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        return (
          <Profile
            key={profile.id}
            profile={profile}
            displayFullProfile={false}
          />
        );
      })} */}
    </div>
  );
}
