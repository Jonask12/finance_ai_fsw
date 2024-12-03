import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login")
  }
  return (
    <>
      <Navbar />
      <h1> Subscription page</h1>
    </>
  );
};

export default Subscription;
