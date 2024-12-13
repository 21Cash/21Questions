import Profile from "@/components/Profile/Profile";
import getProfileData from "@/database/queries/profile-data-query";
import { NEXT_AUTH_OPTIONS } from "@/lib/NextAuthOptions";
import { getServerSession } from "next-auth";
import { Ruthie } from "next/font/google";

interface ProfilePageProps {
  params: { username: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const session: any = await getServerSession(NEXT_AUTH_OPTIONS);

  const authorized =
    session && username.toLocaleLowerCase() === session?.user?.username;

  const fetchProfileData = async () => {
    let data = await getProfileData({
      username,
      authorizedUser: authorized,
    });

    return data;
  };

  const profileData = await fetchProfileData();
  return (
    <div>
      <Profile {...profileData} />
    </div>
  );
}
