import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CreateAccount } from "my-wallet-shared-types/shared-types";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { currencies } from "@/constants/currencies";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../ui/use-toast";

const formSchema = zod.object({
  name: zod
    .string()
    .min(2, {
      message: "Account name must be at least 2 characters.",
    })
    .max(50),
  balance: zod.coerce.number(),
  currency: zod.string().min(2, {
    message: "Please select a currency.",
  }),
});

function CreateAccountDialog(props: {
  addAccount: (crateAccountData: CreateAccount) => Promise<unknown>;
}) {
  const { toast } = useToast();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      balance: 0,
      currency: undefined,
    },
  });

  async function onSubmit(values: zod.infer<typeof formSchema>) {

    try {
      await props.addAccount(values);
      toast({
        title: "Success",
        description: "Account created successfuly."
      });
      form.reset();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Account creation</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account name</FormLabel>
                  <FormControl>
                    <Input placeholder="Account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Balance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency for an account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map(currency => {
                    return <SelectItem key={currency.currencyCode} value={currency.currencyCode}>{currency.currencyCode} | {currency.name}</SelectItem>
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            <DialogFooter>
              {form.formState.isValid ? (
                <DialogClose asChild>
                  <Button type="submit">Create</Button>
                </DialogClose>
              ) : (
                <Button type="submit">Create</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccountDialog;
