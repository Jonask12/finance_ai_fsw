import { auth } from "@clerk/nextjs/server";
import AddTransactioButton from "../_components/add-transction-button";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_colums";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login")
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    }
  });
  return (
    <>
    <Navbar />
    <div className="p-6 space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactioButton />
      </div>
      <DataTable columns={transactionsColumns} data={JSON.parse(JSON.stringify(transactions))}/>
    </div>
    </>
  );
};

export default TransactionsPage;
