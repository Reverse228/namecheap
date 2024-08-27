import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FC, ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputLabel from "@/components/Input";
import { DialogContent } from "@/components/ui/dialog";

type Pros = {
  children: ReactNode;
};

type WithdrawalData = {
  sum: number;
  address: string;
};

const Withdrawal: FC<Pros> = ({ children }) => {
  const { register, handleSubmit, reset } = useForm<WithdrawalData>({
    defaultValues: {
      sum: 0,
      address: "",
    },
  });
  const onSubmit: SubmitHandler<WithdrawalData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader className={"space-y-6"}>
            <AlertDialogTitle>Вывод средств</AlertDialogTitle>
            <div className={"flex flex-col gap-3"}>
              <InputLabel
                id={"sum"}
                label={"Сумма в USD"}
                inputProps={{
                  type: "number",
                  ...register("sum"),
                }}
              />
              <InputLabel
                id={"address"}
                label={"Адресс кошелька"}
                inputProps={{
                  type: "text",
                  ...register("address"),
                }}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className={"mt-4"}>
            <AlertDialogCancel>Отменить</AlertDialogCancel>
            <AlertDialogAction type={"submit"}>Вывести</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Withdrawal;
