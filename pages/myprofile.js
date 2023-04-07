// pages/profile/[id].js

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import myprofile from "../queries/getProfileById.js";
import Profile from "../components/Profiles.js";
import Post from "../components/Post.js";
import Header from "../components/Header.js";

export default function MyProfilePage() {
  const { loading, error, data } = useQuery(myprofile);

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center p-8">
        <Profile
          key={data.profile.id}
          profile={data.profile}
          displayFullProfile={false}
        />
      </div>
    </div>
  );
}
