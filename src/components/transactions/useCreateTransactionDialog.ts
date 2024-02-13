import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import * as zod from "zod";
import { TransactionsCategories } from "@/utils/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionDTO } from "my-wallet-shared-types/shared-types";

const formSchema = zod.object({
  name: zod
    .string()
    .min(2, {
      message: "Transaction name must be at least 2 characters.",
    })
    .max(50),
  type: zod.enum(["outgoing", "incoming"]),
  amount: zod.coerce.number().gte(0),
  category: zod.nativeEnum(TransactionsCategories),
  date: zod.date().max(new Date()),
});

interface CreateTransactionDialogProps {
  accountId: string;
  addTransaction: (
    createTransactionData: CreateTransactionDTO
  ) => Promise<unknown>;
}

export function useCreateTransactionDialog({
    accountId,
  addTransaction,
}: CreateTransactionDialogProps) {
  const { toast } = useToast();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "outgoing",
      amount: 0,
      category: TransactionsCategories.OTHERS,
      date: today,
    },
  });

  async function onSubmit(values: zod.infer<typeof formSchema>) {
    try {
      const timezoneOffset = (new Date()).getTimezoneOffset();
      const input: CreateTransactionDTO = {
        name: values.name,
        amount: values.type === "outgoing" ? -values.amount : values.amount,
        accountId: accountId,
        category: values.category,
        date: new Date(values.date.getTime() - timezoneOffset * 1000 * 60),
      };
            
      await addTransaction(input);

      toast({
        title: "Success",
        description: "Transaction added succesfuly.",
      });
      form.reset();
    } catch (e) {
      console.error(e);
    }
  }

  return {form, onSubmit}
}
