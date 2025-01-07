import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SumaryCard from "./sumary-card";
import { db } from "@/app/_lib/prisma";

interface SumaryCards {
  month: string;
}

const SumaryCards = async ({ month }: SumaryCards) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`)
    },
  }
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {...where, type: "DEPOSIT"},
        _sum: { amount: true }
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {...where, type: "INVESTMENT"},
        _sum: { amount: true }
      })
    )?._sum?.amount,
  )
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {...where, type: "EXPENSE"},
        _sum: { amount: true }
      })
    )?._sum?.amount,
  )
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  return (
    <div className="space-y-6">
      {/* first card */}
      <SumaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* others cards */}
      <div className="grid grid-cols-3 gap-6">
        <SumaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SumaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SumaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SumaryCards;
