// pages/profile/[id].js

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import fetchProfileQuery from "../../queries/fetchProfileQuery.js";
import Profile from "../../components/Profiles.js";
import Feed from "../../components/Feed.js";
import Header from "../../components/Header.js";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("fetching profile for", id);
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: {
      request: { profileId: id },
      publicationsRequest: {
        profileId: id,
        publicationTypes: ["POST"], // We really only want POSTs
      },
    },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return (
    <div class="bg-black">
      <Header />
      <div className="flex flex-col items-center p-8">
        <Profile profile={data.profile} displayFullProfile={true} />
        {data.publications.items.map((post, idx) => {
          return <Feed key={idx} profile={data.profile} post={post} />;
        })}
      </div>
    </div>
  );
}
