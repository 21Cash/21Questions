import QuestionsView from "@/components/QuestionsView/QuestionsView";
import getProfileData from "@/database/queries/profile-data-query";
import { NEXT_AUTH_OPTIONS } from "@/lib/NextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Inbox() {
  const session: any = await getServerSession(NEXT_AUTH_OPTIONS);
  if (!session || !session.user || !session.user.username) {
    redirect("/");
  }

  const username = session.user?.username;

  const profileData = await getProfileData({
    username,
    authorizedUser: true,
  });

  const allQuestionsData = profileData.askedQuestionsData;

  const unansweredQuestions = allQuestionsData.filter(
    (question) => question.answerText === "" || question.answerText == null
  );

  return (
    <div className="sm:w-full md:w-[650px] min-h-screen mx-auto my-5 p-10  dark:bg-gray-800 rounded-md shadow-2xl ring-gray-700 ring-2">
      <QuestionsView questions={unansweredQuestions} />
    </div>
  );
}
